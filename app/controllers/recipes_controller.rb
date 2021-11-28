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
          ingredients: @recipe.ingredients.pluck(:name)
        }
      end
    end
  end
end
