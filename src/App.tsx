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
import Settings from './components/settings'
import { useLocation } from 'react-router'
import Chart from './layout/Account/chart'
import { getFromLocal, setDarkMode } from './functions/functions'

export default function App() {
  const location = useLocation();
  const background = location.state && location.state.background;  
  let theme = getFromLocal('darkMode');

    
    if(theme !== false && theme !== true) {
      setDarkMode('DARK')
    }else {
      setDarkMode(getFromLocal('darkMode') ? 'DARK' : 'LIGHT')
    }

    document.body.addEventListener('contextmenu', (e) => e.preventDefault())

   return(
    <>
      <Routes location={background || location}>
          <Route path='/'>
            <Route index element={<Home />}></Route>
            <Route path='/form' element={<Form />}></Route>
            <Route path="settings" element={<Settings />} />

            <Route path='/account' element={<Account />}>
              <Route index element={<Cards />}></Route>

              <Route path='stats' element={<Chart />}></Route>
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

          </Route>
          
          <Route path='*' element={<Error />}></Route>
      </Routes>
      {background && (
            <Routes>
              <Route path="settings" element={<Settings />} />
            </Routes>
          )}
      {/* <Footer /> */}
    </>
   )
}