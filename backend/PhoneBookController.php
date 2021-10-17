<?php

require __DIR__ . "/PhoneBookModel.php";
require __DIR__ . "/Database.php";

class PhoneBookController
{
    /**
     * @return PhoneBookModel[]
     */
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

        $db = Database::getConnection();
        $stmt = $db->prepare("INSERT INTO phone_book (surname,phone) VALUES (?, ?)");
        $stmt->bindParam(1, $surname);
        $stmt->bindParam(2, $phone);

        $stmt->execute();

        echo json_encode(['id' => $db->lastInsertId()]);
    }

    public function ajaxUpdate()
    {
        $phone = trim(strip_tags($_POST['phone']));
        $surname = trim(strip_tags($_POST['surname']));

        $sql = "UPDATE phone_book SET surname=:surname,phone=:phone WHERE id =:id ";
        $stmt = Database::getConnection()->prepare($sql);
        $stmt->bindParam(':id', $_POST['id']);
        $stmt->bindParam(':surname', $surname);
        $stmt->bindParam(':phone', $phone);
        $stmt->execute();
    }

    public function ajaxDelete()
    {
        $sql = "DELETE FROM phone_book WHERE id = ?";
        $stmt = Database::getConnection()->prepare($sql);
        $stmt->bindParam(1, $_POST['id']);

        $stmt->execute();
    }
}