import React from "react";
import PropTypes from "prop-types";

import Recipe from "./Recipe";

class RecipesList extends React.Component {
  render() {
    const recipes = this.props.recipes;
    const queryString = this.props.query_string;

    return (
      <React.Fragment>
        <div className="container">
          <h1 className="mt-5 text-center">Awesome Recipes</h1>

          <div className="mt-5 row justify-content-center">
            <div className="col col-sm-12 col-md-10 col-lg-8 col-xl-6">
              <form action="/recipes" method="get">
                <div className="input-group input-group-lg">
                  <input
                    placeholder="What ingredient do you already have?"
                    type="text"
                    name="q"
                    className="form-control form-control-lg"
                  />
                  <button className="btn btn-success" type="submit">
                    Find me a recipe
                  </button>
                </div>
                <p className="text-muted">In french please, e.g. 'Citron'</p>
              </form>
            </div>
          </div>

          <div className="mt-5 text-center">
            {queryString ? (
              <h3>Here are some recipes with ingredient '{queryString}':</h3>
            ) : (
              <h3>Feeling adventurous? Why not try one of these:</h3>
            )}
          </div>

          <div className="mt-5 row justify-content-center">
            {recipes.map((recipe) => (
              <Recipe key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

RecipesList.propTypes = {
  recipes: PropTypes.array,
  query_string: PropTypes.string,
};

export default RecipesList;
