import React, { Component } from 'react'

class Orders extends Component {

  componentDidMount(){
    window.scrollTo(0,0)
  }

  render() {
    return (
      <section>
        <section className="container-fluid block-row bg-order">
          <div className="container">
            <div className="title-area">
              <h1 className="display-4">Orders</h1>
            </div>
          </div>
        </section>
        <section className="container-fluid block-row">
          <div className="container">
            List
          </div>
        </section>
      </section>
    )
  }
}

export default Orders