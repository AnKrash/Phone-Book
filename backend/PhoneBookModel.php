<?php

class PhoneBookModel
{
    protected int $id;
    protected string $phone;
    protected string $surname;

    public function getId(): int
    {
        return $this->id;
    }

    public function getPhone(): string
    {
        return $this->phone;
    }

    public function getSurname(): string
    {
        return $this->surname;
    }
}