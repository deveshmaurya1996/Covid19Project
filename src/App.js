import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import StateSpecificDetails from './components/StateSpecificDetails'

import NotFound from './components/NotFound'
import ThemeContext from './context/ThemeContext'
import './App.css'

class App extends Component {
  state = {
    theme: false,
  }

  changeTheme = () => {
    this.setState(prevState => ({
      theme: !prevState.theme,
    }))
  }

  render() {
    const {theme} = this.state

    return (
      <ThemeContext.Provider
        value={{
          theme,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/state/:stateCode"
            component={StateSpecificDetails}
          />
          <Route exact path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
