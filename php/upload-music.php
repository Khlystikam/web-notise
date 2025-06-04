<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

        
    // Проверяем, был ли загружен файл
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {

        $rootDir = $_SERVER['DOCUMENT_ROOT'];

        $uploadDir = $rootDir . '/assets/web-notise/music/'; // Директория для загрузки файлов

        // Убедимся, что директория существует
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $file = $_FILES['file'];
        $fileName = basename($file['name']);
        $targetPath = $uploadDir . $fileName;

        // Пытаемся сохранить файл
        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            // Создаем JSON файл с информацией о директории загруженного файла
            $data = [
                'fileName' => $fileName
            ];

            $jsonFilePath = 'music-file.json';
            file_put_contents($jsonFilePath, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

            // Ответ на успешную загрузку
            echo json_encode([
                'status' => 'success',
                'message' => 'Файл успешно загружен',
                'filePath' => $fileName
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Не удалось загрузить файл'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Файл не был отправлен'
        ]);
    }

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
?>