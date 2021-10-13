<?php

class PhoneBookModel
{
    protected $id;
    protected $phone;
    protected $surname;

    public function getPhone()
    {
        return $this->phone;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getSurname()
    {
        return $this->surname;
    }

    public function prepare(array $data)
    {
        $this->id = $data["id"];
        $this->phone = $data["phone"];
        $this->surname= $data["surname"];
    }

    public function toArray(): array
    {
        return [

            'phone' => $this->phone,
            'surname' => $this->surname,
            'id' => $this->id
        ];
    }


}