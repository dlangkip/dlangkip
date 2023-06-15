<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get the form fields and sanitize the data
  $name = htmlspecialchars($_POST["name"]);
  $email = htmlspecialchars($_POST["email"]);
  $subject = htmlspecialchars($_POST["subject"]);
  $message = htmlspecialchars($_POST["message"]);

  // Set up the email recipient
  $to = "dlangkipro@gmail.com";

  // Set up the email headers
  $headers = "From: $email" . "\r\n";
  $headers .= "Reply-To: $email" . "\r\n";
  $headers .= "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";

  // Construct the email body
  $email_body = "<h3>New Contact Message</h3>";
  $email_body .= "<p><strong>Name:</strong> $name</p>";
  $email_body .= "<p><strong>Email:</strong> $email</p>";
  $email_body .= "<p><strong>Subject:</strong> $subject</p>";
  $email_body .= "<p><strong>Message:</strong> $message</p>";

  // Send the email
  if (mail($to, $subject, $email_body, $headers)) {
    echo "success";
  } else {
    echo "error";
  }
}
?>
