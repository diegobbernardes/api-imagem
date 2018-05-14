<?php
function CallAPI($method, $url, $data = false)
{
    $curl = curl_init();

    switch ($method)
    {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);



            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;

        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    // Optional Authentication:
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

    curl_setopt($curl, CURLOPT_URL, $url);

    $result = curl_exec($curl);

    curl_close($curl);

    return $result;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $tmpfile = $_FILES['image']['tmp_name'];
    $filename = basename($_FILES['image']['name']);
    $data = array(
        'uploaded_file' => curl_file_create($tmpfile, $_FILES['image']['type'], $filename)
    );

    echo  CallAPI("POST","visionLabel.php", $data);

}
?>
<body>
	<form method="post" action="teste.php" enctype="multipart/form-data">
        <input type="file" name="image" />
		<input type="submit" />
	</form>
</body>