<?php

using Facebook\FacebookSession;

FacebookSession::setDefaultApplication( '855721917801554','902cd10f295a38c0f0566076e2518f1c' );

// Use one of the helper classes to get a FacebookSession object.
//   FacebookRedirectLoginHelper
//   FacebookCanvasLoginHelper
//   FacebookJavaScriptLoginHelper
// or create a FacebookSession with a valid access token:
$session = new FacebookSession('AQDd1O6kKuv173DgTLuLtgazxdmmb6cA8D8IgJoZ7bJTL6UrOOJ_EPesNHVsCZKBqZKNrQJgJ3WPJBoMM06bRwew9RylUSIMTt8jmc4908gI_AoGKPT3CUDhdxE45Nll2A4xRFi-vqTXhhFAXcqg6RLGxPob1fuOKgo5qbG16P3OzKjWjJdSHZzggpEvN23QXloj5O_9FQeU9-pJpsSaV0EUEtCNh1yiWkSwWzrXQ-BtefIMga_h2m6Z08pNPupvu4bhHU9aOsPERkB4h9U8xz-cUcYP6IGMmjXryLqg033OxQ29tAHam2LblLX8GDd5hO8&state=01c5f8b5ff7ab39f18af9f1d6a6a705b#_=_');

// Get the GraphUser object for the current user:

try {
  $me = (new FacebookRequest(
    $session, 'GET', '/me'
  ))->execute()->getGraphObject(GraphUser::className());
  echo $me->getName();
} catch (FacebookRequestException $e) {
  // The Graph API returned an error
} catch (\Exception $e) {
  // Some other error occurred
}
?>
