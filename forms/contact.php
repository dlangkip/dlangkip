<?php

$name = $_POST["name"];
$email = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];

require "vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

$mail = new PHPMailer(true);

// $mail->SMTPDebug = SMTP::DEBUG_SERVER;

$mail->isSMTP();
$mail->SMTPAuth = true;

$mail->Host = "smtp.gmail.com";
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->Username = "amoskiprotich1130@gmail.com";
$mail->Password = "jbsiqaxldpxonsgf";

$mail->setFrom($email, $name);
$mail->addAddress("dlangkipro@gmail.com", "Kiprotich");

$mail->Subject = $subject;

// HTML email content
$mail->isHTML(true);
$mail->Body = "
    <html>
    <head>
        <style>
            body {font-family: Arial, sans-serif; color: #333;}
            h2 {color: #4CAF50;}
            p {font-size: 16px;}
            .footer {font-size: 12px; color: #999;}
        </style>
    </head>
    <body>
        <h2>Message from: $name</h2>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Subject:</strong> $subject</p>
        <p><strong>Message:</strong><br>$message</p>
        <p class='footer'>This email was sent through your website contact form.</p>
    </body>
    </html>
";

try {
    $mail->send();
    echo json_encode(["status" => "success", "message" => "Your message has been sent."]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Failed to send message: " . $e->getMessage()]);
}
exit;