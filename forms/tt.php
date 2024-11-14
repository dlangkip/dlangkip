<?php

if (isset($_POST['send'])) {
  echo "Form submission received.";
} else {
  echo "Form not submitted.";
}


error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

if (isset($_POST['send'])) {
    $name = htmlentities($_POST['name']);
    $email = htmlentities($_POST['email']);
    $subject = htmlentities($_POST['subject']);
    $message = htmlentities($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'amoskiprotich1130@gmail.com';
        $mail->Password = 'jbsiqaxldpxonsgf';
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';

        // Email settings
        $mail->isHTML(true);
        $mail->setFrom($email, $name);
        $mail->addAddress('amoskiprotich1130@gmail.com'); // Recipient's email
        $mail->Subject = "$subject";
        $mail->Body = "<strong>Name:</strong> $name<br><strong>Email:</strong> $email<br><strong>Message:</strong><br>$message";

        echo "Preparing to send email..."; // Debug message to confirm script progression

        $mail->send();
        echo "Email sent successfully!"; // Debug message after send


        // Send email
        $mail->send();

        // // Redirect to thank you page with success message
        // header("Location: ./thankyou.php?status=email_sent");
        // exit();

    } catch (Exception $e) {
        // Display error if email fails to send
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
