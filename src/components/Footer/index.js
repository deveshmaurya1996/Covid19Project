import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const Footer = () => (
  <ThemeContext.Consumer>
    {value => {
      const {theme} = value
      const lightThemeColorClass = theme === true ? 'color-class' : ''
      const lightThemeIconClass = theme === true ? 'light-theme-icon' : ''
      return (
        <div className="footer-container">
          <h1 className={`heading ${lightThemeColorClass}`}>
            COVID19<span className="india">INDIA</span>
          </h1>

          <p className="description">
            we stand with everyone fighting on the front lines
          </p>
          <div className="icons-container">
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              <VscGithubAlt className={`icon ${lightThemeIconClass}`} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FiInstagram className={`icon ${lightThemeIconClass}`} />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <FaTwitter className={`icon ${lightThemeIconClass}`} />
            </a>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default Footer
