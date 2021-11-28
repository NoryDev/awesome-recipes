class Ingredient < ApplicationRecord
  belongs_to :recipe

  scope :search, ->(query_string) { where("ingredients.name ILIKE ?", "%#{query_string}%") }
end
