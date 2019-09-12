import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"


const MainNav = [
  {
    name: 'Home',
    link: '/'
  },{
    name: 'Blog',
    link: '/blog/'
  },{
    name: 'Page 2',
    link: '/page-2/'
  },
]

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `black`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
            fontSize: 2 + `rem`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>

      <nav id="main-nav" className="main-nav">
        <ul>
          {MainNav.map(link => (
            <li key={link.name}>
              <a href={link.link}
                className={link.name.toLowerCase()} alt={link.name}>{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>

    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
