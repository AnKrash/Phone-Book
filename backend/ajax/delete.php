<?php

require_once("backend/controllers/PhoneBookController.php");

$controller = new PhoneBookController();
$controller->ajaxDelete();
