<?php

//Singleton for the DB connection
class Database
{
    private static ?PDO $connection = null;

    public static function getConnection():PDO
    {
        if (self::$connection === null) {
            self::$connection = new PDO('mysql:host=localhost;dbname=appBook', 'root', 'root');
        }

        return self::$connection;
    }
}

