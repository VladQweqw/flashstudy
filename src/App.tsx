import {Route, Routes} from 'react-router'

// components
import Navbar from './components/navbar'
import Footer from './components/footer'
import Error from './components/error'

import Form from './layout/Form/form'
import Home from './layout/Home/home'

import Account from './layout/Account/account'
import Cards from './layout/Account/cards'
import Notes from './layout/Account/notes'
import Exams from './layout/Account/exams'

import CardsAdd from './layout/Account/actions/cardsAdd'
import NotesAdd from './layout/Account/actions/notesAdd'
import ExamsAdd from './layout/Account/actions/examsAdd'

import Practice from './layout/Account/actions/practice'
import Quiz from './layout/Account/actions/quiz'

export default function App() {

  
   return(
    <>
      <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/form' element={<Form />}></Route>

          <Route path='/account' element={<Account />}>
            <Route index element={<Cards />}></Route>

            <Route path='cards' element={<Cards />}>
              <Route path='add' element={<CardsAdd />}></Route>
            </Route>
            <Route path='notes' element={<Notes />}>
              <Route path='add' element={<NotesAdd />}></Route>
            </Route>
            <Route path='exams' element={<Exams />}>
              <Route path='add' element={<ExamsAdd />}></Route>
            </Route>

            <Route path='cards/practice' element={<Practice />}></Route>
            <Route path='cards/quiz' element={<Quiz />}></Route>
          </Route>

          <Route path='*' element={<Error />}></Route>
      </Routes>
      {/* <Footer /> */}
    </>
   )
}