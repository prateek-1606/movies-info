import React,{Component} from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button
} from "reactstrap";
import {Form,FormGroup,Label,Input,Modal,ModalHeader,ModalBody,Row,Col} from 'reactstrap';
import { Link } from "react-router-dom";
import {Control,LocalForm,Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, postComment , dishId}) {
  if (comments != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map(comment => (
          <ul key={comment.id} className="list-unstyled">
            <li className="mb-2">{comment.comment}</li>
            <li>
              -- {comment.author}{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit"
              }).format(new Date(Date.parse(comment.date)))}
            </li>
          </ul>
        ))}
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  }
  else return <div />;
}

const DishDetailComponent = (props) => {

  if(props.isLoading) {
    return(
        <div className="container">
           <div className="row">
               <Loading/>
           </div>
        </div>
    );
  }
  else if(props.errMess) {
    return(
        <div className="container">
           <div className="row">
               <h4>{props.errMess}</h4>
           </div>
        </div>
    );
  }
  else if(props.dish != null)
  return(
  <div className="container">
    <div className="row">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/menu">Menu</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
      </Breadcrumb>
      <div className="col-12">
        <h3>{props.dish.name}</h3>
        <hr />
      </div>
    </div>
    <div className="row">
      <RenderDish dish={props.dish} />
      <RenderComments comments={props.comments} 
       postComment={props.postComment} 
       dishId={props.dish.id} />
    </div>
  </div>
  );
}

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen:false
    }
    this.toggleModal = this.toggleModal.bind(this);    
    this.handleLogin = this.handleLogin.bind(this); 
  }

   handleLogin(values){
     this.toggleModal();
     this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  toggleModal() {
     this.setState({isModalOpen:!this.state.isModalOpen}); 
  }

  render() {
    return(
       <div>
       <Button outline onClick={this.toggleModal}>
           <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
           <ModalHeader toggle={this.toggleModal} > Submit Comment</ModalHeader>
           <ModalBody>
                 <LocalForm onSubmit={(values) => this.handleLogin(values)}>
                      <Row className="form-group">
                         <Col md={10}>
                          <p>Rating</p>
                          <Control.select model=".rating" name="rating" 
                            className="form-control" >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Control.select>
                         </Col>
                      </Row>
                      <Row className="form-group">
                         <Col md={10}>
                           <Label htmlFor="author" >Your Name</Label>
                           <Control.text model=".author" id="author" name="author" 
                              placeholder="Your Name"
                              className="form-control" 
                              validators={{
                                minLength: minLength(3), maxLength: maxLength(15)
                              }} />
                              <Errors className="text-danger" model=".name" show="touched"
                               messages={{
                                 maxLength: ' Must be 15 Characters or less ',
                                 minLength: ' Must be greater than 2 Characters '
                               }} />
                         </Col>
                      </Row>
                      <Row className="form-group">
                          <Col md={10}>
                           <Label htmlFor="comment" md={2}>Comment</Label>
                             <Control.textarea model=".comment" id="comment" name="comment" 
                              rows="6"
                              className="form-control" />
                          </Col>
                      </Row>
                      <Button type="submit" value="submit" color="primary">Submit</Button>
                 </LocalForm>
           </ModalBody>
       </Modal>
       </div>  
    );
  }
}

export default DishDetailComponent;