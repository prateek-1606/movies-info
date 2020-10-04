import React, { Component } from 'react';
import {Navbar,NavbarBrand } from 'reactstrap';
import Menu from './MenuComponents';
import Dishdetail from './dishdetailcomponent';
import Contact from './ContactComponent';
import Home from './HomeComponents';
import {Switch,Route,Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './HeaderComponents';
import Footer from './FooterComponents';
import About from './AboutComponent';
import { addComment,fetchDishes } from '../Redux/ActionCreators';

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment)),
  fetchDishes: () => { dispatch(fetchDishes())}
});


const mapStateToProps = state => {
  return {
     dishes:state.dishes,
     comments:state.comments,
     promotions:state.promotions,
     leaders:state.leaders
  }
}

class Main extends Component {

  constructor (props) {
     super(props);

  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {

     const HomePage = () => {
       return (
         <Home 
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
       );
      };

      const DishWithId = ({match}) => {

      return (
    
      <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
      isLoading={this.props.dishes.isLoading}
      errMess={this.props.dishes.errMess}
      comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
      addComment={this.props.addComment} />
      );
      };      
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
          <Route exact path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>} />
          <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
