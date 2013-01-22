<?php

class Assets_Task
{
	public function run()
	{
	  echo "\r\n";
	  echo '  Assets Pipeline for Laravel' . "\r\n\r\n";
	  echo '  assets                 - this menu' . "\r\n";
		echo '  assets:setup [options] - runs the setup process' . "\r\n";
		echo '  assets:build           - builds the assets' . "\r\n";
		echo '  assets:watch           - starts the watch process' . "\r\n";
		echo "\r\n";
		echo '  options ' . "\r\n";
		echo '  -ns                    - install dependencies without using sudo ' . "\r\n";
	}

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

}
