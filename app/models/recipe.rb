class Recipe < ApplicationRecord
  DEFAULT_RECIPES_COUNT = 3
  PER_PAGE = 24

  has_many :ingredients

  scope :search, lambda { |query_string|
    joins(:ingredients).
      merge(Ingredient.search(query_string)).
      select('recipes.*').
      select('count(ingredients.recipe_id) as found_ingredients').
      select('(select count(*) from ingredients where ingredients.recipe_id = recipes.id) as total_ingredients').
      group('recipes.id').
      order(found_ingredients: :desc, total_ingredients: :asc)
  }

  class << self
    def search_or_inspire_me(query_string = nil, page: 1)
      return random_recipes if query_string.blank?

      search(query_string).page(page).per(PER_PAGE)
    end

    def random_recipes(count = DEFAULT_RECIPES_COUNT)
      self.order(Arel.sql('RANDOM()')).limit(count)
    end
  end
end
