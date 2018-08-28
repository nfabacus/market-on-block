import React, { Component } from 'react'

class Page2 extends Component {

  componentDidMount(){
    window.scrollTo(0,0)
  }

  render() {
    return (
      <div>
        <div className="container-fluid block-row bg-order">
          <div className="container">
            <div className="title-area">
              <h1 className="display-4">Page 2</h1>
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

export default Page2