import React, { Component } from 'react';
import { Button } from 'antd';
import ArticleManager from '../../modules/ArticleManager';
import EditArticleForm from './EditArticleForm';
import { Spring } from 'react-spring/renderprops';
class ArticleCard extends Component {
	state = {
		myCard: ''
	};

	handleDelete = id => {
		ArticleManager.delete(id).then(() => {
			this.props.getData();
		});
	};

	componentDidMount() {
		if (
			parseInt(sessionStorage.getItem('activeUser')) ===
			this.props.article.userId
		) {
			this.setState({
				myCard: true
			});
		} else {
			this.setState(
				{
					myCard: false
				},
				() => console.log('my card state', this.state)
			);
		}
	}

	render() {
		return (
			<Spring
				from={{ opacity: 0 }}
				to={{ opacity: 1 }}
				//config={{ duration: 600, easing: easings.easeCubic }}
			>
				{props => (
					<div style={props}>
						<>
							{this.state.myCard ? (
								<>
									<div className='myCard'>
										<h3>
											<span>{this.props.article.title}</span>
										</h3>
										<p>Summary: {this.props.article.summary}</p>
										<p>
											<a
												href={this.props.article.url}
												rel='noopener noreferrer'
												target='_blank'
											>
												{this.props.article.url}
											</a>
										</p>
										<p>date: {this.props.article.date}</p>
										<div className='cardButtonRow'>
											<EditArticleForm
												{...this.props.article}
												getData={this.props.getData}
											/>
											<Button
												className='addItemBtn'
												type='primary'
												shape='round'
												icon='delete'
												size='small'
												onClick={() => this.handleDelete(this.props.article.id)}
											>
												Delete
											</Button>
										</div>
									</div>
								</>
							) : (
								<div className='friendCard'>
									<h3>
										<span>{this.props.article.title}</span>
									</h3>
									<p>{this.props.article.user.name}</p>
									<p>Summary: {this.props.article.summary}</p>
									<p>
										<a
											href={this.props.article.url}
											rel='noopener noreferrer'
											target='_blank'
										>
											{this.props.article.url}
										</a>
									</p>
									<p>date: {this.props.article.date}</p>
									<img
										className='cardImg'
										src={`/images/ghost${this.props.article.userId}.png`}
										alt='Smiley face'
										height='42'
										width='42'
									/>
								</div>
							)}
						</>
					</div>
				)}
			</Spring>
		);
	}
}

export default ArticleCard;
