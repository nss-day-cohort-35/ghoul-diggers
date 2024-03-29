import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import EventsList from './events/EventsList';
import TasksList from './tasks/TasksList';
import ArticlesList from './articles/ArticlesList';
import MessagesList from './messages/MessagesList';
//this file will handle the application views for out nav bar,
//friends list is absent because it will live on the Nav Bar
export default class ApplicationViews extends Component {
	render() {
		return (
			<React.Fragment>
				{/* <Route
					exact
					path='/'
					render={props => {
						console.log("this is the console log we're looking for", this.props)
						return <Login {...props}
						 {...this.props}/>;
					}}
				/> */}
				{/* begin news */}
				<Route
					exact
					path='/news'
					render={props => {
						return (
							<ArticlesList
								{...props}
								// getUser={this.props.getUser}
								activeUser={this.props.activeUser}
							/>
						);
					}}
				/>
				{/* end news */}
				<Route
					exact
					path='/events'
					render={props => {
						return <EventsList {...props} activeUser={this.props.activeUser} />;
					}}
				/>

				<Route
					exact
					path='/messages'
					render={props => {
						return (
							<MessagesList {...props} activeUser={this.props.activeUser} />
						);
					}}
				/>

				<Route
					path='/tasks'
					render={props => {
						return <TasksList {...props} activeUser={this.props.activeUser} />;
					}}
				/>
			</React.Fragment>
		);
	}
}
