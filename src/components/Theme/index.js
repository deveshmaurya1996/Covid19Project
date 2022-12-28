/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {AiFillCaretDown} from 'react-icons/ai'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

class Theme extends Component {
  state = {
    theme: false,
    activeClass: false,
  }

  renderThemeButtonInNavbar = () => (
    <ThemeContext.Consumer>
      {value => {
        const {theme, activeClass} = this.state

        const {changeTheme} = value

        const onClickThemeButton = () => {
          changeTheme({theme})
          this.setState(prevState => ({
            activeClass: !prevState.activeClass,
          }))
        }

        const activeThemeClass =
          activeClass === true ? 'active-theme-class' : ''

        return (
          <div className="theme-container">
            <button
              type="button"
              onClick={onClickThemeButton}
              className={`theme-btn ${activeThemeClass}`}
            >
              Theme
              <AiFillCaretDown />
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return <>{this.renderThemeButtonInNavbar()}</>
  }
}
export default withRouter(Theme)
