import React, {Component} from 'react';
import './sidebar.scss';

class Sidebar extends Component<any> {
	constructor(props) {
		super(props);
		this.setStep = this.setStep.bind(this);
	}

	setStep(i) {
		this.props.handleSetRecipe(i);
	}

	render() {
		let sidebarLi = [];
		for (let i = 0; i < this.props.countRecipe; i++) {
			const classNames = "nav-right-li" + (this.props.indexRecipe === i ? ' active-list' : '');
			const value = (i > 8 ? "" : "0") + (i + 1);
			// @ts-ignore
			sidebarLi.push(<li onClick={() => this.setStep(i)} className={classNames} key={i}>{value}</li>);
		}
		return (
			<div className="nav-right">
				<ul className="nav-list">
					{sidebarLi}
				</ul>
			</div>
		);
	}
}

export default Sidebar;