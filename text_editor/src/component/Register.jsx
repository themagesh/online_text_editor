import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import './styles/login.css'
import gif from './styles/icons8-pencil.gif'
import axios from 'axios'
import CryptoJS from 'crypto-js';
import note from './styles/note_50.png';

function Register() {
     const [newUserName, setNewUserName] = useState('')
     const [newUserEmail, setNewUserEmail] = useState('')
     const [newPassword, setNewPassword] = useState('')
     const [newConfirmPassword, setNewConfirmPassword] = useState('')

     const Navigation = useNavigate()

     const handleLogin = async (e) => {
          e.preventDefault()



          if (newPassword !== newConfirmPassword) {
               alert('Password does not match')
               return
          }

          const salt = CryptoJS.lib.WordArray.random(16);

          const hashedPassword = CryptoJS.PBKDF2(newConfirmPassword, salt, {
               keySize: 256 / 32, // 256-bit key length
               iterations: 1000, // Number of iterations
               hasher: CryptoJS.algo.SHA256
          }).toString();

          const encryptedPassword = salt.toString() + ':' + hashedPassword; 

          axios.post('http://localhost:5000/insertUser', {
               name: newUserName,
               email: newUserEmail,
               password: encryptedPassword
          }
          )
          Navigation('/')

     }
     return (
          <div className='container'>
               <img src={gif} alt="" className='pencil' />
               <img src={note} alt="" className='note' />
               <div className='body'>
                    <form className='form'>
                         <h1 className='login'>Register !</h1>
                         <div className="form-group">
                              <input
                                   className='input'
                                   type="text"
                                   id="username"
                                   value={newUserName}
                                   placeholder='Username'
                                   onChange={(e) => setNewUserName(e.target.value)}
                                   required
                                   spellCheck='false'
                              />
                         </div>
                         <div className="form-group">
                              <input
                                   className='input'
                                   type="text"
                                   id="username"
                                   value={newUserEmail}
                                   placeholder='Email'
                                   onChange={(e) => setNewUserEmail(e.target.value)}
                                   required
                                   spellCheck='false'
                              />
                         </div>
                         <div className="form-group">
                              <input
                                   className='input'
                                   type="password"
                                   id="password"
                                   value={newPassword}
                                   placeholder='Password'
                                   onChange={(e) => setNewPassword(e.target.value)}
                                   required
                                   spellCheck='false'
                              />
                         </div>
                         <div className="form-group">
                              <input
                                   className='input'
                                   type="password"
                                   id="password"
                                   value={newConfirmPassword}
                                   placeholder='Confirm Password'
                                   onChange={(e) => setNewConfirmPassword(e.target.value)}
                                   required
                                   spellCheck='false'
                              />
                         </div>
                         <button className='button' onClick={handleLogin} type="submit">Register</button>

                    </form>

               </div>
               <div className='side'>
                    <h1>Online Text Editor</h1>
                    <h2>Connect Together, Create Together.</h2>
               </div>
          </div>
     )
}

export default Register
