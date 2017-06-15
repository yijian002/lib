;
(function(factory, window) {
        if (typeof define === "function" && define.amd) {
            define('comm', factory);
        } else {
            window.comm = factory();
        }
    }
    (function() {

        'use strict';

        return {
            mergeArr: function() {
                return Array.prototype.concat.apply([], arguments);
            },
            getUrlParam: function(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
                    r = window.location.search;

                r = r.substr(1).match(reg);
                if (r !== null) {
                    return unescape(r[2]);
                }
                return null;
            },
            zero: function(v) {
                return v < 10 ? ('0' + v) : v;
            },
            getDate: function(int_time, type) {
                int_time = String(int_time).substr(0, 13);
                int_time = new Date(Number(int_time));

                var year = int_time.getFullYear(),
                    month = int_time.getMonth() + 1,
                    day = int_time.getDate(),
                    hour = int_time.getHours(),
                    minute = int_time.getMinutes(),
                    s = int_time.getSeconds();

                var _z = this.zero;

                switch (type) {
                    case 'MDHMS':
                        int_time = _z(month) + '/' + _z(day) + ' ' + _z(hour) + ':' + _z(minute) + ':' + _z(s);
                        break;
                    case 'MDHM':
                        int_time = _z(month) + '/' + _z(day) + ' ' + _z(hour) + ':' + _z(minute);
                        break;
                    case 'MDHM-UT':
                        int_time = _z(month) + '月' + _z(day) + '日 ' + _z(hour) + ':' + _z(minute);
                        break;
                    case 'MD':
                        int_time = _z(month) + '-' + _z(day);
                        break;
                    case 'HM':
                        int_time = _z(hour) + ':' + _z(minute);
                        break;
                    case 'HMS':
                        int_time = _z(hour) + ':' + _z(minute) + ':' + _z(s);
                        break;
                    default:
                        int_time = year + '-' + _z(month) + '-' + _z(day) + ' ' + _z(hour) + ':' + _z(minute) + ':' + _z(s);
                }

                return int_time;
            },
            formatTime: function(time_int) {
                var s = Math.floor((time_int / 1000) % 60),
                    i = Math.floor((time_int / 1000 / 60) % 60),
                    h = Math.floor((time_int / 1000 / 60 / 60) % 24);

                var _z = this.zero;

                return { hour: _z(h), mit: _z(i), sec: _z(s) };
            },
            ptime: function(ptime) {
                ptime = this.formatTime(ptime * 1000);
                return ptime.hour + ':' + ptime.mit + ':' + ptime.sec;
            },
            rtime: function($rtime, callback) {
                var _this = this,
                    time_interval = null,
                    end_time = 0,
                    hs_int = 100;

                function _update() {
                    var t = _rtime();
                    $rtime.text(t.m + ':' + t.s + ':' + t.hs);

                    return t.t;
                }

                function _rtime() {
                    var total = end_time - new Date().getTime();
                    total = total < 0 ? 0 : total;

                    var rtime = _this.formatTime(total),
                        seconds = rtime.sec,
                        minutes = rtime.mit;

                    if (hs_int <= 0) {
                        hs_int = 100;
                    }
                    hs_int = hs_int - 2;

                    return {
                        t: total,
                        m: minutes,
                        s: seconds,
                        hs: hs_int < 10 ? ('0' + hs_int) : hs_int
                    };
                }

                (function() {
                    end_time = new Date().getTime() + Number($rtime.data('rtime'));
                    _update();

                    time_interval = setInterval(function() {
                        var total = _update();
                        if (total <= 0) {
                            clearInterval(time_interval);
                            if (callback) {
                                callback();
                            }
                        }
                    }, 20);
                }());
            }
        };

    }, window));
