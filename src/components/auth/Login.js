import React, { Component } from 'react';
import AuthManager from '../../modules/AuthManager';
import Registration from '../auth/Registration';
import { Form, Icon, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';

class Login extends Component {
	// Set initial state
	state = {
		userName: '',
		password: '',
		hideReg: true
	};

	showLogin = () => {
		this.setState({ hideReg: false });
	};

	hideReg = () => {
		this.setState({ hideReg: true });
	};

	// Update state whenever an input field is edited
	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	handleLogin = e => {
		e.preventDefault();
		let userName = this.state.userName;
		let password = this.state.password;
		AuthManager.getUser(userName).then(response => {
			if (response.length === 0) {
				alert('Please enter a valid User Name.');
			} else if (response.length === 1 && response[0].password !== password) {
				alert('Password is incorrect, please try again.');
				// starting the if statement to check for empty fields//
			} else if (password === '') {
				alert('Please fill the Password Form');
			} else if (userName === '') {
				alert('Please enter a valid email address');
			} else if (response[0].password === password) {
				//response[0].id is the ID of the user you logged in with,
				//in case of "Steve" it would be "1"
				this.props.setUser(response[0].id);
				this.props.history.push(`/news`);
			}
		});
	};

	render() {
		return (
			<>
				{this.state.hideReg && (
					<>
						<Spring
							from={{ opacity: 0 }}
							to={{ opacity: 1 }}
							//config={{ duration: 500 }}
						>
							{props => (
								<div style={props}>
									<h1>GHOST---pac</h1>
									<div className='landingLogoPlaceholder'>
										<img
											src='/images/insertCoin.gif'
											alt='Smiley face'
											height='auto'
											width='350px'
											z-index='-2'
										/>
									</div>
									<p className='insertCoin'>Insert coin to continue.</p>
									<Form
										onSubmit={this.handleLogin}
										id='loginForm'
										className='login-form'
									>
										<div className='formField'>
											<Input
												prefix={
													<Icon
														type='user'
														style={{ color: 'rgba(0,0,0,.25)' }}
													/>
												}
												placeholder='Username'
												onChange={this.handleFieldChange}
												type='userName'
												id='userName'
												required=''
												autoFocus=''
											/>
										</div>
										<div className='formField'>
											<Input
												prefix={
													<Icon
														type='lock'
														style={{ color: 'rgba(0,0,0,.25)' }}
													/>
												}
												type='password'
												placeholder='Password'
												onChange={this.handleFieldChange}
												id='password'
												required=''
											/>
										</div>
										<div className='formField'>
											{/* <Checkbox>Remember me</Checkbox> */}
											<Button
												type='primary'
												htmlType='submit'
												className='login-form-button'
											>
												Log in
											</Button>
											<p className='regLink' onClick={this.showLogin} href=''>
												Or register now!
											</p>
										</div>
									</Form>
								</div>
							)}
						</Spring>
					</>
				)}

				{!this.state.hideReg && (
					<Spring
						from={{ opacity: 0 }}
						to={{ opacity: 1 }}
						//config={{ duration: 500 }}
					>
						{props => (
							<div style={props}>
								<Registration {...this.props} hideReg={this.hideReg} />
							</div>
						)}
					</Spring>
				)}
			</>
		);
	}
}

export default withRouter(Login);
