import React, { Component } from 'react';
import {Navbar,NavbarBrand } from 'reactstrap';
import Menu from './MenuComponents';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { COMMENTS } from '../shared/comments';
import Dishdetail from './dishdetailcomponent';
import Contact from './ContactComponent';
import Home from './HomeComponents';
import {Switch,Route,Redirect} from 'react-router-dom';
import Header from './HeaderComponents';
import Footer from './FooterComponents';


class Main extends Component {

  constructor (props) {
     super(props);

     this.state = {
      dishes:DISHES,
      comments:COMMENTS,
      promotions:PROMOTIONS,
      leaders:LEADERS
     };
  }

  render() {

     const HomePage = () => {
       return (
         <Home 
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
       );
      }
      
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path="/menu" component={()=><Menu dishes={this.state.dishes}/>}/>
          <Route path="/contactus" component={Contact} />
          <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default Main;
