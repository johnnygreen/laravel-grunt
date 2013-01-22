<?php

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
	  $sudo = $port < 1024 ? 'sudo ' : '';
  	passthru($sudo . 'php -S ' . $hostname . ':' . $port . ' -t public/');
	}
}