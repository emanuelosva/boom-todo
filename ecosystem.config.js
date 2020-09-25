module.exports = {
  apps: [
    {
      name: 'AUTH_SERVICE',
      cwd: 'server/db-auth-service/db_auth/',
      script: 'manage.py',
      args: 'runserver',
      interpreter: 'python3',
      watch: true,
      exec_mode: 'fork',
      wait_ready: true,
    },
    {
      name: 'API_SERVICE',
      cwd: 'server',
      script: 'dist/bin/www.js',
      watch: true,
      exec_mode: 'cluster',
      ignore_watch: ['[\/\\]\./', 'node_modules'],
      wait_ready: true,
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      }
    },
    {
      name: 'WEB_SERVICE',
      cwd: 'frontend',
      script: '__sapper__/build/index.js',
      watch: true,
      exec_mode: 'cluster',
      ignore_watch: ['[\/\\]\./', 'node_modules'],
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      }
    }
  ],
};
