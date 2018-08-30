import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Admin from './pages/Admin'

class Main extends Component {
  render(){
    return (
      <main className="main">
        <Switch>
          <Route exact path="/orders" component={ Orders } />
          <Route exact path="/admin" component={ Admin } />
          <Route exact path="/" component={ Products } />
          <Redirect to="/" component={ Products } />
        </Switch>
      </main>
    )
  }
}

export default Main