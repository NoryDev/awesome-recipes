class Recipe < ApplicationRecord
  DEFAULT_RECIPES_COUNT = 3

  has_many :ingredients

  scope :search, ->(query_string) { distinct.joins(:ingredients).merge(Ingredient.search(query_string)) }

  class << self
    def search_or_inspire_me(query_string = nil)
      return random_recipes if query_string.blank?

      search(query_string).order(:id)
    end

    def random_recipes(count = DEFAULT_RECIPES_COUNT)
      self.order(Arel.sql('RANDOM()')).limit(count)
    end
  end
end
