// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'

// ** Third Party Components
import * as Icon from 'react-feather'
import classnames from 'classnames'



// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getBookmarks, updateBookmarked, handleSearchQuery } from '@/redux/navbar'

const NavbarBookmarks = props => {
  // ** Props
  const { setMenuVisibility } = props

  // ** State
  const [value, setValue] = useState('')
  const [openSearch, setOpenSearch] = useState(false)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.navbar)

  // ** ComponentDidMount
  useEffect(() => {
    dispatch(getBookmarks())
  }, [])

  // ** Loops through Bookmarks Array to return Bookmarks
  const renderBookmarks = () => {
    if (store.bookmarks.length) {
      return store.bookmarks
        .map(item => {
          const IconTag = Icon[item.icon]
          return (
            <div key={item.target} className='d-none d-lg-block'>
              <div tag={Link} to={item.link} id={item.target}>
                <IconTag className='ficon' />
                <div target={item.target}>{item.title}</div>
              </div>
            </div>
          )
        })
        .slice(0, 10)
    } else {
      return null
    }
  }

  // ** If user has more than 10 bookmarks then add the extra Bookmarks to a dropdown
  const renderExtraBookmarksDropdown = () => {
    if (store.bookmarks.length && store.bookmarks.length >= 11) {
      return (
        <div className='d-none d-lg-block'>
          <div tag='span'>
            <div>
              <div tag='span'>
                <Icon.ChevronDown className='ficon' />
              </div>
              <div end>
                {store.bookmarks
                  .map(item => {
                    const IconTag = Icon[item.icon]
                    return (
                      <div tag={Link} to={item.link} key={item.id}>
                        <IconTag className='me-50' size={14} />
                        <span className='align-middle'>{item.title}</span>
                      </div>
                    )
                  })
                  .slice(10)}
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  // ** Removes query in store
  const handleClearQueryInStore = () => dispatch(handleSearchQuery(''))

  // ** Loops through Bookmarks Array to return Bookmarks
  const onKeyDown = e => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {
        setOpenSearch(false)
        handleClearQueryInStore()
      }, 1)
    }
  }

  // ** Function to toggle Bookmarks
  const handleBookmarkUpdate = id => dispatch(updateBookmarked(id))

  // ** Function to handle Bookmarks visibility
  const handleBookmarkVisibility = () => {
    setOpenSearch(!openSearch)
    setValue('')
    handleClearQueryInStore()
  }

  // ** Function to handle Input change
  const handleInputChange = e => {
    setValue(e.target.value)
    dispatch(handleSearchQuery(e.target.value))
  }

  // ** Function to handle external Input click
  const handleExternalClick = () => {
    if (openSearch === true) {
      setOpenSearch(false)
      handleClearQueryInStore()
    }
  }

  // ** Function to clear input value
  const handleClearInput = setUserInput => {
    if (!openSearch) {
      setUserInput('')
      handleClearQueryInStore()
    }
  }

  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none'>
        <div className='mobile-menu me-auto'>
          <div className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Icon.Menu className='ficon' />
          </div>
        </div>
      </ul>
      <ul className='nav navbar-nav bookmark-icons'>
        {renderBookmarks()}
        {renderExtraBookmarksDropdown()}
        <div className='nav-item d-none d-lg-block'>
          <div className='bookmark-star' onClick={handleBookmarkVisibility}>
            <Icon.Star className='ficon text-warning' />
          </div>
          <div className={classnames('bookmark-input search-input', { show: openSearch })}>
            <div className='bookmark-input-icon'>
              <Icon.Search size={14} />
            </div>
           
          </div>
        </div>
      </ul>
    </Fragment>
  )
}

export default NavbarBookmarks
