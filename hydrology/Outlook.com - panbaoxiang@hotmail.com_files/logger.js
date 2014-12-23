/*! © Microsoft and/or Skype 2014 */
/*globals window, document */

(function (win, doc) {
    'use strict';

    var old_onerror, create_console_function, make_request,
        LOGGER_URL = '[[rendezvous.logger.url]]',
        noOp = function () {};

    if (!win.JSON) {
        win.JSON = {};

        win.JSON.stringify = function (o) {
            var key, is_array = (o && o.constructor === Array), json = [];
            if (typeof o !== 'object' || o === null) {
                return typeof o === 'string' ? '"' + o.replace(/("|\\)/g, '\\$1') + '"' : String(o);
            }
            for (key in o) {
                if (Object.prototype.hasOwnProperty.call(o, key)) {
                    json.push((is_array ? '' : '"' + key + '":') + win.JSON.stringify(o[key]));
                }
            }
            return (is_array ? '[' : '{') + json.join(',') + (is_array ? ']' : '}');
        };
    }

    if (!win.console) {
        win.console = {
            log: noOp,
            info: noOp,
            warn: noOp,
            error: noOp
        };
    }

    if (doc.cookie.indexOf('skyjsenablelogger=1') === -1) {
        return false;
    }

    create_console_function = function (prefix, old_fn) {

        return function () {
            var i, args = Array.prototype.slice.call(arguments),
                arg_strs = [], len = args.length;

            if (len > 0 && /^INFO: /.test(args[0])) {
                args[0] = args[0].substring(6);
                win.console.info.apply(win.console, args);
                return;
            }
            if (len > 0 && /^ERROR: /.test(args[0])) {
                args[0] = args[0].substring(7);
                win.console.error.apply(win.console, args);
                return;
            }
            try {
                if (old_fn) {
                    old_fn.apply(win.console, args);
                }
                for (i = 0; i < len; i += 1) {
                    arg_strs.push(typeof args[i] === 'object' ? win.JSON.stringify(args[i]) : String(args[i]));
                }
                make_request(prefix + arg_strs.join(' '));
            } catch (e) { }
        };
    };

    make_request = function (data) {
        var dummyimg = doc.createElement('img');
        dummyimg.onload = dummyimg.onerror = function () {
            dummyimg = dummyimg.onload = dummyimg.onerror = null;
        };
        dummyimg.src = LOGGER_URL + '?data=' + win.encodeURIComponent(data) + '&t=' + (+new Date());
    };

    win.console.log = create_console_function('LOG', win.console.log || null);
    win.console.info = create_console_function('INFO', win.console.info || null);
    win.console.warn = create_console_function('WARN', win.console.warn || null);
    win.console.error = create_console_function('ERROR', win.console.error || null);

    if (win.onerror) {
        old_onerror = win.onerror;
    }

    win.onerror = function (message, url, line) {
        try {

            if (old_onerror) {
                old_onerror.apply(arguments);
            }
        } catch (e) { }
        return false; // do not supress browser error reporting
    };

}(window, document));