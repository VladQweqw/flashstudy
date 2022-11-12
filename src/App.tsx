import {Route, Routes} from 'react-router'

// components
import Navbar from './components/navbar'
import Footer from './components/footer'

import Home from './layout/Home/home'

export default function App() {

   return(
    <>
      <Navbar />
      <Routes>
          <Route index element={<Home />}></Route>
      </Routes>
      <Footer />
    </>
   )
}