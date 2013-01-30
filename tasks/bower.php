<?php

class Bower_Task
{

  public function run($args = array())
	{
	  passthru('cd application/assets/scripts/vendor/ && bower ' . implode(' ', $args));
	}

}