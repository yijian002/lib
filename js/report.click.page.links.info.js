(function(window) {

    'use strict';

    var PAGE_URL = window.location.href;

    var app = {
        log: function(json) {
            if (typeof json === 'string') {
                json = JSON.parse(json);
            }

            if (window.console && window.console.table) {
                window.console.table([json]);
            }
        },
        delegate: function(parent, eventType, selector, fn) {
            if (typeof parent === 'string') {
                var parent = document.getElementById(parent);
                !parent && window.console.error('parent not found');
            }

            if (typeof selector !== 'string') {
                window.console.error('selector is not string');
                return;
            }

            if (typeof fn !== 'function') {
                window.console.error('fn is not function');
                return;
            }

            function handle(e) {
                var evt = window.event ? window.event : e;
                var target = evt.target || evt.srcElement;

                if (target.tagName === 'A') {
                    fn.call(target);
                    return;
                }

                if (evt.path.length) {
                    for (var i = 0, len = evt.path.length; i < len; i++) {
                        if (evt.path[i].tagName === 'A') {
                            fn.call(evt.path[i]);
                            break;
                        }
                    }
                }
            }

            parent[eventType] = handle;
        },
        bind: function() {
            var _this = this,
                json = { pageUrl: PAGE_URL };

            this.delegate(document.body, 'onclick', 'a', function(event) {
                event = event || window.event;

                json.link = this.href;
                json.title = this.innerHTML.replace(/<[^>]+>/g, '').replace(/\s+/g, '');
                json.position = event.pageX + ',' + event.pageY;

                _this.log(json);
            });
        },
        init: function() {
            this.bind();
        }
    };

    app.init();

}(window));
