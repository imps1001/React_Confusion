import React, { Component } from "react";
import { Card, CardImg, CardBody, CardText } from "reactstrap";
import "../index.css";

class Dishdetail extends Component {
  renderComments(comments) {
    if (comments == null) {
      return <div></div>;
    }
    const cmnts = comments.map((comment) => {
      return (
        <li key={comment.id}>
          <p className="text-align-left">{comment.comment}</p>
          <p className="text-align-left">
            -- {comment.author}, &nbsp;
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(comment.date))}
          </p>
        </li>
      );
    });
    return (
      <div className="col-12 col-md-5 m-1">
        <h4 className="text-align-left"> Comments </h4>
        <ul className="list-unstyled">{cmnts}</ul>
      </div>
    );
  }
  renderDish(dish) {
    if (dish != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody body className="text-left">
              <h4>{dish.name}</h4>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const dish = this.props.dish;
    if (dish == null) {
      return <div></div>;
    }
    const dishItem = this.renderDish(dish);
    const commentItem = this.renderComments(dish.comments);
    return (
      <div className="container">
        <div className="row">
        {dishItem}
        {commentItem}
        </div>
      </div>
    );
  }
}

export default Dishdetail;