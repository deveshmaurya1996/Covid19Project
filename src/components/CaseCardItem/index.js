/* eslint-disable react/no-unknown-property */
import './index.css'

const CaseCardItem = props => {
  const {
    stateTotal,
    showConfirmed,
    showActive,
    showRecovered,
    showDeceased,
    showActiveCases,
    showDeceasedCases,
    showRecoveredCases,
    showConfirmedCases,
  } = props
  const {confirmed, deceased, recovered, active} = stateTotal

  const onClickConfirmed = () => {
    showConfirmed()
  }

  const onClickActive = () => {
    showActive()
  }

  const onClickRecovered = () => {
    showRecovered()
  }

  const onClickDeceased = () => {
    showDeceased()
  }

  const activeConfirmedClass = showConfirmedCases
    ? 'confirmed-active-class'
    : ''
  const activeActiveClass = showActiveCases ? 'active-active-class' : ''

  const activeRecoveredClass = showRecoveredCases
    ? `recovered-active-class`
    : ''

  const activeDeceasedClass = showDeceasedCases ? `deceased-active-class` : ''

  return (
    <ul className="diff-type-cases">
      <li
        testid="stateSpecificConfirmedCasesContainer"
        onClick={onClickConfirmed}
        className={`country-wide confirmed ${activeConfirmedClass}`}
      >
        <p className="case-card-heading">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dxknzwqf3/image/upload/v1671450927/check-mark_1_3x_abz61k.png"
          alt="state specific confirmed cases pic"
          className="card-image"
        />
        <p className="case-count confirmed">{confirmed}</p>
      </li>
      <li
        testid="stateSpecificActiveCasesContainer"
        onClick={onClickActive}
        className={`country-wide active ${activeActiveClass}`}
      >
        <p className="case-card-heading">Active</p>
        <img
          src="https://res.cloudinary.com/dxknzwqf3/image/upload/v1671450927/protection_1_3x_qwffzu.png"
          alt="state specific active cases pic"
          className="card-image"
        />
        <p className="case-count active">{active}</p>
      </li>
      <li
        testid="stateSpecificRecoveredCasesContainer"
        onClick={onClickRecovered}
        className={`country-wide recovered ${activeRecoveredClass}`}
      >
        <p className="case-card-heading">Recovered</p>
        <img
          src="https://res.cloudinary.com/dxknzwqf3/image/upload/v1671450926/recovered_1_3x_dhhyvh.png"
          alt="state specific recovered cases pic"
          className="card-image"
        />
        <p className="case-count recovered">{recovered}</p>
      </li>

      <li
        testid="stateSpecificDeceasedCasesContainer"
        onClick={onClickDeceased}
        className={`country-wide deceased ${activeDeceasedClass}`}
      >
        <p className="case-card-heading">Deceased</p>
        <img
          src="https://res.cloudinary.com/dxknzwqf3/image/upload/v1671450927/breathing_1_3x_etljxq.png"
          alt="state specific deceased cases pic"
          className="card-image"
        />
        <p className="case-count deceased">{deceased}</p>
      </li>
    </ul>
  )
}
export default CaseCardItem
