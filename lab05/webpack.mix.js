let mix = require('laravel-mix');
mix.ts('script.ts', 'dist').setPublicPath('dist').copy('index.html', 'dist');
