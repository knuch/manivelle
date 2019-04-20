set :stage, :production


# Simple Role Syntax
# ==================
#role :app, %w{deploy@example.com}
#role :web, %w{deploy@example.com}
#role :db,  %w{deploy@example.com}

# Extended Server Syntax
# ======================
server 'd96ka.ftp.infomaniak.com', user: 'd96ka_fkn', roles: %w{web app db}

# you can set custom ssh options
# it's possible to pass any option but you need to keep in mind that net/ssh understand limited list of options
# you can see them in [net/ssh documentation](http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start)
# set it globally
#  set :ssh_options, {
#    keys: %w(~/.ssh/id_rsa),
#    forward_agent: false,
#    auth_methods: %w(password)
#  }

# Get the corresponding styleguide & blocks
after "deploy:finished", "styleguide:build_from_git"
after "deploy:finished", "blocks:pull_blocks_from_git"
after "deploy:finished", "wp:rewrite_flush"
after "deploy:finished", "wp:media_regenerate"

fetch(:default_env).merge!(wp_env: :production)

phpbin = "/opt/php7.2/bin/php"

SSHKit.config.command_map[:composer] = "#{phpbin} #{shared_path.join("composer.phar")}"
SSHKit.config.command_map[:wp] = "#{phpbin} #{shared_path.join("wp-cli.phar")}"
