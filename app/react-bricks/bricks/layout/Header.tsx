import { useEffect, useRef, useState } from 'react'
import { Image, Repeater, types, Link } from 'react-bricks/frontend'
import { useReactBricksContext } from 'react-bricks/frontend'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import { FiMenu, FiX } from 'react-icons/fi'
import useOnClickOutside from './useClickOutside'

interface HeaderProps {}

const Header: types.Brick<HeaderProps> = ({}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isDarkColorMode, toggleColorMode } = useReactBricksContext()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => setMobileMenuOpen(false))

  return (
    <section className={'HeaderSection'}>
      <nav className={'HeaderNavClass'}>
        <Link href="/" aria-label="home" className={'HeaderLinkLogo'}>
          <Image
            propName="logo"
            alt="Logo"
            maxWidth={300}
            imageClassName={'HeaderImageClass'}
          />
        </Link>
        <div className={'HeaderContainerMenuItems'}>
          <Repeater
            propName="menuItems"
            itemProps={{ mobileRef: ref, setMobileMenuOpen }}
          />
        </div>
        <div className={'HeaderContainerButtons'}>
          <Repeater
            propName="buttons"
            itemProps={{ simpleAnchorLink: true }}
            renderWrapper={(items) => (
              <div className={'HeaderButtonsWrapper'}>{items}</div>
            )}
          />
        </div>

        {/* DARK MODE BUTTON */}
        {mounted && (
          <button
            type="button"
            className={'darkModeButton'}
            onClick={toggleColorMode}
          >
            {!isDarkColorMode ? (
              <BsMoonFill />
            ) : (
              <BsSunFill
                style={{ fontSize: '1.25rem', lineHeight: '1.75rem' }}
              />
            )}
          </button>
        )}

        <div ref={ref} className={'HeaderContainerHamburgerMenu'}>
          <button
            className={'HeaderButtonHamburgerMenu'}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? (
              <FiX size={18} className={'HamburgerMenuFiX'} />
            ) : (
              <FiMenu size={20} className={'HamburgerMenuFiMenu'} />
            )}
          </button>
          {mobileMenuOpen && (
            <div className={'HeaderContainerHamburgerMenuItems'}>
              <Repeater
                propName="menuItems"
                itemProps={{
                  mobileRef: ref,
                  setMobileMenuOpen,
                }}
              />
            </div>
          )}
        </div>
      </nav>
    </section>
  )
}

Header.schema = {
  name: 'header',
  label: 'Header',
  category: 'layout',
  tags: ['header', 'menu'],
  repeaterItems: [
    {
      name: 'menuItems',
      itemType: 'header-menu-item',
      itemLabel: 'Item',
      min: 0,
      max: 6,
    },
    {
      name: 'buttons',
      itemType: 'button',
      itemLabel: 'Button',
      min: 0,
      max: 2,
    },
  ],
  sideEditProps: [],
  getDefaultProps: () => ({
    menuItems: [
      {
        linkPath: '/',
        linkText: 'Home',
      },
      {
        linkPath: '/about-us',
        linkText: 'About us',
      },
      {
        linkPath: '',
        linkText: 'Features',
        submenuItems: [
          {
            linkText: 'Visual editing',
            linkDescription:
              'The best visual experience for your content editors',
            linkPath: '/',
          },
        ],
      },
    ],
    logo: {
      src: 'https://images.reactbricks.com/original/8d0eb40f-6e1a-4f6c-9895-a06767fcf5fa.svg',
      placeholderSrc:
        'https://images.reactbricks.com/original/8d0eb40f-6e1a-4f6c-9895-a06767fcf5fa.svg',
      srcSet: '',
      width: 450,
      height: 100,
      alt: 'React Bricks',
      seoName: 'react-bricks',
    },
    buttons: [
      {
        text: 'Edit content',
        href: '/admin',
        isTargetBlank: false,
        type: 'solid',
        padding: 'small',
      },
    ],
  }),
}

export default Header
