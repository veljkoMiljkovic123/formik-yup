import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAction } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ProfilePage() {
    const {myUser} = useSelector((state)=>state.userStore)
    const dispach = useDispatch()
    const navigate = useNavigate()
    function handleLogout(){
        //obrisi tj logout user
        //prebaci me na register
       if(true){}
       setTimeout(() => {
        dispach(logoutUserAction())
        navigate('/register')
        toast.success('Uspesno ste se izlogovali')
    }, 3000);
    }

  return (
    <div className='flex flex-col md:flex-row justify-center items-center container mx-auto my-10 gap-5'>
        <img className='w-[200px] h-[200px] rounded-full object-cover' src={myUser.image} alt="" />
        <div className='bg-slate-300 w-full p-5 rounded-[20px] flex flex-col gap-3 items-start'>
        <h2>FirstName: {myUser.firstName}</h2>
        <h2>LastName: {myUser.lastName}</h2>
        <h2>Birthday: {myUser.birthday}</h2>
        <h2>Email: {myUser.email}</h2>
        <h2>Gender: {myUser.gender}</h2>
        <button onClick={handleLogout} className='px-5 py-2 bg-blue-600 text-white rounded-lg '>Logout User</button>
        </div>
    </div>
  )
}

export default ProfilePage