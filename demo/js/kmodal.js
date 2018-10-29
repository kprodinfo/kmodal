var Events = {
        CLICK: 'click',
        KEY_DOWN: 'keydown',
        MOUSE_UP: 'mouseup',
        OPEN: 'open',
        CLOSE: 'close'
    },
    ClassList = {
        ACTIVE: 'modal_active',
        BODY_ACTIVE: 'modal-open',
        SCALE: 'modal__content--scale',
        FADEINTOP: 'modal__content--fadeInTop'
    },
    Selectors = {
        b: $('body'),
        d: $(document),
        modal: '.modal',
        content: '.modal__content',
        closeEl: '[data-role="modal-close"]',
        youtubeIframe: '.kmodal-youtube-iframe'
    };

function Kmodal(modal, options) {
    // Defaults
    var DEFAULT_OPTIONS = {
            init: true,
            escClose: true,
            overlayClose: true,
            effect: 'fadeInTop',
            transition: '.4s',
            hashOpen: false,
            youtube: {
                id: 0,
                autoplay: 0,
                rel: 1,
                controls: 1,
                showinfo: 1
            },
            on: {
                open: function () {
                    
                },
                close: function () {

                }
            },
            thisOpenElem: ''
        },
        PRIVATE_OPTIONS = {
            status: false,
            youtubeSettings: {
                link: function ($id) {
                    return 'https://www.youtube.com/embed/' + $id + '?autoplay=' + DEFAULT_OPTIONS.youtube.autoplay + '&amp;rel=' + DEFAULT_OPTIONS.youtube.rel + '&amp;controls=' + DEFAULT_OPTIONS.youtube.controls + '&amp;showinfo=' + DEFAULT_OPTIONS.youtube.showinfo;
                },
                empty: '//about:blank',
                markup: '<iframe class="kmodal-youtube-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>'
            }
        };
    this.modal = $(modal);
    this.openEl = $('[data-modal="' + modal + '"]');
    this.closeEl = $(Selectors.closeEl, this.modal);
    this.content = $($(Selectors.content).children(), this.modal);
    this._events_open = [];
    this._events_close = [];
    this.options = $.extend(DEFAULT_OPTIONS, options, PRIVATE_OPTIONS);

    if (typeof(options) === "object" && typeof(options.on) === "object") {
        if (typeof(options.on.open) === "function") {
            this._events_open.push(options.on.open);
        }
        if (typeof(options.on.close) === "function") {
            this._events_close.push(options.on.close);
        }
    }
    if (this.options.init) {
        this.init();
    }
}

Kmodal.prototype.init = function () {
    var _this = this;
    $($(_this.openEl).parent()).on(Events.CLICK, _this.openEl, function () {
        _this.open(this);
    });
    $(_this.closeEl).on(Events.CLICK, function () {
        _this.close();
    });
    if (_this.options.hashOpen) {
        var link = window.location.href,
            link = link.split('#');
        if (_this.modal.attr('id') === link[1]) {
            _this.open();
        }
    }
    if (_this.options.youtube.id !== 0) {
        _this.on(Events.OPEN, function () {
            $(Selectors.content, _this.modal).append(_this.options.youtubeSettings.markup);
            $(Selectors.youtubeIframe, _this.modal).attr('src', _this.options.youtubeSettings.link(_this.options.youtube.id));
        });
        _this.on(Events.CLOSE, function () {
            $(Selectors.youtubeIframe, _this.modal).remove();
        });
    }

    if (_this.options.transition !== '') {
        _this.content.css({
            transition: this.options.transition
        });
    }

    if (_this.options.effect === 'scale') {
        _this.content.addClass(ClassList.SCALE);
    }

    if (_this.options.effect === 'fadeInTop') {
        _this.content.addClass(ClassList.FADEINTOP);
    }

    if (_this.options.escClose) {
        Selectors.d.on(Events.KEY_DOWN, function (e) {
            if (e.keyCode === 27) {
                if (_this.options.status) {
                    _this.close();
                }
            }
        });
    }
    if (_this.options.overlayClose) {
        Selectors.d.on(Events.MOUSE_UP, function (e) {
            if (_this.options.status) {
                if (!$(_this.content).is(e.target) && $(_this.content).has(e.target).length === 0) {
                    _this.close();
                }
            }
        });
    }
};

Kmodal.prototype.open = function (selector) {
    $(Selectors.modal).removeClass(ClassList.ACTIVE); // Закрываем все окна перед открытием нового
    this.modal.addClass(ClassList.ACTIVE); // Открываем окно которое запросили
    Selectors.b.addClass(ClassList.BODY_ACTIVE); // Добавляем класс для боди

    if (Selectors.d.outerHeight() > $(window).outerHeight()) { // Смотрим, нужно ли добавлять отступ вместо скроллбара
        Selectors.b.css('padding-right', this.scrollBarWidth);
    }

    this.options.status = true; // Ставим статус, что текущее окно открыто
    this.options.thisOpenElem = selector; // /Отдаём элемент, с которого было открыто окно

    this._events_open.map(function (e) { // Выполняем коллбеки
        e();
    });
};

Kmodal.prototype.close = function () {
    this.modal.removeClass(ClassList.ACTIVE); // Закрываем текущее окно
    Selectors.b.removeClass(ClassList.BODY_ACTIVE).css('padding-right', ''); // Убираем класс с боди и сбрасываем паддинг
    this.options.status = false; // Ставим статус, что текущее окно закрыто
    this._events_close.map(function (e) { // Выполняем коллбеки
        e();
    });
};

Kmodal.prototype.scrollBarWidth = function () { // Узнаём ширину скрообара
    var newBlock = $('<div>').css({'height': '50px', 'width': '50px'}),
        indicator = $('<div>').css({'height': '200px'}),
        scrollBarWith = '';
    Selectors.b.append(newBlock.append(indicator));
    scrollBarWith = $('div', newBlock).innerWidth();
    newBlock.css('overflow-y', 'scroll');
    scrollBarWith -= $('div', newBlock).innerWidth();
    $(newBlock).remove();
    return (scrollBarWith + 'px');
};

Kmodal.prototype.status = function () { // Возвращает, открыто ли запрошенное окно
    return this.options.status;
};

Kmodal.prototype.getSelector = function () { // Возвращает элемент, через который открыли окно
    return this.options.thisOpenElem;
};

Kmodal.prototype.on = function (event, f) {
    switch (event) {
        case "open":
            this._events_open.push(f);
            break;

        case "close":
            this._events_close.push(f);
            break;
    }
};