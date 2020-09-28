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
import About from './AboutComponent';


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
      };

      const DishWithId = ({match}) => {

      return (
    
      <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
      comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
      };      
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}/>}/>
          <Route exact path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route exact path="/aboutus" component={() => <About leaders={this.state.leaders}/>} />
          <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default Main;
