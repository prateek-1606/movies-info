import React, { Component } from 'react';
import {Navbar,NavbarBrand } from 'reactstrap';
import Menu from './MenuComponents';
import { DISHES } from '../shared/dishes';
import Dishdetail from './dishdetailcomponent';
import Header from './HeaderComponents';
import Footer from './FooterComponents';

class Main extends Component {

  constructor (props) {
     super(props);

     this.state = {
      dishes:DISHES,
      selectedDish:null
     };
  }

   onDishSelect(dishId) {
      this.setState({selectedDish:dishId});
    }

  render() {
    return (
      <div>
          <Header/>
          <div className="container">
          <div className="row">
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>  
        <Dishdetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
        
        </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Main;
