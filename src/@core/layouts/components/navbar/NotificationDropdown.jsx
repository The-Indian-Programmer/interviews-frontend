// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@/@core/components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'


const NotificationDropdown = () => {
  // ** Notification Array
  const notificationsArray = [
    {
      // img: require('@/@core/assets/images/portrait/small/avatar-s-15.jpg').default,
      subtitle: 'Won the monthly best seller div.',
      title: (
        <p className='media-heading'>
          <span className='fw-bolder'>Congratulation Sam 🎉</span>winner!
        </p>
      )
    },
    
  ]

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {notificationsArray.map((item, index) => {
          return (
            <a key={index} className='d-flex' href='/' onClick={e => e.preventDefault()}>
              <div
                className={classnames('list-item d-flex', {
                  'align-items-start': !item.switch,
                  'align-items-center': item.switch
                })}
              >
                {!item.switch ? (
                  <Fragment>
                    <div className='me-1'>
                      <Avatar
                        {...(item.img
                          ? { img: item.img, imgHeight: 32, imgWidth: 32 }
                          : item.avatarContent
                          ? {
                              content: item.avatarContent,
                              color: item.color
                            }
                          : item.avatarIcon
                          ? {
                              icon: item.avatarIcon,
                              color: item.color
                            }
                          : null)}
                      />
                    </div>
                    <div className='list-item-body flex-grow-1'>
                      {item.title}
                      <small className='notification-text'>{item.subtitle}</small>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    {item.title}
                    {item.switch}
                  </Fragment>
                )}
              </div>
            </a>
          )
        })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */

  return (
    <div tag='li' className='dropdown-notification nav-item me-25'>
      <div tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        <div pill color='danger' className='div-up'>
          5
        </div>
      </div>
      <div end tag='ul' className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <div className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 me-auto'>Notifications</h4>
            <div tag='div' color='light-primary' pill>
              6 New
            </div>
          </div>
        </li>
        {renderNotificationItems()}
        <li className='dropdown-menu-footer'>
          <div color='primary' block>
            Read all notifications
          </div>
        </li>
      </div>
    </div>
  )
}

export default NotificationDropdown
