// ** React Imports
import { useEffect, useState } from 'react'

// ** Custom Hooks
import { useSkin } from '@/utility/hooks/useSkin'

// ** Third Party Components
import classnames from 'classnames'

// ** Custom components
import NavBar from "./components/blankLayoutNavbar"
import Footer from "./components/blankLayoutFooter"

const BlankLayout = ({ children }) => {
  // ** States
  const [isMounted, setIsMounted] = useState(false)

  // ** Hooks
  const { skin } = useSkin()

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={classnames('blank-page', {
        'dark-layout': skin === 'dark'
      })}
    >
      <div className='app-content content'>
        <div className='content-wrapper'>
          <NavBar />
          <div className='content-body'>{children}</div>
          <Footer />

        </div>
      </div>
    </div>
  )
}

export default BlankLayout
