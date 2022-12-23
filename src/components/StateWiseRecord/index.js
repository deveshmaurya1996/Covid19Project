import './index.css'
import ThemeContext from '../../context/ThemeContext'

const StateWiseRecord = props => (
  <ThemeContext.Consumer>
    {value => {
      const {stateTotal} = props
      const {
        confirmed,
        deceased,
        name,
        population,
        recovered,
        active,
      } = stateTotal
      const {theme} = value
      const nameLightMode = theme === true ? 'name-light-mode' : ''
      return (
        <li className="state-total-record-card">
          <p className={`case-item state ${nameLightMode}`}>{name}</p>
          <p className="case-item confirmed-case">{confirmed}</p>
          <p className="case-item active-case">{active}</p>
          <p className="case-item recovered-case">{recovered}</p>
          <p className="case-item deceased-case">{deceased}</p>
          <p className="case-item state-population">{population}</p>
        </li>
      )
    }}
  </ThemeContext.Consumer>
)

export default StateWiseRecord
