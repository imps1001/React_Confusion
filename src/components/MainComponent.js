import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { DISHES } from "../shared/dishes";
import { LEADERS } from "../shared/leaders";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import Menu from "./MenuComponent.js";
import Header from "./HeaderComponent.js";
import Home from "./HomeComponent.js";
import Footer from "./FooterComponent.js";
import Dishdetail from "./DishdetailComponent.js";
import Contact from "./ContactComponent.js";
import About from "./AboutComponent.js";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dishes: DISHES,
			leaders: LEADERS,
			comments: COMMENTS,
			promotions: PROMOTIONS,
		};
	}

	render() {
		const HomePage = () => {
			return (
				<Home
					dish={this.state.dishes.filter((dish) => dish.featured)[0]}
					promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
					leader={this.state.leaders.filter((leader) => leader.featured)[0]}
				/>
			);
		};

		const DishWithId = ({ match }) => {
			return (
				<Dishdetail
					dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
					comments={this.state.comments.filter((comm) => comm.dishId === parseInt(match.params.dishId, 10))}
				/>
			);
		};

		return (
			<div>
				<Header />
				<Switch>
					<Route path="/home" component={HomePage} />
					<Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
					<Route path="/menu/:dishId" component={DishWithId} />
					<Route exact path="/contactus" component={Contact} />
					<Route exact path="/aboutus" component={() => <About leaders={this.state.leaders} />} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default Main;
