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

  return (
    <>
      <h3 key={recipe.id}>
        <a href="#" onClick={($event) => toggle($event)}>
          {recipe.name}
        </a>
      </h3>
      {open && fullRecipe ? (
        <>
          <p>Ingredients:</p>
          <ul>
            {fullRecipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </>
      ) : (
        ""
      )}
    </>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.object,
};

export default Recipe;
