"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var url = require("url");
var qs = require("qs");
var inspect = require("util").inspect.custom || "inspect";
var protocol = Symbol("protocol");
var slashes = Symbol("slashes");
var port = Symbol("port");
var pathname = Symbol("pathname");
var hash = Symbol("hash");
var query = Symbol("query");
var UrlProps = [
    "protocol",
    "username",
    "password",
    "hostname",
    "port",
    "pathname",
    "search",
    "hash",
    "host",
    "href",
    "origin"
];
function enumerable(target, prop, desc) {
    desc.enumerable = true;
}
var URL = (function () {
    function URL(input, base) {
        base && (input = base + input);
        input ? this.parse(input) : (this[slashes] = true);
    }
    URL.prototype.parse = function (input) {
        var noProtocol = input.slice(0, 2) == "//";
        noProtocol && (input = "http:" + input);
        var urlObj = url.parse(input);
        if (noProtocol && urlObj.port === "443") {
            this[protocol] = "https:";
        }
        else {
            this[protocol] = urlObj.protocol;
        }
        this[slashes] = urlObj.slashes || false;
        var _a = (urlObj.auth || "").split(":"), _b = _a[0], username = _b === void 0 ? "" : _b, _c = _a[1], password = _c === void 0 ? "" : _c;
        this.username = username || "";
        this.password = password || "";
        if (urlObj.host && urlObj.host[0] === "[") {
            this.hostname = "[" + urlObj.hostname + "]";
        }
        else {
            this.hostname = urlObj.hostname || "";
        }
        this[port] = urlObj.port || "";
        this[pathname] = urlObj.pathname || "/";
        this[hash] = urlObj.hash || "";
        this[query] = qs.parse(urlObj.query || "");
    };
    Object.defineProperty(URL.prototype, "protocol", {
        get: function () {
            return this[protocol];
        },
        set: function (value) {
            if (value[value.length - 1] !== ":") {
                value += ":";
            }
            this[protocol] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URL.prototype, "slashes", {
        get: function () {
            return this[slashes];
        },
        set: function (value) {
            this[slashes] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URL.prototype, "auth", {
        get: function () {
            var auth = [];
            this.username && auth.push(this.username);
            this.password && auth.push(this.password);
            return auth.join(":");
        },
        set: function (value) {
            var _a = (value || "").split(":"), _b = _a[0], username = _b === void 0 ? "" : _b, _c = _a[1], password = _c === void 0 ? "" : _c;
            this.username = username;
            this.password = password;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URL.prototype, "port", {
        get: function () {
            if ((this.protocol === "http:" && this[port] === "80") ||
                (this.protocol === "https:" && this[port] === "443")) {
                return "";
            }
            else {
                return this[port];
            }
        },
        set: function (value) {
            this[port] = String(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URL.prototype, "pathname", {
        get: function () {
            return this[pathname];
        },
        set: function (value) {
            if (value[0] !== "/") {
                value = "/" + value;
            }
            this[pathname] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URL.prototype, "host", {
        get: function () {
            return this.hostname + (this.port ? ":" + this.port : "");
        },
        set: function (value) {
            var _a = this, protocol = _a.protocol, slashes = _a.slashes;
            var urlObj = url.parse(protocol + (slashes ? "//" : "") + value);
            if (urlObj.host && urlObj.host[0] === "[") {
                this.hostname = "[" + urlObj.hostname + "]";
            }
            else {
                this.hostname = urlObj.hostname || "";
            }
            this.port = urlObj.port || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URL.prototype, "search", {
        get: function () {
            return qs.stringify(this.query, { addQueryPrefix: true });
        },
        set: function (value) {
            this.query = qs.parse(value, { ignoreQueryPrefix: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URL.prototype, "hash", {
        get: function () {
            return this[hash];
        },
        set: function (value) {
            if (value[0] !== "#") {
                value = "#" + value;
            }
            this[hash] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URL.prototype, "query", {
        get: function () {
            return this[query];
        },
        set: function (value) {
            this[query] = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URL.prototype, "origin", {
        get: function () {
            return this.protocol + (this[slashes] ? "//" : "") + this.host;
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
                this.pathname = (i !== -1 ? value.slice(0, i) : value) || "";
                this.search = i !== -1 ? value.slice(i) : "";
            }
            else {
                this.pathname = "";
                this.search = "";
            }
        },
        enumerable: true,
        configurable: true
    });
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
    URL.prototype.toString = function () {
        var href = this.protocol || "";
        this[slashes] && (href += "//");
        this.auth && (href += this.auth + "@");
        this.host && (href += this.host);
        this.path && (href += this.path);
        this.hash && (href += this.hash);
        return href;
    };
    URL.prototype.toJSON = function () {
        return this.toString();
    };
    URL.prototype[inspect] = function () {
        var url = new (function URL() { });
        for (var _i = 0, UrlProps_1 = UrlProps; _i < UrlProps_1.length; _i++) {
            var prop = UrlProps_1[_i];
            url[prop] = this[prop];
        }
        return url;
    };
    __decorate([
        enumerable
    ], URL.prototype, "protocol", null);
    __decorate([
        enumerable
    ], URL.prototype, "port", null);
    __decorate([
        enumerable
    ], URL.prototype, "pathname", null);
    __decorate([
        enumerable
    ], URL.prototype, "host", null);
    __decorate([
        enumerable
    ], URL.prototype, "search", null);
    __decorate([
        enumerable
    ], URL.prototype, "hash", null);
    __decorate([
        enumerable
    ], URL.prototype, "origin", null);
    __decorate([
        enumerable
    ], URL.prototype, "href", null);
    return URL;
}());
exports.URL = URL;
exports.default = URL;
//# sourceMappingURL=index.js.map