Example of how to use Grunt.js with Laravel
===========================================

Love that yeoman just came out, but it was a bit too opinionated for my workflow.  As yeoman uses bower and grunt, here is an example of how to use those two packages with Laravel to output the all wonderful single css and single js file.  This example uses Coffee-Script and SASS with simple mustache templates attached to a global MZW.JST (MZW is the namespace I use at work, please feel free to change this in the grunt.js file).

###Folder Structure

├── application<br/>
├── artisan<br/>
├── assets<br/>
│   ├── build<br/>
│   │   ├── grunt.js<br/>
│   │   └── package.json<br/>
│   ├── coffee<br/>
│   │   ├── app.coffee<br/>
│   │   └── vendor<br/>
│   ├── css<br/>
│   │   ├── app.css<br/>
│   │   └── vendor<br/>
│   ├── js<br/>
│   │   ├── app.js<br/>
│   │   ├── templates.js<br/>
│   │   └── vendor<br/>
│   │       └── component.json<br/>
│   ├── sass<br/>
│   │   ├── _header.scss<br/>
│   │   ├── app.scss<br/>
│   │   └── vendor<br/>
│   │       ├── _bootstrap-responsive.scss<br/>
│   │       ├── _bootstrap.scss<br/>
│   │       └── bootstrap<br/>
│   └── templates<br/>
│       └── test.ms<br/>
├── bundles<br/>
├── laravel<br/>
├── paths.php<br/>
├── public<br/>
│   ├── css<br/>
│   │   ├── all.css<br/>
│   │   └── all.min.css<br/>
│   ├── favicon.ico<br/>
│   ├── img<br/>
│   ├── index.php<br/>
│   └── js<br/>
│       ├── all.js<br/>
│       └── all.min.js<br/>
└── storage<br/>

###I've added an 'assets' folder to the mix.  This repo is that folder.

I assume you have the following already installed:
- node
- npm
- npm install grunt -g
- npm install coffee-script -g ( only if you want the coffee grunt task )
- gem install compass ( only if you want to use SASS )
- npm install bower -g ( assets/js/vendor/component.json ) 
- PHP 5.4 for some built it server goodness

Get things rolling:
<pre>
cd assets/build                    // Move to the build dir
npm install                        // Install all the grunt npm tasks
grunt                              // Test it out
</pre>

Then when you're ready to dev:
<pre>
cd assets/build                    // I have it setup so you can only grunt from the build dir
grunt watch                        // Will now compile on file mod
cd ../..                           // Back to the root dir
php -S localhost:8888 -t public/   // PHP 5.4 built-in server
</pre>

If you want to use bower, I like to put that in assets/js/vendor<br/>
cd assets/js/vendor<br/>
bower install<br/>

Modify the grunt.js file to your liking.<br/>
For JavaScript concat you'll need to add each new file so they stay in the correct order.<br/>
As long as your use SASS the app.scss will handle order of imported files for styles.<br/>