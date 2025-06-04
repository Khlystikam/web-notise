<?php
    // подключаем параметры из config_base.php
    require 'config_base.php';

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $rootDir = $_SERVER['DOCUMENT_ROOT'];
    $uploadDir = $rootDir . '/assets/web-notise/imgnotise/';

    $newFileName = ""; // Инициализируем переменную

    // Загрузка текста
    $textNamePost = $_POST['textNamePost'] ?? '';
    $textDescriptionPost = $_POST['textDescriptionPost'] ?? '';
    $textTagPost = $_POST['textTagPost'] ?? '';
    $selectedOptionPost = $_POST['selectedOptionPost'] ?? '';
    $idPost = $_POST['idFromFormPost'] ?? '';

    // Загрузка картинки, если она есть
    if (isset($_FILES['image']) && $_FILES['image']['error'] == UPLOAD_ERR_OK) {
        try {
            // Получаем информацию о файле
            $fileTmpPath = $_FILES['image']['tmp_name'];
            $fileName = $_FILES['image']['name'];
            $fileSize = $_FILES['image']['size'];
            $fileType = $_FILES['image']['type'];
            $fileNameCmps = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameCmps));

            // Установите допустимые расширения файлов
            $allowedfileExtensions = ['jpg', 'gif', 'png', 'jpeg'];

            // Проверьте, разрешено ли загружать этот тип файла
            if (in_array($fileExtension, $allowedfileExtensions)) {
                // Сформируем уникальное имя для файла
                $newFileName = md5(time() . $fileName) . '.' . $fileExtension;

                // Укажите полный путь для сохранения файла
                $dest_path = $uploadDir . $newFileName;

                // Переместите файл из временной директории в целевую
                if (move_uploaded_file($fileTmpPath, $dest_path)) {
                    $response = [
                        'success' => true,
                        'message' => 'Файл успешно загружен.',
                        'filePath' => $dest_path
                    ];
                } else {
                    $response = [
                        'success' => false,
                        'message' => 'Произошла ошибка при перемещении загруженного файла.'
                    ];
                }
            } else {
                $response = [
                    'success' => false,
                    'message' => 'Недопустимый тип файла. Разрешенные типы: ' . implode(',', $allowedfileExtensions)
                ];
            }
        } catch (Exception $e) {
            echo "Ошибка: " . $e->getMessage() . "<br>";
        }
    } else {
        echo "Файл изображения не загружен.<br>";
    }

    // Создание соединения
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Проверка соединения
    if ($conn->connect_error) {
        die("Ошибка подключения: " . $conn->connect_error);
    }

    // Экранируем строку для использования в SQL
    $img = '\\assets\\web-notise\\imgnotise\\' . $newFileName;
    $imgEscaped = addslashes($img);

    // Если новое изображение загружено, включаем его в запрос
    if ($newFileName != "") {
        $sql = "UPDATE `notise-table` SET `TitleNotise`='$textNamePost', `TextNotise`='$textDescriptionPost', `TagNotise`='$textTagPost', `ImgNotise`='$imgEscaped', `ViewsNotise`='$selectedOptionPost' WHERE `id` = '$idPost';";
    } else {
        // Если нет нового изображения, пропускаем обновление ImgNotise
        $sql = "UPDATE `notise-table` SET `TitleNotise`='$textNamePost', `TextNotise`='$textDescriptionPost', `TagNotise`='$textTagPost', `ViewsNotise`='$selectedOptionPost' WHERE `id` = '$idPost';";
    }

    // Выполнение запроса
    if ($conn->query($sql) === TRUE) {
        echo "   Запись успешно обновлена.<br>";
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