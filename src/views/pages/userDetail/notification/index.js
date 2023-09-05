import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNotificationList, markAsRead } from '../store'
import {defaultAvatar} from '../../../../configs/Contants'
import {isEmpty} from '../../../../configs/Funtions'
import { useHistory } from 'react-router-dom'
import { getUserData } from '../../../../redux/authentication'
const NotificationList = () => {

    /* Store */
    const dispatch = useDispatch()
    const allNotifications = useSelector(state => state.user.notifications)


    /* Routes vars */
    const history = useHistory()


    let notifications = allNotifications.map((notification) => {
        return {
            id: notification._id,
            type: notification.type,
            actionBy: {
                id: notification.actionBy._id,
                name: notification.actionBy.profile ? notification.actionBy.profile.name : "Anonymous",
                profile: notification.actionBy.profile ? notification.actionBy.profile.profilePicture : defaultAvatar,
            },
            post: notification.post ? {
                id: notification.post._id,
            } : null,
            read: notification.read,
            createdAt: notification.createdAt,
        }
    })

    /* Function to get notification list */
    const getNotifications = () => {
        dispatch(getNotificationList({ page: 1, perPageItem: 100 }))
    }


    /* Function to get data on mount */
    React.useEffect(() => {
        getNotifications()
    }, [])


    /* Function to handle notification click */
    const handleNotificationClick = (notification) => {
        let url = ""
        if (notification.type === "like" || notification.type === "comment") {
            url = `/post/${notification.post.id}`
        } else {
            url = `/user/${notification.actionBy.id}`
        }
        if (!notification.read) {
            dispatch(markAsRead({notificationId: notification.id}))
            dispatch(getUserData())
        }
        if (!isEmpty(url)) {
            history.push(url)
        }
    }

    return (
        <div className="homepage mt-20 w-auto min-h-screen bg-black text-white mb-10 border-r-2 ">
            <div className="h-100 px-2 py-2 container w-full sm:w-9/12 md:w-8/12 lg:w-8/12 xl:w-7/12 mx-auto">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center border-b-4 pb-4">
                        <h1 className="text-2xl font-bold">Notifications</h1>
                        {/* <button className="text-sm text-gray-400">Mark all as read</button> */}
                    </div>
                    <div className="flex flex-col mt-5">
                        {
                            notifications.map((notification, index) => {
                                return (
                                    <div onClick={() => handleNotificationClick(notification)} key={index} className={`flex flex-row justify-between items-center mb-5  px-1 py-2 text-white cursor-pointer ${notification.read ? 'bg-gray-600' : 'bg-gray-950'}`}>
                                        <div className="flex flex-row items-center">
                                            <img className="w-10 h-10 rounded-full mr-3" src={notification.actionBy.profile} alt="profile" />
                                            <div className="flex flex-col">
                                                <h1 className="text-sm font-bold">{notification.actionBy.name}</h1>
                                                <p className="text-xs ">{notification.type === "like" ? "liked your post" : notification.type === "comment" ? "commented on your post" : "started following you"}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationList