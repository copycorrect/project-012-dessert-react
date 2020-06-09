import React, {Component} from 'react';
import './recipe.scss';
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";

class Recipe extends Component <any, any> {
	constructor(props) {
		super(props);
		this.handleRecipeChange = this.handleRecipeChange.bind(this);
		this.handleSetRecipe = this.handleSetRecipe.bind(this);
		this.state = {
			error: null,
			isLoaded: false,
			recipeData: [],
			indexRecipe: 0,
			countRecipe: 0
		};
	}
	handleSetRecipe(i){
		this.setState({indexRecipe: i});
	}
	handleRecipeChange(delta) {
		let x = this.state.indexRecipe + delta;
		const quantity = this.state.countRecipe - 1;
		if (x < 0) {
			x = quantity;
		}
		if (x > quantity) {
			x = 0;
		}
		this.setState({indexRecipe: x});
	};


	componentDidMount() {
		fetch("/project-012-dessert-react/data.json")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						recipeData: result.recipes,
						countRecipe: result.recipes.length
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	render() {
		const {error, isLoaded, recipeData, indexRecipe, countRecipe} = this.state;
		if (error) {
			return <div>Ошибка: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Загрузка...</div>;
		} else {
			return (
				<>
					<Header handleRecipeChange={this.handleRecipeChange}/>
					<Sidebar handleSetRecipe={this.handleSetRecipe} countRecipe={countRecipe} indexRecipe={indexRecipe} />
					<div className="dessert-content">
						<div className="dessert-content-item">
							<div className="dessert-title">
								<h1>
									{recipeData[indexRecipe].name}
								</h1>
							</div>
							<div className="dessert-ingredients">
								<input type="radio" name="recipe-tiramisu" id="dessert-ingredients-tiramisu" defaultChecked={true}/>
								<label htmlFor="dessert-ingredients-tiramisu"><h2>ИНГРЕДИЕНТЫ:</h2></label>
								<ul className="dessert-item">
									{recipeData[indexRecipe].ingredients.map(item => (
										<li key={item.name}>
											{item.name}{item.quantity ? " - " + item.quantity : null}
										</li>
									))}
								</ul>
							</div>
							<div className="dessert-cooking-method">
								<input type="radio" name="recipe-tiramisu" id="dessert-cooking-method-tiramisu"/>
								<label htmlFor="dessert-cooking-method-tiramisu"><h2>СПОСОБ ПРИГОТОВЛЕНИЯ:</h2></label>
								<ol className="dessert-item">
									{recipeData[indexRecipe].cookingMethod.map(item => (
										<li key={item}>
											{item}
										</li>
									))}
								</ol>
							</div>
						</div>
						<div className="dessert-content-item">
							<div className="block-img">
								<img src={recipeData[indexRecipe].image} alt={recipeData[indexRecipe].name} />
							</div>
						</div>
					</div>
				</>
			);
		}
	}
}

export default Recipe;