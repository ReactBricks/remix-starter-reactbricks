import React from "react"
import { Text, types, Link } from "react-bricks/frontend"
import { FiChevronRight } from "react-icons/fi"

interface HeaderMenuSubItemProps {
  linkPath: string
}

const HeaderMenuSubItem: types.Brick<HeaderMenuSubItemProps> = ({
  linkPath,
}) => {
  return (
    <Link href={linkPath} className={"HeaderMenuSubItemLinkContainer"}>
      <div className='HeaderMenuSubItemFiContainer'>
        <FiChevronRight />
      </div>
      <div className={"HeaderMenuSubItemTextContainer"}>
        <Text
          propName='linkText'
          placeholder='Type a text...'
          renderBlock={({ children }) => (
            <div className={"HeaderMenuSubItemLinkText"}>{children}</div>
          )}
        />
        <div className={"HeaderMenuSubItemDescriptionContainer"}>
          <Text
            propName='linkDescription'
            placeholder='Type a text...'
            renderBlock={({ children }) => (
              <div className={"HeaderMenuSubItemLinkDescription"}>
                {children}
              </div>
            )}
          />
        </div>
      </div>
    </Link>
  )
}

HeaderMenuSubItem.schema = {
  name: "header-menu-sub-item",
  label: "Submenu Item",
  category: "layout",
  hideFromAddMenu: true,

  getDefaultProps: () => ({
    linkText: "Changelog",
    linkDescription: "Release notes for all React Bricks versions",
    linkPath: "/",
  }),

  sideEditProps: [
    {
      name: "linkPath",
      label: "Link to...",
      type: types.SideEditPropType.Text,
    },
  ],
}

export default HeaderMenuSubItem
