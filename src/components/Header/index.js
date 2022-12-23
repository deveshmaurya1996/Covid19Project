/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import './index.css'
import Theme from '../Theme'
import ThemeContext from '../../context/ThemeContext'

class Header extends Component {
  state = {
    displaySmNavItems: false,
  }

  onClickHamburgerMenu = () => {
    this.setState(prevState => ({
      displaySmNavItems: !prevState.displaySmNavItems,
    }))
  }

  onClickCloseNav = () => {
    this.setState(prevState => ({
      displaySmNavItems: !prevState.displaySmNavItems,
    }))
  }

  render() {
    const {location} = this.props
    const {pathname} = location
    const {displaySmNavItems} = this.state
    const activeHomeClass = pathname === '/' ? 'active-tab-class' : ''
    const activeAboutClass = pathname === '/about' ? 'active-tab-class' : ''

    return (
      <nav className="header-container">
        <div className="navbar-main-large-container">
          <Link to="/" className="nav-item-link">
            <h1 className="logo-heading">
              COVID19<span className="india">INDIA</span>
            </h1>
          </Link>
          <div className="nav-bar-large-container">
            <ul className="nav-controls">
              <Link to="/" className="nav-item-link">
                <li
                  className={`nav-item ${activeHomeClass}`}
                  onClick={this.onClickActiveHomeNav}
                >
                  Home
                </li>
              </Link>

              <Link to="/about" className="nav-item-link">
                <li
                  className={`nav-item ${activeAboutClass}`}
                  onClick={this.onClickActiveAboutNav}
                >
                  About
                </li>
              </Link>
              <li className="nav-item">
                <Theme />
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-main-small-container">
          <div className="logo-hamburger-menu-container">
            <Link to="/" className="nav-item-link">
              <h1 className="logo-heading">
                COVID19<span className="india">INDIA</span>
              </h1>
            </Link>
            <button
              type="button"
              onClick={this.onClickHamburgerMenu}
              className="hamburger-btn"
            >
              <img
                src="https://res.cloudinary.com/dxknzwqf3/image/upload/v1671442826/add-to-queue_1_hlpxf2.png"
                alt="nav-bar-icon"
                className="nav-bar-icon"
              />
            </button>
          </div>

          {displaySmNavItems && (
            <ThemeContext.Consumer>
              {value => {
                const {theme} = value
                const smallContLightMode =
                  theme === true ? 'small-light-mode' : ''
                return (
                  <div className={`nav-sm-container ${smallContLightMode}`}>
                    <ul className="sm-list-container">
                      <Link to="/" className="nav-item-link">
                        <li
                          className={`nav-item ${activeHomeClass}`}
                          onClick={this.onClickActiveHomeNav}
                        >
                          Home
                        </li>
                      </Link>
                      <Link to="/about" className="nav-item-link">
                        <li
                          onClick={this.onClickActiveAboutNav}
                          className={`nav-item ${activeAboutClass}`}
                        >
                          About
                        </li>
                      </Link>
                      <li className="nav-item">
                        <Theme />
                      </li>
                      <li className="nav-item">
                        <button
                          testid="close-nav-btn"
                          className="close-nav-btn"
                          type="button"
                          onClick={this.onClickCloseNav}
                        >
                          <img
                            src="https://res.cloudinary.com/dxknzwqf3/image/upload/v1671442891/Solid_i4v3u2.png"
                            alt="close nav btn"
                            className="close-nav-btn"
                          />
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              }}
            </ThemeContext.Consumer>
          )}
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
