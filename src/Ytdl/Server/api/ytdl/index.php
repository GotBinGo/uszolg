<form>
        <input name="v">
        <input type="submit">
</form>
<a href=".">Back</a>
<br>
<?php
        if (!array_key_exists('v', $_GET) || !preg_match('/[a-zA-Z0-9_-]{11}/', $_GET['v'])) {
                die('regex mismatch');
        }
        $output = shell_exec('node /var/www/html/api/ytdl/index.js ' . $_GET['v']);
        echo $output;
?>
