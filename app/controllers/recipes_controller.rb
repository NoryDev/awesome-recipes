class RecipesController < ApplicationController
  def index
    @query_string = params[:q]

    @recipes = Recipe.search_or_inspire_me(@query_string)
  end

  def show
    @recipe = Recipe.find(params[:id])

    respond_to do |format|
      format.json do
        render json: {
          id: @recipe.id,
          name: @recipe.name,
          rate: @recipe.rate,
          budget: @recipe.budget,
          prep_time: @recipe.prep_time,
          author: @recipe.author,
          difficulty: @recipe.difficulty,
          people_quantity: @recipe.people_quantity,
          cook_time: @recipe.cook_time,
          total_time: @recipe.total_time,
          ingredients: @recipe.ingredients.pluck(:name)
        }
      end
    end
  end
end
