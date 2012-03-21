<?php
  function validateForm($params) {
  	$errors = array();
		if($params['name'] == "")  { $errors['name'] 	= "Please provide your name."; }
		if($params['email'] == "") { $errors['email'] = "Please provide your email address."; }
		
		return $errors;
  }
	
	function mailForm($params) {
		date_default_timezone_set('America/New_York');
  	$url 		 = $_SERVER['HTTP_HOST'];
		$name 	 = $params['name'];
		$dogName = $params['dog-name'];
		$email   = $params['email'];
		$message = $params['message'];
		
		$body  = "New Contact from " . $url;
		$body .= "Name: " . $name . "\n";
		$body .= "Dog's Name: " . $dogName . "\n";
		$body .= "Email: " . $email . "\n";
		$body .= "Message:\n" . $message . "\n";
		$body .= "Sent At:\n" . date('m/d/Y') . "\n";
		
		$subject = "New Contact from" . $url;
		$headers = "From: " . $name . " &lt;" . $email . "&gt;";
		
		$success = mail("raymondke99@gmail.com", $subject, $body, $headers);

    return $success;
	}
?>