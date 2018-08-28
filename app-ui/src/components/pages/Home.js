import React, { Component } from 'react'

class Home extends Component {

  componentDidMount(){
    window.scrollTo(0,0)
  }

  render() {
    return (
      <div>
        <div className="container-fluid block-row bg-contact">
          <div className="container">
            <div className="title-area">
              <h1 className="display-4">Market</h1>
            </div>
          </div>
        </div>
        <div className="container-fluid block-row">
          <div className="container">
            List
          </div>
        </div>
      </div>
    )
  }
}

export default Home