require 'fileutils'

set :app_path, "web"
set :styleguide_path, "app/themes/evam/resources/dist"
set :styleguide_branch, "dist/frontend"

namespace :styleguide do
  desc "Build assets from Git"
  task :build_from_git do
    on roles(:app) do
      within release_path + fetch(:app_path) do
        execute :git, 'clone', '-b', fetch(:styleguide_branch), repo_url, fetch(:styleguide_path)
      end
    end
  end
end
