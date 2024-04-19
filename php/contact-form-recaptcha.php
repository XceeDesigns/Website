<?php

if ( $_POST["enter"] ) {

 if ( !$_POST["g-recaptcha-response"] ) {
		exit("Captcha g-recaptcha-response doesn't exist");
 };  
 //var_dump($_POST);
 
  $url = "https://www.google.com/recaptcha/api/siteverify";
	$key = "PUT YOUR SECRET KEY HERE";
	$query = $url."?secret=".$key."&response=".$_POST["g-recaptcha-response"]."&remoteip=".$_SERVER["REMOTE_ADDR"];
  
  $data = json_decode(file_get_contents($query));
  
  if ( $data->success == false) {
		$arrResult = array ('response'=>'error');
    echo json_encode($arrResult);
  } else { 
    if (array_key_exists('email', $_POST)) {
    date_default_timezone_set('Etc/UTC');

    // require 'php-mailer2/PHPMailerAutoload.php';
    require 'php-mailer/PHPMailer.php';
    require 'php-mailer/SMTP.php';
    require 'php-mailer/Exception.php';

    //Create a new PHPMailer instance
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    //Tell PHPMailer to use SMTP - requires a local mail server
    //Faster and safer than using mail()
  
    //$mail->isSMTP();                              // Tell PHPMailer to use SMTP
    
    //$mail->Host = 'mail.yourserver.com';				  // Specify main and backup server
    //$mail->SMTPAuth = true;                       // Enable SMTP authentication
    //$mail->Username = 'username';             	  // SMTP username
    //$mail->Password = 'secret';                   // SMTP password
    //$mail->SMTPSecure = 'tls';                    // Enable encryption, 'ssl' also accepted
    //$mail->Port = 25;                             // Set the SMTP port number - likely to be 25, 465 or 587

    //Use a fixed address in your own domain as the from address
    //**DO NOT** use the submitter's address here as it will be forgery
    //and will cause your messages to fail SPF checks
    
    $mail->setFrom('email@your-website.com', 'your-website.com'); //**Write here sender email. For example, emails will be sent to you from your website, so write email of your website (if you don't have it, write any email, which you want) and the name of your website. Example ('email@your-website.com', 'your-website.com')) Send from a fixed, valid address in your own domain, perhaps one that allows you to easily identify that it originated on your contact form**
    
    //Send the message to yourself, or whoever should receive contact for submissions
    
    $mail->addAddress('artrevodev@gmail.com'); //**WRITE HERE RECIPIENT EMAIL ADDRESS (AT THIS ADDRESS EMAILS WILL BE COME)**
    
    //Put the submitter's address in a reply-to header
    //This will fail if the address provided is invalid,
    //in which case we should ignore the whole request
    
    if ($mail->addReplyTo($_POST['email'], $_POST['name'])) {
        $mail->Subject = 'Message from '.$_POST['email'];
        //Keep it simple - don't use HTML
        $mail->isHTML(false);
        $mail->CharSet = 'UTF-8';
        //Build a simple message body
        $mail->Body = <<<EOT
Email: {$_POST['email']}
Name: {$_POST['name']}
Message: {$_POST['message']}
EOT;
        //Send the message, check for errors
        if(!$mail->Send()) {
          $arrResult = array ('response'=>'error');
        } else {

          $arrResult = array ('response'=>'success');
        }

          echo json_encode($arrResult);
          
        } else {

          $arrResult = array ('response'=>'error');
          echo json_encode($arrResult);

        }
    } 

    
  };
  
}

?>