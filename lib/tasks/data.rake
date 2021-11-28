require 'json'

namespace :data do
  desc "import recipes from JSON"
  task import_recipes: :environment do
    path = Rails.root.join('lib/data/recipes.json')
    puts "Reading file..."
    raw = File.read(path)
    puts "Importing recipes:"
    raw.split("\n").each.with_index do |raw_recipe, index|
      print "." if index % 95 == 0

      json_recipe = JSON.parse(raw_recipe)
      Recipe.transaction do
        recipe = Recipe.create!(
          rate: json_recipe['rate'],
          author_tip: json_recipe['author_tip'],
          budget: json_recipe['budget'],
          prep_time: json_recipe['prep_time'],
          name: json_recipe['name'],
          author: json_recipe['author'],
          difficulty: json_recipe['difficulty'],
          people_quantity: json_recipe['people_quantity'],
          cook_time: json_recipe['cook_time'],
          total_time: json_recipe['total_time'],
          image: json_recipe['image'],
          nb_comments: json_recipe['nb_comments'],
        )

        json_recipe['ingredients'].each do |ingredient_name|
          Ingredient.create!(recipe: recipe, name: ingredient_name)
        end

        json_recipe['tags'].each do |tag_name|
          Tag.create!(recipe: recipe, name: tag_name)
        end
      end
    end
    puts ""
    puts "Recipes Imported"
  end
end
