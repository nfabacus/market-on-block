import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Page2 from './pages/Page2'

class Main extends Component {
  render(){
    return (
      <div className="main">
        <Switch>
          <Route exact path="/page2" component={ Page2 } />
          <Route exact path="/" component={ Home } />
          <Redirect to="/" component={ Home } />
        </Switch>
      </div>
    )
  }
}

export default Main