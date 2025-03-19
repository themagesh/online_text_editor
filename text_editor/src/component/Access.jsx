import React, { useState, useEffect } from 'react';
import Access from './Templates';
import axios from 'axios';

function Template() {
     const [files, setFiles] = useState([]);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const response = await axios.get('http://localhost:5000/files');
                    console.log('Fetched data:', response.data);
                    setFiles(response.data); 
               } catch (error) {
                    console.error('Error fetching data:', error);
               }
          }
          fetchData();
     }, []);

     const filesList = files.map((file, index) => {
          return <Access key={index} name={file.filename} />
     });

     console.log('Files list:', filesList);

     return (
          <div className='none'>
               {filesList.length > 0 ? filesList : 'No files found'}
          </div>
     )
}

Template.defaultProps = {
     name: 'no name'
};

export default Template;