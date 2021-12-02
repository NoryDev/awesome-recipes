class Ingredient < ApplicationRecord
  belongs_to :recipe

  scope :search, lambda { |query_string|
    query_string.split(" ").map do |word|
      where("ingredients.name ILIKE ?", "%#{word}%")
    end.reduce(&:or)
  }
end
