import React, {Component} from 'react';
import './header.scss';

class Header extends Component<any>{
	constructor(props) {
		super(props);
		this.nextStep = this.nextStep.bind(this);
		this.prevStep = this.prevStep.bind(this);
	}

	nextStep() {
		this.props.handleRecipeChange(1);
	}
	prevStep() {
		this.props.handleRecipeChange(-1);
	}

	render() {
		return (
			<header>
				<nav className="nav-top">
					<span className="nav-prev" onClick={this.prevStep}>Предыдущий</span>
					<span className="logo">dessert</span>
					<span className="nav-next" onClick={this.nextStep}>Следующий</span>
				</nav>
			</header>
		);
	}
}

export default Header;
