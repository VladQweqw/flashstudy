import React,{} from 'react'
import {Route, Routes} from 'react-router'

// components
import Navbar from './components/navbar'
import Home from './layout/home'

export default function App() {

   return(
    <>
      <Navbar />
      <Routes>
          <Route index element={<Home />}></Route>
      </Routes>
    </>
   )
}