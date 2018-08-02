Демо можно увидеть  [здесь](https://modals.kprod.info/ "modals.kprod.info")

# Использование
**1. Скачайте и установите kmodal**

Скачать и установить файлы Kmodal можно двумя способами: 
1. Скачать файлы из текущего репозитория
2. Или установить с помощью Bower, для этого в терминале введите: `$ bower install kmodal`


**2. Подключите файлы к сайту**

Подключите CSS и JS файлы требующиеся для работы Kmodal в ваш html: 
```html
<!DOCTYPE html>
<html lang="ru">
    <head>
        <link rel="stylesheet" href="path/to/kmodal.css">
    </head>
    <body>

    <button data-modal="#modalId">Открыть окно</button>

    <script src="path/to/kmodal.js"></script>
    </body>
</html>
```


**3. Добавьте базовую разметку модального окна**

После подключения, добавляем базовую разметку нашего модального окна: 
```html
<div class="modal" id="modalId">
    <div class="modal__dialog">
        <div class="modal__content">
            // Ваш контент
        </div>
    </div>
</div>
```
Будьте внимательный, базовая разметка нужна лишь для работоспособности модальных окон, геометрию и внешний вид вы задаёте сами, например текущее окно формируется следующим образом:
```html
<div class="modal" id="modalId">
    <div class="modal__dialog">
        <div class="modal__content">
            <div class="demo-modal">
                // Тут контент
            </div>
        </div>
    </div>
</div>
```
```css
.demo-modal {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    padding: 20px;
    background: #fff;
    color: #000;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
```


**4. Инициализация модального окна**

Пример инициализации модального окна: 
```js
var myModal = new Kmodal(modalId, {
    init: true, // Нужно ли инициализировать окно. По умолчанию true
    escClose: true, // Закрытие окно по нажатию Esc. По умолчанию true
    overlayClose: true, // Закрывать ли окно по нажатию вне области контента окна. По умолчанию true
    effect: 'fadeInTop', // Эффект появления окна. По умолчанию fadeInTop. Возможные значения: fadeInTop, scale
    transition: '', // Время за которое происходит появление окна. По умолчанию 0.4s
    hashOpen: false, // Открывать ли окно по ссылке с хешем, например при переходе по адресу site.ru#start откроется модальное окно start. По умолчанию false
    youtube: {
        id: 0, // id видео с youtube
        autoplay: 0, // нужно ли автоматически включать видео. 1 для включения автопроигрывания при октрытии окна. По умолчанию 0
        rel: 1, // показывать ли похожие видео после завершения текущего. 0 - для скрытия похожих видео. По умолчанию 1
        controls: 1, // показывать ли элементы управления плеером. 0 - для скрытия перемотки, громскости и т.п. По умолчанию 1
        showinfo: 1 // показывать ли заголовок видео. 0 - для скрытия названия видео. По умолчанию 1
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
**modalId**: ceлектор id модального окна
**parameters**: объект с параметрами kmodal, необязательный параметр. 

Метод вернёт инициализированный экземпляр kmodal. 

Для открытия модального окна можно использовать любой элемент на странице, для этого передайте элементу дата атрибут data-modal с селектором id вашего модального окна: 
```html
<button data-modal="#modalId">Открыть окно</button>
```