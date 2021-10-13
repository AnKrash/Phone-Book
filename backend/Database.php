<?php

//Singleton for the DB connection
class Database
{
    private static $connection = null;

    public static function getConnection()
    {
        if (self::$connection === null) {
            self::$connection = new PDO('mysql:host=localhost;dbname=appBook', 'root', 'root');
        }

        return self::$connection;
    }
}

