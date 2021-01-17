import React, {Component} from "react";
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, Button, BreadcrumbItem, Label, Row, Col, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import "../index.css";


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}) {
    return (
      <div className="col-12 col-md m-1">
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

function RenderComments({comments, addComment, dishId}) {
    if (comments != null) {
      return(
        <div className="col-12 col-md m-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {comments.map((comment) => {
              return (
                <li key={comment.id}>
                  <p>{comment.comment} </p>
                  <p>-- {comment.author} , {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(comment.date))} </p>
                </li>
              );
              })}
          </ul>
         <CommentForm dishId={dishId} addComment={addComment} />
        </div>
      );
    }
    else{
      return(
        <div></div>
      );
    }
  }

class CommentForm extends Component{
  constructor(props){
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
  }
  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
}
  render() {
    return(
      <React.Fragment>
      <div>
      <Button outine onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment </Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                      <Label htmlFor="rating" md={2}>Rating</Label>
                        <Col md={10}>
                        <Control.select model=".rating" name="rating" className="form-control">
                         <option>1</option>
                         <option>2</option>
                         <option>3</option>
                         <option>4</option>
                         <option>5</option>
                         </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                    <Label htmlFor="author" md={2}>Your Name</Label>
                      <Col md={10}>
                      <Control.text model=".author" id="author" name="author"
                        placeholder="Your Name"
                        className="form-control"
                      validators={{
                            required, minLength: minLength(3), maxLength: maxLength(15)
                            }}
                        />
                        <Errors
                         className="text-danger"
                          model=".author"
                          show="touched"
                          messages={{
                        required: 'Required! ',
                        minLength: ' "Must be greater than 2 characters"',
                        maxLength: 'Must be 15 characters or less'
                        }}
                      />
                      </Col>
                      </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Your Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="16"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit Comment
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
              </div>
            </React.Fragment>
    );
  }
}

const  DishDetail = (props) => {
    if (props.dish != null) {
      return(
        <div class="container">
        <div className="row">
          <Breadcrumb>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
          </div>                
        </div>
          <div className="row">
          <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} 
          addComment={props.addComment}
          dishId={props.dish.id}/>
          </div>
          </div>
        </div>
      );
    }
    else {
      return(
        <div></div>
      );

    }
  }


export default DishDetail;