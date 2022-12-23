/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FaqItem from '../FaqItem'
import Footer from '../Footer'
import './index.css'
import ThemeContext from '../../context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {
    faqsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCovidFaqs()
  }

  getCovidFaqs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const faqUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    const response = await fetch(faqUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      this.setState({
        faqsList: fetchedData.faq,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderCovidAbout = () => (
    <ThemeContext.Consumer>
      {value => {
        const {theme} = value
        const {faqsList} = this.state
        const backgroundClass =
          theme === false ? 'dark-Theme-Class' : 'light-Theme-Class'
        const lightModeHeading = theme === true ? 'light-mode-heading' : ''
        return (
          <div className={`about-route-container ${backgroundClass}`}>
            <h1 className={`about-heading ${lightModeHeading}`}>About</h1>
            <p className="last-update">Last update on Monday, Nov 15th 2021.</p>
            <p className={`about-description ${lightModeHeading}`}>
              COVID-19 vaccines be ready for distribution
            </p>
            <ul className="faq-list" testid="faqsUnorderedList">
              {faqsList.map(eachFaq => (
                <FaqItem faqData={eachFaq} key={eachFaq.qno} />
              ))}
            </ul>
            <Footer />
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderLoadingView = () => (
    <div className="covid-loader-container" testid="aboutRouteLoader">
      <Loader type="Oval" color="#007BFF" height="80" width="80" />
    </div>
  )

  renderCovidAboutData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCovidAbout()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCovidAboutData()}
      </>
    )
  }
}

export default About
