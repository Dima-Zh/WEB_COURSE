import React, { Component } from "react";
import {CardImg, CardBody, CardTitle, CardText, Card, Breadcrumb, BreadcrumbItem,
         Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Row, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

      constructor (props){
        super(props);
        this.state = {
            isModalOpen: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
      }

      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

      handleSubmit(values) {
        console.log("Current State is:" + JSON.stringify(values));
        alert("Current State is:" + JSON.stringify(values));
      }

      render (){
        return(
          <div className="container">
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                  <ModalHeader  toggle={this.toggleModal}>Submit Comment</ModalHeader>
                  <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                      <Col>
                        <Label htmlFor="raiting">Raiting</Label>
                        <Control.select model=".raiting" name="raiting"
                          className="form-control">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Control.select>
                      </Col>
                    </Row>
                    <Row className="form-group">
                    <Col>
                      <Label htmlFor="name">Your Name</Label>
                        <Control.text model=".name" id="name" name="name"
                            placeholder="Your Name"
                            className="form-control"
                            validators={{
                              required, minLength: minLength(3), maxLength: maxLength(15)
                            }}
                          />
                        <Errors
                            className="text-danger"
                            model=".name"
                            show="touched"
                            messages={{
                              required: 'Required',
                              minLength: 'Must be greater than 2 characters',
                              maxLength: 'Must be 15 characters or less'
                            }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                    <Col>
                      <Label htmlFor="message" md={2}>Comment</Label>
                        <Control.textarea model=".message" id="message" name="message"
                          rows="6"
                          className="form-control"/>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={{size:10, offset: 2}}>
                        <Button type="submit" color="primary">
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </LocalForm>
                  </ModalBody>
                </Modal>
          </div>
        );
      }
}

  function RenderDish({dish}){
        if (dish != null){
              return (
                  <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>);
        }
        else {
            return(
                <div></div>
            );
        }
    }

    function RenderComments({comments}){
        console.log(comments);
        if(comments !=null){
            const commentsHTML = comments.map((comment)=>{
                return (
                    <li>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                )
            });
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {commentsHTML}
                        <CommentForm />
                    </ul>
                </div>);
        }
        else {
            return(<div></div>);
        }
    }

    const DishDetail = (props) => {
        if(props.dish != null){
            return (
                <div class="container">
                    <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <div className="col-sm-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-sm-5 m-1">
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>
                </div>
            );
        }else{
            return <div></div>
        }
    }

export default DishDetail;
