import React from "react";
import PropTypes from "prop-types";

class Recipe extends React.Component {
  render() {
    const recipe = this.props.recipe;

    return (
      <React.Fragment>
        <h1>{recipe.name}</h1>
        <p>Ingredients:</p>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

Recipe.propTypes = {
  recipe: PropTypes.object,
};
export default Recipe;
