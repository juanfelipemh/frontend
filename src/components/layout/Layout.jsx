import React from 'react'
import { Outlet } from 'react-router-dom'

// Components
import Header from "../header/Header"
import Footer from "../footer/Footer"

const Layout = () => {
  return (
    <>

          <Header/>
          <Outlet />
          <Footer/>       
        
    </>
  )
}

export default Layout