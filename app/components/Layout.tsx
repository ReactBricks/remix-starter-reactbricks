import { ReactNode, useContext } from "react"
import { ReactBricksContext } from "react-bricks"

interface LayoutProps {
  children?: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkColorMode } = useContext(ReactBricksContext)

  return (
    <div className={`layoutContainer ${isDarkColorMode ? "dark" : "light"}`}>
      <main className='layoutMain'>{children}</main>
    </div>
  )
}

export default Layout
