<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';

if(isset($_POST['send'])){
    $name = htmlentities($_POST['name']);
    $email = htmlentities($_POST['email']);
    $subject = htmlentities($_POST['subject']);
    $message = htmlentities($_POST['message']);

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'amoskiprotich1130@gmail.com';
    $mail->Password = 'jbsiqaxldpxonsgf';
    $mail->Port = 587;
    $mail->SMTPSecure = 'tsl';
    $mail->isHTML(true);
    $mail->setFrom($email, $name);
    $mail->addAddress('amoskiprotich1130@gmail.comL');
    $mail->Subject = ("$email ($subject)");
    $mail->Body = $message;
    $mail->send();

    header("Location: ./thankyou.php?=email_sent!");
}
?>