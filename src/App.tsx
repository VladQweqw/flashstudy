import {Route, Routes} from 'react-router'
import { useLocation } from 'react-router'
import { getFromLocal, setDarkMode } from './functions/functions'

// universal
import Navbar from './components/navbar'
import Footer from './components/footer'
import Error from './components/error'
import Practice from './layout/Account/actions/Cards/practice'
import Quiz from './layout/Account/actions/Cards/quiz'
import Settings from './components/settings'
import Popup from './components/popup'
import Chart from './layout/Account/chart'

//form
import Form from './layout/Form/form'
import ForgotPassword from './components/forgotPassword'

//home
import Home from './layout/Home/home'
import Account from './layout/Account/account'

//account
import Cards from './layout/Account/cards'
import CardsAdd from './layout/Account/actions/Cards/cardsAdd'
import CardsEdit from './layout/Account/actions/Cards/cardsEdit'

import Notes from './layout/Account/notes'    
import NotesAdd from './layout/Account/actions/Notes/notesAdd'
import NotesEdit from './layout/Account/actions/Notes/notesEdit'

import Exams from './layout/Account/exams'
import ExamsAdd from './layout/Account/actions/Exams/examsAdd'
import ExamEdit from './layout/Account/actions/Exams/examEdit'


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
     <Popup />
      <Routes location={background || location}>
          <Route path='/'>
            <Route index element={<Home />}></Route>
            <Route path='/form' element={<Form />}>
              <Route path='forgot' element={<ForgotPassword />}></Route>
            </Route>
            <Route path="settings" element={<Settings />} />

            <Route path='/account' element={<Account />}>
              <Route index element={<Cards />}></Route>
              <Route path='stats' element={<Chart />}></Route>
              <Route path='cards/practice' element={<Practice />}></Route>
              <Route path='cards/quiz' element={<Quiz />}></Route>


              <Route path='cards' element={<Cards />}>
                <Route path='add' element={<CardsAdd />}></Route>
                <Route path='edit' element={<CardsEdit />}></Route>
              </Route>

              <Route path='notes' element={<Notes />}>
                <Route path='add' element={<NotesAdd />}></Route>
                <Route path='edit' element={<NotesEdit />}></Route>

              </Route>

              <Route path='exams' element={<Exams />}>
                <Route path='add' element={<ExamsAdd />}></Route>
                <Route path='edit' element={<ExamEdit />}></Route>

              </Route>

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