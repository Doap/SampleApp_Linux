<?php 
$hostname = gethostname();
$REGION=`curl http://169.254.169.254/latest/dynamic/instance-identity/document|grep region|awk -F\" '{print $4}'`;
$instanceid=`curl http://169.254.169.254/latest/meta-data/instance-id`;
$REGION=preg_replace('/\s+/', '', $REGION);
echo $hostname . "." . $REGION . "." . "sinkjuice.com";
?>
