import {Route, Routes} from 'react-router'
import { useLocation } from 'react-router'
import { getFromLocal, setDarkMode } from './functions/functions'

// universal
import Navbar from './components/navbar'
import Error from './components/error'
import Practice from './layout/Account/practice'
import Quiz from './layout/Account/quiz'
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
import Groups from './layout/Account/Slides/groups'
import GroupAdd from './layout/Account/Create/groupAdd'
import GroupEdit from './layout/Account/Edit/groupEdit'

//account
import Create from './layout/Account/Create/create'
import Edit from './layout/Account/Edit/edit'
import Category from './layout/Account/Create/category'
import { View } from './layout/Account/Slides/view'

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

        <Route path='/form' element={<>
          <Navbar />
          <Form />
          </>}>
          
        <Route path='forgot' element={<ForgotPassword />}></Route>
        </Route>

        <Route path='/account' element={<Account />}>
          <Route path='cards/:id/stats' element={<Chart />}></Route>
          <Route path='cards/:id/practice' element={<Practice />}></Route>
          <Route path='cards/:id/quiz' element={<Quiz />}></Route>

          <Route path='' element={<Groups />}>
            <Route path='create' element={<GroupAdd />}></Route>
            <Route path=':id/edit' element={<GroupEdit />}></Route>  
          </Route>

          <Route path=':category/:id' element={<Category />}>
            <Route path='view/:slideId' element={<View />}></Route>
            <Route path='create' element={<Create />}></Route>
            <Route path='edit/:slideId' element={<Edit />}></Route>
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