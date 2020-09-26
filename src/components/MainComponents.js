import React, { Component } from 'react';
import {Navbar,NavbarBrand } from 'reactstrap';
import Menu from './MenuComponents';
import { DISHES } from '../shared/dishes';
import Dishdetail from './dishdetailcomponent';
import Home from './HomeComponents';
import {Switch,Route,Redirect} from 'react-router-dom';
import Header from './HeaderComponents';
import Footer from './FooterComponents';

class Main extends Component {

  constructor (props) {
     super(props);

     this.state = {
      dishes:DISHES
     };
  }

  render() {

     const HomePage = () => {
       return (
         <Home/>
       );
      }
      
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path="/menu" component={()=><Menu dishes={this.state.dishes}/>}/>
          <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default Main;
