# Использование
**1. Скачать и установить файлы Kmodal можно двумя способами:**
1. Скачать файлы из текущего репозитория
2. Установить Kmodal с помощью Bower: `$ bower install kmodal`

**2. Подключите Kmodal к вашему сайту**
```html
<html lang="ru">
<head>
    <link rel="stylesheet" href="path/to/kmodal.css">
</head>
<body>
    <script src="path/to/kmodal.js"></script>
</body>
</html>
```

**3. Добавьте базовую разметку модального окна**
```html
<button data-modal="#modalId">Открыть окно</button>
<div class="modal" id="modalId">
    <div class="modal__dialog">
        <div class="modal__content">
            <div class="your-any-class">
                // Контент модального окна
            </div>
        </div>
    </div>
</div>
```

**4. Инициализируем модальное окно**
```js
new Kmodal('#modalId', {
    init: true, // нужно ли инициализировать окно(true/false)
    escClose: true, // Закрытие окно по нажатию Esc(true/false)
    overlayClose: true, // Закрывать ли окно по нажатию вне области контента окна(true/false)
    effect: 'scale', // Эффект появления окна(scale/fadeInTop)
    transition: '', // Время за которое происходит появление окна, например: 1s(по умолчанию: .4s)
    hashOpen: false, // Открывать ли окно по ссылке с хешем(true/false), например при переходе по адресу site.ru#start откроется модальное окно #start
    youtube: {
        id: 0, // id видео с youtube(string)
        autoplay: 0, // нужно ли автоматически включать видео при открытии окна(0/1)
        rel: 1, // показывать ли похожие видео после завершения текущего(0/1)
        controls: 1, // показывать ли элементы управления плеером(0/1)
        showinfo: 1 // показывать ли заголовок видео(0/1)
    },
    on: {
        open: function() {
            // коллбек при открытии модального окна
        },
        close: function() {
            // коллбек при закрытии модального окна
        }
    }
});
```