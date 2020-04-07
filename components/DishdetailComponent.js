import React, {Component} from "react";
import {CardImg,CardBody,CardTitle,CardText,Card} from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
    }

    renderDish(dish){
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

    renderComments(dish){
        if(dish != null && dish.comments !=null){
            const comments = this.props.dish.comments.map((comment)=>{
                return (
                    <li>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} , {comment.date}</p>
                    </li>
                )
            });
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments}
                    </ul>
                </div>);
        }
        else {
            return(<div></div>);
        }
    }

    render(){
        return (
            <div className="row">
                <div className="col-sm-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-sm-5 m-1">
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
        );
    }
}
export default DishDetail;
