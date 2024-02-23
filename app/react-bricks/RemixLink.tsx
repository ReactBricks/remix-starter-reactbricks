import { Link, useLocation } from '@remix-run/react'
import { types } from 'react-bricks/frontend'

const RemixLink: types.RenderLocalLink = ({
  href,
  className,
  activeClassName,
  isAdmin,
  children,
}) => {
  const location = useLocation()

  let anchorClassName = ''

  if (location.pathname === href) {
    anchorClassName = `${className} ${activeClassName}`
  } else {
    anchorClassName = className || ''
  }

  return (
    <Link to={href} className={anchorClassName}>
      {children}
    </Link>
  )
}

export default RemixLink
