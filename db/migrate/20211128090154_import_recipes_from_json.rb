class ImportRecipesFromJson < ActiveRecord::Migration[6.1]
  def up
    Rake::Task['data:import_recipes'].invoke
  end
end
