import React, { Component } from 'react'
import web3 from '../ethereum/web3';
import salesContract from '../ethereum/SalesContract';
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
      width: window.innerWidth,
      isAdmin: false
    }
  }

  async componentDidMount() {
    this.contractInstance = await salesContract;
    const seller = await this.contractInstance.seller()
    const accounts = await web3.eth.getAccounts()
    console.log("seller>>", seller)
    console.log("user>>", accounts[0].toLowerCase())
    if(accounts[0].toLowerCase() === seller) {
      this.setState({
        isAdmin: true
      })
    }
    console.log(this.state.isAdmin)
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
                <Link onClick={this.toggle} to="/">Products</Link>
              </NavItem>
              <NavItem className="menubar-item focus-in-contract-bck">
                <Link  onClick={this.toggle} to="/orders">Orders</Link>
              </NavItem>
              {
                this.state.isAdmin&&
                <NavItem
                  className="menubar-item focus-in-contract-bck"
                >
                  <Link  onClick={this.toggle} to="/admin">Admin</Link>
                </NavItem>
              }
            </Nav>
          </div>
        }
        <div className="menubar">
            <div className="menubar-link-group">
                <Link className="menubar-link-item" to="/">Products</Link>
                <Link className="menubar-link-item" to="/orders">Orders</Link>
                {
                  this.state.isAdmin&&
                  <Link
                    className="menubar-link-item" to="/admin"
                  >
                    Admin
                  </Link>
                }
            </div>
        </div>
      </nav>
    );
  }
}