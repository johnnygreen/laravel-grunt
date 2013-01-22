Laravel 3 + Grunt.js + Bower
=============================================

Love that yeoman just came out, but it was a bit too opinionated for my workflow. As yeoman uses bower and grunt, here is an example of how to use those two packages with Laravel to output the all wonderful single css and single js file. This example uses Coffee-Script and SASS with simple mustache templates attached to a global, JST.

###Folder Structure
There are some junk files in there… they can be ignored / deleted.
<pre>
application/
├── assets
│   ├── README.md
│   ├── build
│   │   ├── README.md
│   │   ├── grunt.js
│   │   └── package.json
│   ├── scripts
│   │   ├── app.coffee
│   │   ├── amd
│   │   ├── build
│   │   │   ├── amd.coffee
│   │   │   ├── amd.js
│   │   │   └── app.js
│   │   ├── lib
│   │   │   └── InfiniteSlider.js
│   │   └── vendor
│   │       ├── component.json
│   │       └── fitvids.js
│   └── styles
│       ├── app.scss
│       ├── build
│       │   └── app.css
│       ├── components
│       │   ├── _common.scss
│       │   ├── _fonts.scss
│       │   ├── _footer.scss
│       │   ├── _header.scss
│       │   ├── _mixins.scss
│       │   └── _variables.scss
│       ├── config.rb
│       ├── pages
│       │   ├── _home.scss
│       │   └── _interview.scss
│       └── vendor
│           ├── _grid.scss
│           └── reset.css
├── tasks
│   ├── assets.php
│   └── server.php
└── public
    ├── css
    │   ├── all.css
    │   └── all.min.css
    └── js
        ├── all.js
        └── all.min.css

</pre>

###Put these two folders in your Laravel application folder

I assume you're on OSX with PHP 5.4… and you have node and npm installed. Node and NPM can easily be installed via nodejs.org.  For PHP and other packages I use homebrew with the josegonzalez and homebrew-php taps added.

<pre>
$ artisan assets

 Assets Pipeline for Laravel

  assets                 - this menu
  assets:setup [options] - runs the setup process
  assets:build           - builds the assets
  assets:watch           - starts the watch process

  options 
  -ns                    - install dependencies without using sudo 
</pre>
Here is the code behind these tasks...
<pre>
public function setup($args = array())
{
   $sudo = (isset($args[0]) && trim($args[0]) === '-ns') ? '' : 'sudo';

   passthru($sudo . ' gem install compass');
   passthru($sudo . ' gem install compass-rgbapng');
   passthru($sudo . ' gem install breakpoint');
   passthru($sudo . ' gem install terminal-notifier');
   passthru($sudo . ' gem install sass-globbing');
   passthru($sudo . ' npm install grunt -g');
   passthru($sudo . ' npm install bower -g');
   passthru('cd application/assets/build/ && ' . $sudo . ' npm install');
   passthru('cd application/assets/scripts/vendor/ && bower install');
}

public function build()
{
   passthru('cd application/assets/build/ && grunt');
}

public function watch()
{
   passthru('cd application/assets/build/ && grunt watch');
}
</pre>
<pre>
$ artisan server 0.0.0.0 80
</pre>
<pre>
class Server_Task
{
  /**
   *  artisan server ip_address/hostname port
   *
   *  i.e. 
   *  artisan server 0.0.0.0 80
   *  artisan server my.google.dev 3000
   *
   *  for hostnames add the name to /etc/hosts
   */
	public function run($args = array())
	{
	  $hostname = isset($args[0]) ? $args[0] : '0.0.0.0';
	  $port = isset($args[1]) ? $args[1] : '80';
	  $sudo = $port &lt; 1024 ? 'sudo ' : '';
  	  passthru($sudo . 'php -S ' . $hostname . ':' . $port . ' -t public/');
	}
}
</pre>

To use bower to manage your js dependencies, it's installed in assets/scripts/vendor<br/>
<pre>
cd assets/scripts/vendor
bower install // will install what's in the component.json
bower install jquery --save // example of installing new js dep
</pre>

After installing something with bower, of course then you will need to add that file to  the grunt.js file, same goes with CSS files. As for SCSS, just include each new file in the app.scss and use an _ underscore for files so they will not be included by compass when compiling.

Modify the grunt.js file to your liking.  Add / Remove tasks, etc.  Best get use to that file, it's important!

Didn't really touch on amd, but it's pretty straight forward… put amd in the assets/scripts/amd … install require.js with bower, include require.js in the grunt.js file and it should include all the amd files in the build WITHOUT having to add them to the grunt file one by one.

After running artisan assets:build or watch … the files will be compiled into the public folder.  In your main layout, just include min or non-min file.

If you have questions feel free to open an issue.
