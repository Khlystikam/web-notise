<?php
    // подключаем параметры из config_base.php
    require 'config_base.php';

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    $rootDir = $_SERVER['DOCUMENT_ROOT'];

    $uploadDir = $rootDir . '/assets/web-notise/imgnotise/';

    // Проверьте, присутствует ли файл в запросе
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
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
            if(move_uploaded_file($fileTmpPath, $dest_path)) {
                $response = [
                    'success' => true,
                    'message' => 'File is successfully uploaded.',
                    'filePath' => $dest_path
                ];
            } else {
                $response = [
                    'success' => false,
                    'message' => 'There was an error moving the uploaded file.'
                ];
            }
        } else {
            $response = [
                'success' => false,
                'message' => 'Upload failed. Allowed file types: ' . implode(',', $allowedfileExtensions)
            ];
        }
    } else {
        $response = [
            'success' => false,
            'message' => 'No file uploaded or there was an upload error.'
        ];
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Получаем данные из POST-запроса
        $textNamePost = $_POST['textNamePost'] ?? '';
        $textDescriptionPost = $_POST['textDescriptionPost'] ?? '';
        $textTagPost = $_POST['textTagPost'] ?? '';
        $selectedOptionPost = $_POST['selectedOptionPost'] ?? '';
    
        // Пример обработки данных
        if (!empty($textNamePost) && !empty($textDescriptionPost)) {
            echo "Все загружено!";
        } else {
            echo "Наименование и описание обязательно к заполнению!";
        }
    } else {
        echo "Неверный метод запроса";
    }

    // Экранируем строку для использования в SQL
    $img = '\\assets\\web-notise\\imgnotise\\' . $newFileName;

    // Создание соединения
    $conn = new mysqli($servername, $username, $password, $dbname);

    
    // Проверка соединения
    if ($conn->connect_error) {
        die("Ошибка подключения: " . $conn->connect_error);
    }

    // #######################
    $name = $textNamePost;
    $description = $textDescriptionPost;
    $tag = $textTagPost;
    $imgEscaped = addslashes($img);
    $showNotise = $selectedOptionPost;
    // #######################
    
    // SQL-запрос для вставки данных
    
    $sql = "INSERT INTO `notise-table` (`TitleNotise`, `TextNotise`, `TagNotise`, `ImgNotise`, `ViewsNotise`) VALUES ('$name', '$description', '$tag', '$imgEscaped', '$showNotise')";

    // Выполнение запроса
    if ($conn->query($sql) === TRUE) {
        echo "Новая запись успешно добавлена";
    } else {
        echo "Ошибка: " . $sql . "<br>" . $conn->error;
    }


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
        $json_data = json_encode($users, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
        // Запись данных в JSON-файл
        if (file_put_contents("notise-table.json", $json_data)) {
            echo "Данные успешно выгружены в notise-table.json";
        } else {
            echo "Ошибка: " . $sqlSave . "<br>" . $conn->error;
        }
    
    } else {
        echo "Нет данных для выгрузки notise-table.json";
    }


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