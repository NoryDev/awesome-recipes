import React from "react";
import PropTypes from "prop-types";

import Recipe from "./Recipe";

class RecipesList extends React.Component {
  render() {
    const recipes = this.props.recipes;
    const queryString = this.props.query_string;

    return (
      <React.Fragment>
        <form action="/recipes" method="get">
          <input
            placeholder="What ingredient do you already have?"
            type="text"
            name="q"
          />
          <button type="submit">Find me a recipe</button>
        </form>

        {queryString ? (
          <p>Here are some recipes with ingredient '{queryString}':</p>
        ) : (
          <p>Feeling adventurous? Why not try one of these:</p>
        )}

        {recipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </React.Fragment>
    );
  }
}

RecipesList.propTypes = {
  recipes: PropTypes.array,
  query_string: PropTypes.string,
};

export default RecipesList;
