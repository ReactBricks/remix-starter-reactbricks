import React, { useRef, useState } from 'react'
import { Text, Repeater, types, Link, Plain } from 'react-bricks/frontend'
import useOnClickOutside from './useClickOutside'

interface HeaderMenuItemProps {
  linkPath: string
  linkText: any
  submenuItems: any
  mobileRef: React.MutableRefObject<HTMLDivElement>
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderMenuItem: types.Brick<HeaderMenuItemProps> = ({
  linkPath,
  linkText,
  submenuItems,
  mobileRef,
  setMobileMenuOpen,
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => setOpen(false))
  useOnClickOutside(mobileRef, () => setMobileMenuOpen(false))
  if (!submenuItems || !submenuItems.length) {
    return (
      <div>
        <Link
          href={linkPath}
          className="HeaderMenuItemLink"
          activeClassName="HeaderMenuItemLinkActive"
        >
          <Text
            propName="linkText"
            placeholder="Type a text..."
            renderBlock={({ children }) => <span>{children}</span>}
          />
        </Link>
        <Link href={linkPath} className="HeaderMenuItemLinkHamburger">
          <div onClick={() => setMobileMenuOpen(false)}>
            {' '}
            {typeof linkText === 'string'
              ? linkText
              : Plain.serialize(linkText)}
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div ref={ref} className="HeaderMenuItemContainerLinkItemWithSubItems">
        <button
          className={`HeaderMenuItemButtonLinkItemWithSubItems ${
            open ? 'HeaderMenuItemButtonLinkItemWithSubItemsOpen' : ''
          }
          `}
          onClick={() => setOpen((current) => !current)}
        >
          <Text
            propName="linkText"
            placeholder="Type a text..."
            renderBlock={({ children }) => <div>{children}</div>}
          />
          {open ? (
            <svg
              viewBox="0 0 14 14"
              width="14px"
              height="14px"
              className={'HeaderMenuItemSvgClass'}
            >
              <path
                d="m7.35 2.9 5.5 5.5a.5.5 0 0 1-.7.7L7 3.96 1.85 9.1a.5.5 0 1 1-.7-.7l5.5-5.5c.2-.2.5-.2.7 0Z"
                fill="currentColor"
              ></path>
            </svg>
          ) : (
            <svg
              viewBox="0 0 14 14"
              width="14px"
              height="14px"
              className={'HeaderMenuItemSvgClass'}
            >
              <path
                d="m1.15 5.6 5.5 5.5c.2.2.5.2.7 0l5.5-5.5a.5.5 0 0 0-.7-.7L7 10.04 1.85 4.9a.5.5 0 1 0-.7.7Z"
                fill="currentColor"
              ></path>
            </svg>
          )}
        </button>
        {open && (
          <div className={'HeaderMenuItemContainerSubmenuItemsOpen'}>
            <Repeater
              propName="submenuItems"
              renderItemWrapper={(props) => (
                <div onClick={() => setOpen((current) => !current)}>
                  {props}
                </div>
              )}
            />
          </div>
        )}
      </div>

      <div className={'HeaderMenuItemContainerSubmenuItems'} role="group">
        <div className={'HeaderMenuItemContainerLinkText'}>
          {typeof linkText === 'string' ? linkText : Plain.serialize(linkText)}
        </div>
        <Repeater
          propName="submenuItems"
          renderItemWrapper={(props) => (
            <div onClick={() => setMobileMenuOpen(false)}>{props}</div>
          )}
        />
      </div>
    </div>
  )
}

HeaderMenuItem.schema = {
  name: 'header-menu-item',
  label: 'Menu Item',
  category: 'layout',
  hideFromAddMenu: true,

  repeaterItems: [
    {
      name: 'submenuItems',
      itemType: 'header-menu-sub-item',
    },
  ],

  getDefaultProps: () => ({
    submenuItems: [],
    linkPath: '/about-us',
    isActive: false,
    linkText: 'About us',
  }),

  sideEditProps: [
    {
      name: 'linkPath',
      label: 'Link to...',
      type: types.SideEditPropType.Text,
    },
  ],
}

export default HeaderMenuItem
