import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Nav,
  NavItem,
} from 'reactstrap'

export default class Menubar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      width: window.innerWidth
    }
  }

  toggle=()=>{
    this.setState({
      isOpen: !this.state.isOpen
    },()=>{
      window.scrollTo(0,0)
    });
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    return (
      <nav>
        <div
          className={`menubar-btn ${this.state.isOpen?"rotate-in-diag-2":"rotate-in-hor"}`}
          onClick={this.toggle}
        >
          <div className={this.state.isOpen?"":"hamburger"}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={this.state.isOpen?"cross":""}>
            <span></span>
            <span></span>
          </div>
        </div>
        {
          (this.state.width < 660)&&this.state.isOpen&&
          <div className="menubar-modal">
            <Nav className="m-auto" navbar>
              <NavItem className="menubar-item focus-in-contract-bck">
                <a href="">Link</a>
              </NavItem>
              <NavItem className="menubar-item focus-in-contract-bck">
                <Link onClick={this.toggle} to="/">Products</Link>
              </NavItem>
              <NavItem className="menubar-item focus-in-contract-bck">
                <Link  onClick={this.toggle} to="/orders">Orders</Link>
              </NavItem>
              <NavItem className="menubar-item focus-in-contract-bck">
                <Link  onClick={this.toggle} to="/admin">Admin</Link>
              </NavItem>
            </Nav>
          </div>
        }
        <div className="menubar">
            <div className="menubar-link-group">
                <Link className="menubar-link-item" to="/">Products</Link>
                <Link className="menubar-link-item" to="/orders">Orders</Link>
                <Link className="menubar-link-item" to="/admin">Admin</Link>
            </div>
        </div>
      </nav>
    );
  }
}