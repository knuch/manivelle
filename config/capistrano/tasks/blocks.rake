require 'fileutils'

set :app_path, "web"
set :blocks_path, "app/themes/wise/resources/blocks/dist"
set :blocks_branch, "dist/blocks"

namespace :blocks do

  desc "Pull blocks built assets from Git"
  task :pull_blocks_from_git do
    on roles(:app) do
      within release_path + fetch(:app_path) do
        execute :git, 'clone', '-b', fetch(:blocks_branch), repo_url, fetch(:blocks_path)
      end
    end
  end
end
