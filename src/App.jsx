import { Outlet } from 'react-router-dom'
import './App.css'
import FormComponent from './components/FormComponent'
import NavbarComponent from './components/NavbarComponent'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { restoreUserAction } from './store/userSlice'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  
  const dispatch = useDispatch()
  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem('redux_user'))
    dispatch(restoreUserAction(user))
  },[dispatch])
  return (
    <div className='h-[100vh] bg-neutral-800 px-4'>
        <NavbarComponent />
        <Outlet />
        <ToastContainer />
    </div>
  )
}

export default App
