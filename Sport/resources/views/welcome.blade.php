<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    </head>
    <body class="antialiased">
     <h1>Reservation Confirmation</h1>

<p>Dear {{ $data['reserver_name'] }},</p>
<p>Welcome to our sauna service! Your reservation has been confirmed. We look forward to providing you with a relaxing experience.</p>

<p>Your sauna reservation has been confirmed:</p>

<ul>
    <li><strong>Sauna:</strong> {{ $data['sauna_name'] }}</li>
      <li><strong> Day :</strong> {{ $data['day'] }}</li>
    <li><strong>Start Time:</strong> {{ $data['start_time'] }}</li>
    <li><strong>End Time:</strong> {{ $data['end_time'] }}</li>
</ul>

<p>Thank you for choosing our sauna. We’re excited to welcome you and hope you enjoy your time with us!</p>


    </body>
</html>
