Example of how to use Grunt.js with Laravel
===========================================

Love that yeoman just came out, but it was a bit to opinionated for my workflow.  As yeoman uses bower and grunt, here is an example of how to use those two packages with Laravel to output the all wonderful single css and single js file.  This example uses Coffee-Script and SASS with simple mustache temples attached to a global MZW.JST (MZW is the namespace I use at work, please feel free to change this in the grunt.js file).

Folder Structure

├── application
├── artisan
├── assets

│   ├── build
│   │   ├── grunt.js
│   │   └── package.json
│   ├── coffee
│   │   ├── app.coffee
│   │   └── vendor
│   ├── css
│   │   ├── app.css
│   │   └── vendor
│   ├── js
│   │   ├── app.js
│   │   ├── templates.js
│   │   └── vendor
│   │       └── component.json
│   ├── sass
│   │   ├── _header.scss
│   │   ├── app.scss
│   │   └── vendor
│   │       ├── _bootstrap-responsive.scss
│   │       ├── _bootstrap.scss
│   │       └── bootstrap
│   └── templates
│       └── test.ms
├── bundles
├── laravel
├── paths.php
├── public
│   ├── css
│   │   ├── all.css
│   │   └── all.min.css
│   ├── favicon.ico
│   ├── img
│   ├── index.php
│   └── js
│       ├── all.js
│       └── all.min.js
└── storage

I've added an 'assets' folder to the mix.  This repo is that folder.

I assume you have the following already installed:
- node
- npm
- npm install grunt -g
- npm install coffee-script -g ( only if you want the coffee grunt task )
- gem install compass ( only if you want to use SASS )
- npm install bower -g ( assets/js/vendor/component.json ) 
- PHP 5.4 for some built it server goodness

Get things rolling:
`cd assets/build`                    // Move to the build dir
`npm install`                        // Install all the grunt npm tasks
`grunt`                              // Test it out  

Then when you're ready to dev:
`cd assets/build`                    // I have it setup so you can only grunt from the build dir
`grunt watch`                        // Will now compile on file mod
`cd ../..`                           // Back to the root dir
`php -S localhost:8888 -t public/`   // PHP 5.4 built-in server

If you want to use bower, I like to put that in assets/js/vendor
`cd assets/js/vendor`
`bower install`

Modify the grunt.js file to your liking.  
For JavaScript concat you'll need to add each new file so they stay in the correct order.
As long as your use SASS the app.scss will handle order of imported files for styles.