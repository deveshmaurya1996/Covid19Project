/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class TimeLineData extends Component {
  state = {
    timeLineData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTimeData()
  }

  getTimeData = async () => {
    const timeLineUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(timeLineUrl, options)
    const fetchedTimeLineData = await response.json()

    this.setState({
      timeLineData: fetchedTimeLineData,
      apiStatus: apiStatusConstants.success,
    })
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const singleTimeLineResultList = []
    const {timeLineData} = this.state
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const keyNames = Object.keys(timeLineData)

    const singleState = keyNames.find(eachKey => eachKey === stateCode)
    singleTimeLineResultList.push(timeLineData[singleState])

    return singleTimeLineResultList
  }

  getAllDates = dates => {
    let sample = {}
    const keyNames = Object.keys(dates)

    keyNames.forEach(eachKey => {
      if (dates[eachKey]) {
        sample = dates[eachKey]
      }
    })
    return sample
  }

  convertLastAllDatesObjectIntoAList = allDates => {
    const lastTenDates = []
    const keyNames = Object.keys(allDates)
    const reversedKeyNames = keyNames.reverse()
    reversedKeyNames.forEach(eachKey => {
      if (eachKey !== undefined) {
        const {delta} = allDates[eachKey]
        const recoveredCases = delta.recovered ? delta.deceased : 0
        const confirmedCases = delta.confirmed ? delta.confirmed : 0
        const deceasedCases = delta.deceased ? delta.deceased : 0
        const activeCases = confirmedCases - (deceasedCases + recoveredCases)
        const tested = delta.tested ? delta.tested : 0
        const vaccinated = delta.vaccinated1 ? delta.vaccinated1 : 0

        const dateObject = {}
        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]

        const month = monthNames[new Date(eachKey).getUTCMonth() + 1]
        const date = new Date(eachKey).getUTCDate()

        dateObject.date = `${date} ${month}`

        dateObject.confirmed = confirmedCases
        dateObject.recovered = recoveredCases
        dateObject.deceased = deceasedCases
        dateObject.active = activeCases
        dateObject.tested = tested
        dateObject.vaccinated = vaccinated
        if (lastTenDates.length < 10) {
          lastTenDates.push(dateObject)
        }
      }
    })
    return lastTenDates.reverse()
  }

  renderBarChart = lastTenDaysCases => {
    const {activeCaseClass} = this.props

    return (
      <div className="graph-container">
        {activeCaseClass === 'confirmed' && (
          <div className="bar-chart-wrapper">
            <BarChart
              width={550}
              height={300}
              stroke="#9A0E31"
              data={lastTenDaysCases}
              className="bar-confirmed-chart"
            >
              <XAxis
                dataKey="date"
                stroke="#9A0E31"
                axisLine={{stroke: 'transparent'}}
              />

              <Tooltip />
              <Bar
                dataKey="confirmed"
                name="Confirmed"
                fill="#9A0E31"
                className="bar"
                label={{position: 'top', color: 'white'}}
              />
            </BarChart>
          </div>
        )}

        {activeCaseClass === 'active' && (
          <div className="bar-chart-wrapper">
            <BarChart
              width={550}
              height={300}
              stroke="#0A4FA0"
              data={lastTenDaysCases}
              className="bar-active-chart"
            >
              <XAxis
                dataKey="date"
                stroke="#0A4FA0"
                axisLine={{stroke: 'transparent'}}
              />

              <Tooltip />
              <Bar
                dataKey="active"
                name="Active"
                fill="#0A4FA0"
                className="bar-active-chart"
                label={{position: 'top', color: 'white'}}
              />
            </BarChart>
          </div>
        )}
        {activeCaseClass === 'recovered' && (
          <div className="bar-chart-wrapper">
            <BarChart
              width={550}
              height={300}
              stroke="#216837"
              data={lastTenDaysCases}
              className="bar-recovered-chart"
            >
              <XAxis
                dataKey="date"
                stroke="#216837"
                axisLine={{stroke: 'transparent'}}
              />
              <Tooltip />
              <Bar
                name="Recovered"
                dataKey="recovered"
                fill="#216837"
                className="bar"
                label={{position: 'top', color: 'white'}}
              />
            </BarChart>
          </div>
        )}

        {activeCaseClass === 'deceased' && (
          <div className="bar-chart-wrapper">
            <BarChart
              width={550}
              height={300}
              stroke="#474C57"
              data={lastTenDaysCases}
              className="bar-deceased-chart"
            >
              <XAxis
                dataKey="date"
                stroke="#474C57"
                axisLine={{stroke: 'transparent'}}
              />

              <Tooltip />
              <Bar
                dataKey="deceased"
                fill="#474C57"
                className="bar"
                name="Deceased"
                label={{position: 'top', color: 'white'}}
              />
            </BarChart>
          </div>
        )}
      </div>
    )
  }

  renderLineChart = lastTenDaysCases => (
    <div className="graph-container" testid="lineChartsContainer">
      <div className="line-chart-wrapper">
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          className="cummulative-confirmed-chart"
          Legend="confirmed"
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            label={{fill: 'red', fontSize: 10}}
            stroke="#FF073A"
            axisLine={{stroke: '#FF073A'}}
          />
          <YAxis axisLine={{stroke: '#FF073A'}} stroke="#FF073A" />
          <Tooltip />
          <Legend align="right" verticalAlign="top" />
          <Line
            type="monotone"
            name="Confirmed"
            dataKey="confirmed"
            stroke="#FF073A"
          />
        </LineChart>
      </div>
      <div className="line-chart-wrapper">
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="cummulative-active-chart"
        >
          <XAxis
            dataKey="date"
            stroke="#007BFF"
            axisLine={{stroke: '#007BFF'}}
          />
          <YAxis axisLine={{stroke: '#007BFF'}} stroke="#007BFF" />
          <Tooltip />
          <Legend align="right" verticalAlign="top" />
          <Line
            type="monotone"
            name="Active"
            dataKey="active"
            stroke="#007BFF"
          />
        </LineChart>
      </div>
      <div className="line-chart-wrapper">
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="cummulative-recovered-chart"
        >
          <XAxis
            dataKey="date"
            stroke="#27A243"
            axisLine={{stroke: '#27A243'}}
          />
          <YAxis axisLine={{stroke: '#27A243'}} stroke="#27A243" />
          <Tooltip />
          <Legend align="right" verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="recovered"
            stroke="#27A243"
            name="Recovered"
          />
        </LineChart>
      </div>

      <div className="line-chart-wrapper">
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="cummulative-deceased-chart"
        >
          <XAxis
            dataKey="date"
            stroke="#6C757D"
            axisLine={{stroke: '#6C757D'}}
          />
          <YAxis axisLine={{stroke: '#6C757D'}} stroke="#6C757D" />
          <Tooltip />
          <Legend align="right" verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="deceased"
            stroke="#6C757D"
            name="Deceased"
          />
        </LineChart>
      </div>
      <div className="line-chart-wrapper">
        <LineChart
          width={730}
          height={250}
          data={lastTenDaysCases}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          className="cummulative-tested-chart"
        >
          <XAxis
            dataKey="date"
            stroke="#9673B9"
            axisLine={{stroke: '#9673B9'}}
          />
          <YAxis axisLine={{stroke: '#9673B9'}} stroke="#9673B9" />
          <Tooltip />
          <Legend align="right" verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="tested"
            stroke="#9673B9"
            name="Tested"
          />
        </LineChart>
      </div>
    </div>
  )

  renderTimeLineData = () => {
    const singleTimeLineDataList = this.convertObjectsDataIntoListItemsUsingForInMethod()

    const [dates] = singleTimeLineDataList

    const allDates = this.getAllDates(dates)

    const lastTenDaysCases = this.convertLastAllDatesObjectIntoAList(allDates)
    return (
      <div>
        {this.renderBarChart(lastTenDaysCases)}
        <h1 className="trends-heading">Daily Spread Trends</h1>
        {this.renderLineChart(lastTenDaysCases)}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="covid-loader-container" testid="timelinesDataLoader">
      <Loader type="Oval" color="#007BFF" height="80" width="80" />
    </div>
  )

  render() {
    const renderTimeLines = () => {
      const {apiStatus} = this.state

      switch (apiStatus) {
        case apiStatusConstants.success:
          return this.renderTimeLineData()
        case apiStatusConstants.inProgress:
          return this.renderLoadingView()
        default:
          return null
      }
    }

    return <div>{renderTimeLines()}</div>
  }
}

export default withRouter(TimeLineData)
