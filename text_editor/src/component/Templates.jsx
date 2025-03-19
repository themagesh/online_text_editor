import React from 'react'

import { Link, useNavigate } from 'react-router'
function Templates(props) {
     const style = {
          textDecoration: 'none',
          color: 'black',
          fontSize: '20px'
     }
     const Navigate = useNavigate()
     
     function handleDash() {
          localStorage.setItem('filepath', props.name)
          Navigate('/dash')

     }

     return (
          <>
               <Link style={style} to='/dash' onClick={handleDash}>
                    <li>{props.name}</li>
               </Link>

          </>
     )
}

export default Templates
