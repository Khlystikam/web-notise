<?php
    // подключаем параметры из config_base.php
    require 'config_base.php';

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    // Создание соединения
    $conn = new mysqli($servername, $username, $password, $dbname);

    
    // Проверка соединения
    if ($conn->connect_error) {
        die("Ошибка подключения: " . $conn->connect_error);
    }


    // Получение всех данных из таблицы и запись в JSON-файл
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
            echo "Данные успешно выгружены в users.json";
        } else {
            echo "Ошибка: " . $sqlSave . "<br>" . $conn->error;
        }
    
    } else {
        echo "Нет данных для выгрузки";
    }

    // Закрытие соединения
    $conn->close();
?>