import {Route, Routes} from 'react-router'
import { useLocation } from 'react-router'
import { getFromLocal, setDarkMode } from './functions/functions'

// universal
import Navbar from './components/navbar'
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

//group
import Groups from './layout/Account/groups'
import GroupAdd from './layout/Account/actions/Group/groupAdd'
import GroupEdit from './layout/Account/actions/Group/groupEdit'

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
import Category from './layout/Account/category'



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
          <Route path='/' element={<Home />}></Route>

          <Route path='/form' element={<Form />}>
            <Route path='forgot' element={<ForgotPassword />}></Route>
          </Route>

          <Route path='/account' element={<Account />}>
            <Route path='' element={<Groups />}>
              <Route path='create' element={<GroupAdd />}></Route>
              <Route path='edit' element={<GroupEdit />}></Route>  
            </Route>

            <Route path=':category/:id' element={<Category />}>
              <Route path='create'></Route>
              <Route path='edit'></Route>
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