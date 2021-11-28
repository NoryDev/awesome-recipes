class RecipesController < ApplicationController
  def index
    @query_string = params[:q]

    @recipes = Recipe.search_or_inspire_me(@query_string)
  end

  def show
    @recipe = Recipe.find(params[:id])
  end
end
