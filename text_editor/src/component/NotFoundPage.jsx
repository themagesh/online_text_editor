import React from 'react'
import page from './styles/404.gif'

function NotFoundPage() {
     const styles = {
          h1: {
               textAlign: 'center',
               marginTop: '10%',
               fontFamily: 'Poppins',
               padding: '10px',
               margin: '10px',
          },
          img: {
               display: 'block',
               marginLeft: 'auto',
               marginRight: 'auto',
               marginTop: '5%',
          }

     }
     return (
          <div>
               <h1 style={styles.h1}>404!</h1>
               <h1 style={styles.h1}>Page not found</h1>
               <img src={page} alt="404" style={styles.img}/>
          </div>
     )
}

export default NotFoundPage
