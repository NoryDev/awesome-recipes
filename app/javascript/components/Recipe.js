import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Recipe = ({ recipe }) => {
  const [open, setOpen] = useState(false);
  const [fullRecipe, setFullRecipe] = useState(null);

  const fetchRecipe = async () => {
    const response = await fetch(`/recipes/${recipe.id}.json`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    setFullRecipe(result);
  };

  const toggle = (e) => {
    e.preventDefault();

    setOpen(!open);
  };

  useEffect(() => {
    if (!open) return;

    if (!fullRecipe) {
      fetchRecipe();
    }
  }, [open, fullRecipe]);

  const imgSrc =
    recipe.image && recipe.image.length
      ? recipe.image
      : "https://via.placeholder.com/420x344";

  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
      <div className="card" style={{ margin: "20px" }}>
        <img src={imgSrc} className="card-img-top" alt={recipe.name} />
        <div className="card-body">
          <h5 className="card-title">{recipe.name}</h5>
          {open && fullRecipe ? (
            <>
              <h6 className="card-subtitle mb-2 text-muted">
                Author: {fullRecipe.author}
              </h6>
              <div className="card-text mb-3">
                <p>Ingredients:</p>
                <ul>
                  {fullRecipe.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
                <hr />
                <div>prep: {fullRecipe.prep_time}</div>
                <div>cook: {fullRecipe.cook_time}</div>
                <div>total: {fullRecipe.total_time}</div>
                <hr />
                <div>rating: {fullRecipe.rate}/5</div>
                <div>budget: {fullRecipe.budget}</div>
                <div>difficulty: {fullRecipe.difficulty}</div>
                <div>quantity: for {fullRecipe.people_quantity} people</div>
              </div>
            </>
          ) : (
            ""
          )}
          <a
            href="#"
            onClick={($event) => toggle($event)}
            className="btn btn-primary"
          >
            {open ? "Close" : "Show"}
          </a>
        </div>
      </div>
    </div>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.object,
};

export default Recipe;
