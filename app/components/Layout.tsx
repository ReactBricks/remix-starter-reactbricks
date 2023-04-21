import { ReactNode } from 'react'

interface LayoutProps {
  children?: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layoutContainer">
      <main className="layoutMain">{children}</main>
    </div>
  )
}

export default Layout
