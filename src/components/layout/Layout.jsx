import React from 'react'
import { Outlet } from 'react-router-dom'
import './layout.css'

// Components
import Header from "../header/Header"
import Footer from "../footer/Footer"

const Layout = () => {
  return (
    <>

          <Header/>
          <main >
            <Outlet />
          </main>
          <Footer/>       
        
    </>
  )
}

export default Layout