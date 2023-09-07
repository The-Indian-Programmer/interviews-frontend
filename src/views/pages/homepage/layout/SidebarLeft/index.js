import React, { useEffect } from 'react'
import { getUsersList } from './store'
import { useDispatch, useSelector } from 'react-redux'
import {defaultAvatar} from '../../../../../configs/Contants'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { isEmpty } from '../../../../../configs/Funtions'
const SidebarLeft = () => {

  /* Redux Vars */
  const dispatch = useDispatch()
  const currentPage = useSelector(state => state.users.currentPage)
  const perPageItem = useSelector(state => state.users.perPageItem)
  const allUsers = useSelector(state => state.users.allUsers)
  const onlineUsers = useSelector(state => state.socket.onlineUsers)
  const userSocketId = useSelector(state => state.socket.userSocketId)


  /* Routes Vars */
  const history = useHistory()
  


  const userLists = allUsers.data.map(item => {
    return {
      _id: item._id,
      username: item.username,
      name: item.profile ? item.profile.name : '',
      profilePicture: item.profile ? item.profile.profilePicture : defaultAvatar,
      isOnline: onlineUsers.find(user => ((user.userId == item._id) && (!isEmpty(user.socketId)))) ? true : false,
    }
  })

  console.log(userLists)


  /* Function to get the users list */
  const getUsers = async () => {
    dispatch(getUsersList({page: currentPage, perPageItem: perPageItem}))

  }

  /* Function to get data on mount */
  useEffect(() => {
    getUsers()
  }, [currentPage])



  /* Function to handle user click */
  const handleUserClick = (user) => {
    history.push(`/user/${user._id}`)
  }

  /* Function to handle user follow */
  const handleUserFollow = () => {
    Swal.fire({
      icon: 'error',
      title: 'Sorry?',
      text: 'Currently working on it!',
      backdrop: `rgba(0,0,0, 1)`,
      confirmButtonColor: 'red',
      confirmButtonText: '😂 😂 😂 Okay!'
    })
  }

  return (
    <aside className="  col-span-0 hidden sm:hidden md:hidden lg:block xl:block 2xl:block sm:col-span-0 md:col-span-0 lg:col-span-3 xl:col-span-3 2xl:col-span-3  bg-black p-4 sticky top-20">
      <div className="grid grid-cols-12 sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 gap-y-3">
        {userLists.map((user) => (
         <div className='col-span-12 px-2 py-1 rounded-md flex items-center justify-between mb-2'>
          <div className='flex items-center justify-between'>
            <div className='relative'>
            <img src={user.profilePicture} alt="Profile" className={`w-12 h-12 rounded-full border border-white`} />
            {user.isOnline ? <span className="w-3 absolute right-0 bottom-0.5 h-3 bg-green-500 rounded-full"></span> : ''}
            </div>
            <div className='text-white ml-4'>
              <h2 className="text-lg font-semibold" role='button' onClick={() => handleUserClick(user)}>{user.username}</h2>
              <h2 className="text-sm font-normal">{user.name}</h2>
            </div>
          </div>
          <button onClick={handleUserFollow} className='btn text-white bg-blue-400 px-4 py-2 rounded-2xl'>Follow</button>
         </div>
        ))}
      </div>
    </aside>
  )
}

export default SidebarLeft