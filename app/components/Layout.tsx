import { ReactNode, useEffect, useState } from 'react'
import { useReactBricksContext } from 'react-bricks/frontend'

interface LayoutProps {
  children?: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkColorMode } = useReactBricksContext()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }

  return (
    <div className={`layoutContainer ${isDarkColorMode ? 'dark' : 'light'}`}>
      <main className="layoutMain">{children}</main>
    </div>
  )
}

export default Layout
