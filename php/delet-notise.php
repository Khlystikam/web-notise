<?php
    // подключаем параметры из config_base.php
    require 'config_base.php';

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    // Загрузка текста
    $idPost = $_POST['idFromFormPost'] ?? '';

    // Создание соединения
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Проверка соединения
    if ($conn->connect_error) {
        die("Ошибка подключения: " . $conn->connect_error);
    }

    $sql = "DELETE FROM `notise-table` WHERE `id` = '$idPost';";

    // Выполнение запроса
    if ($conn->query($sql) === TRUE) {
        echo "   Запись успешно удалена.<br>";
    } else {
        echo "   Ошибка: " . $sql . "<br>" . $conn->error;
    }

// ________________________________________________________________

    // Получение всех данных из таблицы и запись в JSON-файл notise-table.json
    $sqlSave = "SELECT * FROM `notise-table`";
    $result = $conn->query($sqlSave);


    if ($result->num_rows > 0) {
        $users = [];
    
        // Преобразование данных в массив
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
    
        // Преобразование массива в JSON
        $json_data = json_encode($users, JSON_PRETTY_PRINT);
    
        // Запись данных в JSON-файл
        if (file_put_contents("notise-table.json", $json_data)) {
            echo "   Данные успешно выгружены в notise-table.json";
        } else {
            echo "   Ошибка: " . $sqlSave . "<br>" . $conn->error;
        }
    
    } else {
        echo "   Нет данных для выгрузки";
    }

// ________________________________________________________________

    // Получение всех данных из таблицы и запись в JSON-файл notise-table.json
    $sqlSave = "SELECT * FROM `notise-table` WHERE `ViewsNotise`='Да'";
    $result = $conn->query($sqlSave);


    if ($result->num_rows > 0) {
        $users = [];
    
        // Преобразование данных в массив
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
    
        // Преобразование массива в JSON
        $json_data = json_encode($users, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
        // Запись данных в JSON-файл
        if (file_put_contents("notise-table-online.json", $json_data)) {
            echo "Данные успешно выгружены в notise-table-online.json";
        } else {
            echo "Ошибка: " . $sqlSave . "<br>" . $conn->error;
        }
    
    } else {
        echo "Нет данных для выгрузки notise-table-online.json";
    }

    // Закрытие соединения
    $conn->close();
?>