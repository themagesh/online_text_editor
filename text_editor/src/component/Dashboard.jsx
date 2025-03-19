import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../component/styles/styleDash.css';
import { 
    BiHomeSmile, BiFolderOpen, BiSave, BiDownload, BiNotepad, BiFile, 
    BiFontFamily, BiLogOut, BiUpArrowAlt, BiDownArrowAlt 
} from "react-icons/bi";
import { SiFusionauth } from "react-icons/si";
import { AiOutlineDelete } from "react-icons/ai";
import Access from './Access';
import axios from 'axios';

function Dashboard() {
    const navigate = useNavigate();
    const [fileContent, setFileContent] = useState('');
    const [count, setCount] = useState(0);
    const [fontSize, setFontSize] = useState(16);
    const [filePath, setFilePath] = useState(localStorage.getItem('filepath') || '');
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    const fontStyles = [
        "Arial", "Verdana", "Georgia", "Palatino", 
        "Andale Mono", "Comic Sans MS", "Helvetica"
    ];

    console.log('Filepath:', filePath);

    const changeFontStyle = () => {
        setCount((prevCount) => (prevCount + 1) % fontStyles.length);
    };

    useEffect(() => {
        if (!filePath) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/read?fileName=${filePath}`);
                if (response.status === 200) {
                    console.log('Fetched data:', response.data);
                    setFileContent(response.data[0]?.content || '');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [filePath]);

    const handleSave = async () => {
        if (!filePath) {
            alert("No file selected!");
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/updatefile', {
                content: fileContent,
                fileName: filePath
            });

            if (res.status === 200) {
                alert('File saved successfully!');
            } else {
                alert('Error saving file.');
            }
        } catch (error) {
            console.error('Error saving file:', error);
            alert('Error saving file.');
        }
    };

    const handleDownload = () => {
        if (!filePath) {
            alert("No file selected!");
            return;
        }

        const element = document.createElement('a');
        const fileURL = URL.createObjectURL(new Blob([fileContent], { type: 'text/plain' }));
        element.href = fileURL;
        element.download = filePath;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleCreateNewFile = async () => {
        const fileName = window.prompt('Enter the file name', 'newfile.txt');
        if (!fileName) return;

        try {
            const response = await axios.post('http://localhost:5000/createnew', {
                content: '',
                fileName
            });

            if (response.status === 200) {
                alert('File created successfully!');
                localStorage.setItem('filepath', fileName);
                setFilePath(fileName);
                setFileContent('');
            } else {
                alert('Error creating file.');
            }
        } catch (error) {
            console.error('Error creating file:', error);
            alert('Error creating file.');
        }
    };

    const handleDelete = async () => {
        const fileName = prompt('Enter the file name to delete:');
        if (!fileName) return;

        try {
            const res = await axios.post('http://localhost:5000/deletefile', { fileName });

            if (res.status === 200) {
                alert('File deleted successfully!');
                localStorage.removeItem('filepath');
                setFilePath('');
                setFileContent('');
            } else {
                alert('Error deleting file.');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
            alert('Error deleting file.');
        }
    };

    return (
        <div>
            <nav className='navbar'>
                <ul>
                    <li>
                        <BiNotepad className='icons' />
                        <span>Editor</span>
                    </li>
                    <li>
                        <p>{username}</p>
                        <BiLogOut className='icons' onClick={handleLogout} />
                        <span>Logout</span>
                    </li>
                </ul>
            </nav>

            <aside className='sidebar'>
                <ul>
                    <div className='components'>
                        <BiHomeSmile className='icons' />
                        <li>Home</li>
                    </div>

                    <div id='newfile' className='components' onClick={handleCreateNewFile}>
                        <BiFile className='icons' />
                        <li>Create New File</li>
                    </div>

                    <div className='components' onClick={handleSave}>
                        <BiSave className='icons' />
                        <li>Save</li>
                    </div>

                    <div className='components'>
                        <BiFolderOpen className='icons' />
                        <li>Files</li>
                    </div>

                    <div className='components' onClick={handleDelete}>
                        <AiOutlineDelete className='icons' />
                        <li>Delete File</li>
                    </div>

                    <div className='components' onClick={handleDownload}>
                        <BiDownload className='icons' />
                        <li>Download</li>
                    </div>

                    <div className='components' onClick={changeFontStyle}>
                        <BiFontFamily className='icons' />
                        <li>Change Font</li>
                    </div>

                    <div className='components'>
                        <BiUpArrowAlt className='icons' onClick={() => setFontSize((size) => size + 1)} />
                        <li>Font Size {fontSize}</li>
                        <BiDownArrowAlt className='icons' onClick={() => setFontSize((size) => Math.max(size - 1, 10))} />
                    </div>

                    {localStorage.getItem('admin') === 'True' && (
                        <div className='components'>
                            <SiFusionauth className='icons' />
                            <li>Admin</li>
                        </div>
                    )}
                </ul>
            </aside>

            <main className="workspace">
                <textarea
                    style={{ fontSize: `${fontSize}px`, fontFamily: fontStyles[count] }}
                    id="text"
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    spellCheck={false}
                />
            </main>
        </div>
    );
}

export default Dashboard;
