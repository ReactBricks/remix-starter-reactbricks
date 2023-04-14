import { ReactNode } from "react"
import { useReactBricksContext } from "react-bricks"

interface LayoutProps {
  children?: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkColorMode } = useReactBricksContext()

  return (
    <div className={`layoutContainer ${isDarkColorMode ? "dark" : "light"}`}>
      <main className='layoutMain'>{children}</main>
    </div>
  )
}

export default Layout
