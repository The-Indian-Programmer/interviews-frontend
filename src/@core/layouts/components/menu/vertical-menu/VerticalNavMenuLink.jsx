// ** React Imports
import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'


const VerticalNavMenuLink = ({
  item,
  activeItem,
  setActiveItem,
  currentActiveItem
}) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag = item.externalLink ? 'a' : NavLink

  // ** Hooks
  const { t } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    if (currentActiveItem !== null) {
      setActiveItem(currentActiveItem)
    }
  }, [location])

  return (
    <li
      className={classnames({
        'nav-item': !item.children,
        disabled: item.disabled,
        active: item.navLink === activeItem
      })}
    >
      <LinkTag
        className='d-flex align-items-center'
        target={item.newTab ? '_blank' : undefined}
        /*eslint-disable */
        {...(item.externalLink === true
          ? {
              href: item.navLink || '/'
            }
          : {
              to: item.navLink || '/',
              isActive: match => {
                if (!match) {
                  return false
                }

                if (
                  match.url &&
                  match.url !== '' &&
                  match.url === item.navLink
                ) {
                  currentActiveItem = item.navLink
                }
              }
            })}
        onClick={e => {
          if (
            item.navLink.length === 0 ||
            item.navLink === '#' ||
            item.disabled === true
          ) {
            e.preventDefault()
          }
        }}
      >
        {item.icon}
        <span className='menu-item text-truncate'>{t(item.title)}</span>

        {item.div && item.divText ? (
          <div className='ms-auto me-1' color={item.div} pill>
            {item.divText}
          </div>
        ) : null}
      </LinkTag>
    </li>
  )
}

export default VerticalNavMenuLink