set :app_path, "web"

namespace :wp do
  desc "Flush rewrite rules"
  task :rewrite_flush do
    on roles(:app) do
      within release_path do
        execute 'wp', 'rewrite', 'flush', '--hard'
      end
    end
  end

  desc "Regenerate medias"
  task :media_regenerate do
    on roles(:app) do
      within release_path do
        execute 'wp', 'media', 'regenerate', '--only-missing', '--yes'
      end
    end
  end
end
