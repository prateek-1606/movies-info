import React, { Component } from 'react';
import { Card,CardImg,CardImgOverlay,CardBody,CardText,CardTitle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Dishdetail extends Component {
 constructor (props) {
    super(props)
    this.state = {

    }
  }
  renderComments=(comments) => {
     if(comments!=null) {

       const com = comments.map(co=>{

        return (

          <React.Fragment>
          <li> {co.comment} </li><br/>
          <li> -- {co.author}, {this.formatDate(co.date)}</li><br/>
          </React.Fragment>
        );
       });

       return (

        <ul className="list-unstyled">
            {com}
        </ul>
        );
     }
     
     else {
      return (
        <div></div>

      );
     }
  }
  formatDate(date) {
    const option = {year:'numeric' , month:'short' , day:'numeric'};
    const date1 = new Date(date)
    const newdate = date1.toLocaleDateString("en-US",option)
    return newdate;
  }
  render() {
    if(this.props.selectedDish!=null) {
    return(
        <React.Fragment>
        <div className="col-12 col-md-5 m-1">
        <Card>
             <CardImg top src={this.props.selectedDish.image} alt={this.props.selectedDish.name} />
             <CardBody>
                 <CardTitle>{this.props.selectedDish.name}</CardTitle>
                 <CardText>{this.props.selectedDish.description}</CardText>
             </CardBody> 
        </Card>
        </div>
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>   
            {this.renderComments(this.props.selectedDish.comments)}
        </div>
        </React.Fragment>
    );}
    else {
    return (

      <div></div>
    ); }
  }
}

export default Dishdetail;