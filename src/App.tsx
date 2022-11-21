import {Route, Routes} from 'react-router'

// components
import Navbar from './components/navbar'
import Footer from './components/footer'

import Form from './layout/Form/form'
import Home from './layout/Home/home'

import Account from './layout/Account/account'

import Cards from './layout/Account/cards'
import Notes from './layout/Account/notes'
import Exams from './layout/Account/exams'

export default function App() {

  
   return(
    <>
      <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/form' element={<Form />}></Route>

          <Route path='/account' element={<Account />}>
            <Route index element={<Cards />}></Route>
            <Route path='cards' element={<Cards />}></Route>

            <Route path='notes' element={<Notes />}></Route>
            <Route path='exams' element={<Exams />}></Route>
          </Route>

      </Routes>
      {/* <Footer /> */}
    </>
   )
}