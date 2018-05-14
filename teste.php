<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once('GoogleTranslate.class.php');
$source = 'pt-br';
$target = 'en';
$text = "testando tradução batata";
$translation = GoogleTranslate::translate($source, $target, $text);
echo '<pre>';
print_r($translation);
echo '</pre>';
