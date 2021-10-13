<?php

require __DIR__ . "/PhoneBookModel.php";
require __DIR__ . "/Database.php";

class PhoneBookController
{
//    public function add()
//    {
//        $product = Database::getConnection()->query('SELECT * FROM phone_book ')
//            ->fetchObject(PhoneBookModel::class);
//
//        $product->prepare($_POST);
//
//        $productArr = $product->toArray();
//
//        $fields = array_keys($productArr);
//        $bindings = array_fill(0, count($productArr), '?');
//
//        $sql = "INSERT INTO phone_book (" . implode(",", $fields) . ") VALUES (" . implode(",", $bindings) . ")";
//
//        $stmt = Database::getConnection()->prepare($sql);
//
//        $i = 1;
//        foreach ($productArr as $value) {
//            $stmt->bindValue($i, $value);
//            $i++;
//        }
//
//        $stmt->execute();
//
//        header('Location: /', true, 302);
//    }

    public function index(): array
    {
        $products = Database::getConnection()->query('SELECT * FROM phone_book')
            ->fetchAll(PDO::FETCH_CLASS, PhoneBookModel::class);
        return $products;
    }
    public function ajaxInsert()
    {

        $phone = trim(strip_tags($_POST['phone']));
        $surname = trim(strip_tags($_POST['surname']));

        $stmt = Database::getConnection()->prepare("INSERT INTO phone_book (surname,phone) VALUES (?, ?)");
        $stmt->bindParam(1, $surname);
        $stmt->bindParam(2,  $phone);

        $stmt->execute();
    }

    public function ajaxUpdate()
    {
        $ids = json_decode($_POST['ids']);

        $sql = sprintf("UPDATE phone_book WHERE id IN (%s)", implode(',', $ids));
        $stmt = Database::getConnection()->prepare($sql);

        $stmt->execute();
    }

    public function ajaxDelete()
    {
        $ids = json_decode($_POST['ids']);

        $sql = sprintf("DELETE FROM phone_book WHERE id IN (%s)", implode(',', $ids));
        $stmt = Database::getConnection()->prepare($sql);

        $stmt->execute();
    }

}