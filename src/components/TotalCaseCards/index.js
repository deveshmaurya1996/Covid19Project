/* eslint-disable react/no-unknown-property */
import './index.css'

const TotalCaseCards = props => {
  const {
    stateTotal,
    showActiveCases,
    showDeceasedCases,
    showRecoveredCases,
    showConfirmedCases,
  } = props

  const {confirmed, deceased, recovered, active} = stateTotal

  const activeConfirmedClass = showConfirmedCases
    ? 'confirmed-active-class'
    : ''
  const activeActiveClass = showActiveCases ? 'active-active-class' : ''

  const activeRecoveredClass = showRecoveredCases
    ? `recovered-active-class`
    : ''

  const activeDeceasedClass = showDeceasedCases ? `deceased-active-class` : ''

  return (
    <>
      <div
        testid="countryWideConfirmedCases"
        className={`home-country-wide confirmed ${activeConfirmedClass}`}
      >
        <p className="case-card-heading">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dxknzwqf3/image/upload/v1671450927/check-mark_1_3x_abz61k.png"
          alt="country wide confirmed cases pic"
          className="card-image"
        />
        <p className="case-count confirmed">{confirmed}</p>
      </div>
      <div
        testid="countryWideActiveCases"
        className={`home-country-wide active ${activeActiveClass}`}
      >
        <p className="case-card-heading">Active</p>
        <img
          src="https://res.cloudinary.com/dxknzwqf3/image/upload/v1671450927/protection_1_3x_qwffzu.png"
          alt="country wide active cases pic"
          className="card-image"
        />
        <p className="case-count">{active}</p>
      </div>
      <div
        testid="countryWideRecoveredCases"
        className={`home-country-wide recovered ${activeRecoveredClass}`}
      >
        <p className="case-card-heading">Recovered</p>
        <img
          src="https://res.cloudinary.com/dxknzwqf3/image/upload/v1671450926/recovered_1_3x_dhhyvh.png"
          alt="country wide recovered cases pic"
          className="card-image"
        />
        <p className="case-count">{recovered}</p>
      </div>

      <div
        testid="countryWideDeceasedCases"
        className={`home-country-wide deceased ${activeDeceasedClass}`}
      >
        <p className="case-card-heading">Deceased</p>
        <img
          src="https://res.cloudinary.com/dxknzwqf3/image/upload/v1671450927/breathing_1_3x_etljxq.png"
          alt="country wide deceased cases pic"
          className="card-image"
        />
        <p className="case-count">{deceased}</p>
      </div>
    </>
  )
}
export default TotalCaseCards
