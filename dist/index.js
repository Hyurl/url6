"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = require("url");
var qs = require("qs");
var inspect = require("util").inspect.custom || "inspect";
var UrlProps = [
    "href",
    "protocol",
    "slashes",
    "auth",
    "username",
    "password",
    "host",
    "hostname",
    "port",
    "origin",
    "path",
    "pathname",
    "search",
    "query",
    "hash"
];
var URL = (function () {
    function URL(input) {
        if (input)
            this.parse(input);
        else
            this.slashes = true;
    }
    URL.prototype.parse = function (input) {
        var noProtocol = input.slice(0, 2) == "//";
        if (noProtocol)
            input = "http:" + input;
        var urlObj = url.parse(input);
        this.protocol = !noProtocol && urlObj.protocol || undefined;
        this.slashes = urlObj.slashes || false;
        this.auth = urlObj.auth || undefined;
        this.host = urlObj.host || undefined;
        this.path = urlObj.path || undefined;
        this.hash = urlObj.hash || undefined;
    };
    Object.defineProperty(URL.prototype, "href", {
        get: function () {
            return this.toString();
        },
        set: function (value) {
            this.parse(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URL.prototype, "auth", {
        get: function () {
            var str;
            if (this.username) {
                str = this.username;
                if (this.password)
                    str += ":" + this.password;
            }
            return str;
        },
        set: function (value) {
            if (typeof value == "string") {
                var pair = value.split(":");
                this.username = pair[0];
                this.password = pair[1];
            }
            else {
                this.username = undefined;
                this.password = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URL.prototype, "origin", {
        get: function () {
            return (this.protocol || "")
                + (this.slashes ? "//" : "")
                + (this.host || "");
        },
        set: function (value) {
            var matches = value && value.match(/(.+?:)\/\/(.+)|(.+?:)(.+)/);
            if (matches) {
                this.protocol = matches[1] || matches[3];
                this.host = matches[2] || matches[4];
            }
            else {
                this.protocol = undefined;
                this.host = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URL.prototype, "host", {
        get: function () {
            var host = this.hostname;
            if (this.port && this.port !== 80)
                host += ":" + this.port;
            return host;
        },
        set: function (value) {
            var matches = value && value.match(/\[(.+)\]:(\d+)|(.+):(\d+)|(.+)/);
            if (matches) {
                this.hostname = matches[1] || matches[3] || matches[5];
                this.port = parseInt(matches[2] || matches[4]) || undefined;
            }
            else {
                this.hostname = undefined;
                this.port = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URL.prototype, "path", {
        get: function () {
            return (this.pathname || "") + (this.search || "");
        },
        set: function (value) {
            if (value && typeof value == "string") {
                var i = value.indexOf("?");
                this.pathname = (i !== -1 ? value.slice(0, i) : value) || undefined;
                this.search = i !== -1 ? value.slice(i) : undefined;
            }
            else {
                this.pathname = undefined;
                this.search = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URL.prototype, "search", {
        get: function () {
            return this.query ? ("?" + qs.stringify(this.query)) : undefined;
        },
        set: function (value) {
            this.query = value ? qs.parse(value, {
                ignoreQueryPrefix: true
            }) : null;
        },
        enumerable: true,
        configurable: true
    });
    URL.prototype.toString = function () {
        var href = this.protocol || "";
        if (this.slashes)
            href += "//";
        if (this.auth)
            href += this.auth + "@";
        if (this.host)
            href += this.host;
        if (this.path)
            href += this.path;
        if (this.hash)
            href += this.hash;
        return href;
    };
    URL.prototype.toJSON = function () {
        return this.toString();
    };
    URL.prototype[inspect] = function () {
        var res = new (function URL() { });
        for (var _i = 0, UrlProps_1 = UrlProps; _i < UrlProps_1.length; _i++) {
            var prop = UrlProps_1[_i];
            res[prop] = this[prop];
        }
        return res;
    };
    return URL;
}());
exports.URL = URL;
exports.default = URL;
//# sourceMappingURL=index.js.map