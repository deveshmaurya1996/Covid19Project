/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import StateWiseRecord from '../StateWiseRecord'
import TotalCaseCards from '../TotalCaseCards'
import SearchItem from '../SearchItem'
import Footer from '../Footer'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

let tableData = []

class Home extends Component {
  state = {
    stateWiseData: {},
    showStateStats: true,
    showSearchSuggestions: false,
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    sortedTableStatesList: tableData,
    showAscSort: false,
    showDescSort: false,
    showInitialTable: true,
  }

  componentDidMount() {
    this.getAllStatesData()
  }

  getAllStatesData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()

    this.setState({
      stateWiseData: fetchedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  onchangeSearchInput = event => {
    if (event.target.value === '') {
      this.setState({
        showSearchSuggestions: false,
        searchInput: event.target.value,
        showStateStats: true,
      })
    } else {
      this.setState({
        showSearchSuggestions: true,
        searchInput: event.target.value,
        showStateStats: false,
      })
    }
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const resultList = []
    const {stateWiseData} = this.state
    const keyNames = Object.keys(stateWiseData)
    keyNames.forEach(keyName => {
      if (stateWiseData[keyName]) {
        const {total} = stateWiseData[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = stateWiseData[keyName].meta.population
          ? stateWiseData[keyName].meta.population
          : 0
        let stateName
        const name = statesList.find(state => state.state_code === keyName)
        if (name !== undefined) {
          stateName = name.state_name
        }

        resultList.push({
          stateCode: keyName,
          name: stateName,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList.sort((a, b) => {
      const x = a.name
      const y = b.name
      return x > y ? 1 : -1
    })
  }

  sortByCaseKeyDesc = (array, key) =>
    array.sort((a, b) => {
      const x = a[key]
      const y = b[key]
      return x > y ? -1 : 1
    })

  sortByCaseKeyAsc = (array, key) =>
    array.sort((a, b) => {
      const x = a[key]
      const y = b[key]
      return x > y ? 1 : -1
    })

  sortAscending = () => {
    const sortedStateArray = this.sortByCaseKeyAsc(tableData, 'name')
    this.setState({
      sortedTableStatesList: sortedStateArray,
      showDescSort: false,
      showAscSort: true,
      showInitialTable: false,
    })
  }

  sortDescending = () => {
    const sortedStateArrayrev = this.sortByCaseKeyDesc(tableData, 'name')
    this.setState({
      sortedTableStatesList: sortedStateArrayrev,
      showAscSort: false,
      showDescSort: true,
      showInitialTable: false,
    })
  }

  renderCovidCasesData = () => (
    <ThemeContext.Consumer>
      {value => {
        const {
          stateWiseData,
          timeLineData,
          searchInput,
          showSearchSuggestions,
          showStateStats,
          sortedTableStatesList,
          showAscSort,
          showDescSort,
          showInitialTable,
        } = this.state

        tableData = this.convertObjectsDataIntoListItemsUsingForInMethod()

        let filteredStatesList = []
        filteredStatesList = statesList.filter(eachState =>
          eachState.state_name
            .toLowerCase()
            .includes(searchInput.toLowerCase()),
        )

        const getUpdatedFilteredStates = state => ({
          stateCode: state.state_code,
          stateName: state.state_name,
        })

        const updatedFilteredStates = filteredStatesList.map(eachState =>
          getUpdatedFilteredStates(eachState),
        )

        const getUpdated = (a, b) => ({
          confirmed: a.confirmed + b.confirmed,
          deceased: a.deceased + b.deceased,
          recovered: a.recovered + b.recovered,
          active: a.active + b.active,
        })

        const sum = tableData.reduce(getUpdated)
        const {theme} = value
        const backgroundClass = theme === true ? 'light-Theme-Class' : ''
        const stateWiseTotalTableClass =
          theme === true ? 'state-wise-light-class' : ''

        const titlesClass = theme === true ? 'title-light-mode' : ''
        return (
          <div className={`home-route-container ${backgroundClass}`}>
            <div className="search-container">
              <BsSearch className="search-icon" />
              <input
                type="search"
                className="search-input"
                placeholder="Enter the State"
                onChange={this.onchangeSearchInput}
                onBlur={this.onChangeFocus}
                value={searchInput}
              />
            </div>
            {showSearchSuggestions && (
              <ul
                testid="searchResultsUnorderedList"
                className="search-recommendation-list"
              >
                {updatedFilteredStates.map(eachState => (
                  <SearchItem
                    key={eachState.stateCode}
                    state={eachState}
                    allStates={stateWiseData}
                    timeLineData={timeLineData}
                    gotoStateSpecificRoute={this.gotoStateSpecificRoute}
                  />
                ))}
              </ul>
            )}

            <div className="states-records-container">
              {showStateStats && (
                <div className="stats-section">
                  <div className="diff-type-total-case-cards">
                    <TotalCaseCards stateTotal={sum} />
                  </div>

                  <div
                    className="state-wise-records"
                    testid="stateWiseCovidDataTable"
                  >
                    <div
                      className={`state-wise-total-table-record ${stateWiseTotalTableClass}`}
                    >
                      <div className="total-record">
                        <div className="table-head">
                          <div className="sorting-item">
                            <p className={`table-heading ${titlesClass}`}>
                              States/UT
                            </p>
                            <button
                              type="button"
                              className="sorting-button"
                              testid="ascendingSort"
                              onClick={this.sortAscending}
                            >
                              <FcGenericSortingAsc className="sorting-icon" />
                            </button>
                            <button
                              type="button"
                              className="sorting-button"
                              testid="descendingSort"
                              onClick={this.sortDescending}
                            >
                              <FcGenericSortingDesc className="sorting-icon" />
                            </button>
                          </div>
                          <p className={`table-heading ${titlesClass}`}>
                            Confirmed
                          </p>
                          <p className={`table-heading ${titlesClass}`}>
                            Active
                          </p>
                          <p className={`table-heading ${titlesClass}`}>
                            Recovered
                          </p>
                          <p className={`table-heading ${titlesClass}`}>
                            Deceased
                          </p>
                          <p className={`table-heading ${titlesClass}`}>
                            Population
                          </p>
                        </div>

                        <ul className="table-results">
                          {showInitialTable &&
                            tableData.map(
                              eachTotal =>
                                eachTotal.name !== undefined && (
                                  <StateWiseRecord
                                    key={eachTotal.stateCode}
                                    stateTotal={eachTotal}
                                  />
                                ),
                            )}
                          {showAscSort &&
                            sortedTableStatesList.map(
                              eachTotal =>
                                eachTotal.name !== undefined && (
                                  <StateWiseRecord
                                    key={eachTotal.stateCode}
                                    stateTotal={eachTotal}
                                  />
                                ),
                            )}
                          {showDescSort &&
                            sortedTableStatesList.map(
                              eachTotal =>
                                eachTotal.name !== undefined && (
                                  <StateWiseRecord
                                    key={eachTotal.confirmed}
                                    stateTotal={eachTotal}
                                  />
                                ),
                            )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Footer />
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderLoadingView = () => (
    <div testid="homeRouteLoader" className="covid-loader-container">
      <Loader type="Oval" color="#007BFF" height="80" width="80" />
    </div>
  )

  renderCovidData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCovidCasesData()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderCovidData()}
      </div>
    )
  }
}

export default Home
