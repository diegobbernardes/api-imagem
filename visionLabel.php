<?php

namespace Vision;
//error_reporting(0);
if(isset($_SERVER["HTTP_ORIGIN"]))
{
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
else
{
    //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 600");    // cache for 10 minutes

if($_SERVER["REQUEST_METHOD"] == "OPTIONS")
{
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT"); //Make sure you remove those you do not want to support

    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    //Just exit with 200 OK with the above headers for OPTIONS method
    exit(0);
}
include_once 'credentials.php'; // inclusão do arquivo de credenciais
include_once 'GoogleTranslate.class.php';
$source = 'en';
$target = 'pt-br';

use Vision\Vision;
use Vision\Image;
use Vision\Feature;
use GoogleTranslate\translate;
use GoogleTranslate;
use GoogleTranslate\requestTranslation;

require_once('vendor/autoload.php');


$traduz = new GoogleTranslate();
$vision = new Vision(
    $visionKey, 
    [
        new \Vision\Feature(Feature::LABEL_DETECTION, 100),
    ]
);

//enviando a imagem do gato e realizando a request.

//$imagePath = "images.jpg";
$file_name =$_FILES['uploaded_file']['name'];
$file_size=$_FILES['uploaded_file']['size'];
$file_tmp= $_FILES['uploaded_file']['tmp_name'];

$tmpfile = $_FILES['uploaded_file']['tmp_name'];
$filename = basename($_FILES['uploaded_file']['name']);

$type = pathinfo($file_name, PATHINFO_EXTENSION);
$data = file_get_contents( $file_tmp );
$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

$imagePath = $base64;
$response = $vision->request(
	new Image($imagePath)
);

//recebendo as categorias´.
$labels = $response->getLabelAnnotations();

//iterando as categorias e imprimindo na tela os resultados
$i = 0;
foreach ($labels as $label) {	
	$teste = $label->getDescription();
	$myObj[$i]->produto = $traduz->translate($source, $target, $teste);
    //print_r($i."-".$label->getDescription().'<br>') ;
	$i= $i + 1;

}
$myJSON = json_encode($myObj);
//print($myJSON);