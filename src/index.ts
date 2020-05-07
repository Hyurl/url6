import * as url from "url";
import * as qs from "qs";

const inspect: symbol | string = require("util").inspect.custom || "inspect";
const protocol = Symbol("protocol");
const slashes = Symbol("slashes");
const port = Symbol("port");
const pathname = Symbol("pathname");
const hash = Symbol("hash");
const query = Symbol("query");

const UrlProps = [
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

function enumerable(target: any, prop: string, desc: PropertyDescriptor) {
    desc.enumerable = true;
}

export class URL {
    username: string;
    password: string;
    hostname: string;

    constructor(input?: string, base?: string) {
        base && (input = base + input);
        input ? this.parse(input) : (this[slashes] = true);
    }

    protected parse(input: string) {
        let noProtocol = input.slice(0, 2) == "//";
        noProtocol && (input = "http:" + input)

        let urlObj = url.parse(input);

        if (noProtocol && urlObj.port === "443") {
            this[protocol] = "https:";
        } else {
            this[protocol] = urlObj.protocol;
        }

        this[slashes] = urlObj.slashes || false;

        let [username = "", password = ""] = (urlObj.auth || "").split(":");
        this.username = username || "";
        this.password = password || "";

        if (urlObj.host && urlObj.host[0] === "[") {
            this.hostname = "[" + urlObj.hostname + "]";
        } else {
            this.hostname = urlObj.hostname || "";
        }

        this[port] = urlObj.port || "";
        this[pathname] = urlObj.pathname || "/";
        this[hash] = urlObj.hash || "";
        this[query] = qs.parse(urlObj.query || "");
    }

    @enumerable
    get protocol(): string {
        return this[protocol];
    }
    set protocol(value) {
        if (value[value.length - 1] !== ":") {
            value += ":";
        }

        this[protocol] = value;
    }

    get slashes(): boolean {
        return this[slashes];
    }
    set slashes(value) {
        this[slashes] = value;
    }

    get auth(): string {
        let auth: string[] = [];

        this.username && auth.push(this.username);
        this.password && auth.push(this.password);
        return auth.join(":");
    }
    set auth(value) {
        let [username = "", password = ""] = (value || "").split(":");
        this.username = username;
        this.password = password;
    }

    @enumerable
    get port(): string {
        if ((this.protocol === "http:" && this[port] === "80") ||
            (this.protocol === "https:" && this[port] === "443")) {
            return "";
        } else {
            return this[port];
        }
    }
    set port(value) {
        this[port] = String(value);
    }

    @enumerable
    get pathname(): string {
        return this[pathname];
    }
    set pathname(value) {
        if (value[0] !== "/") {
            value = "/" + value;
        }

        this[pathname] = value;
    }

    @enumerable
    get host(): string {
        return this.hostname + (this.port ? ":" + this.port : "");
    }
    set host(value) {
        let { protocol, slashes } = this;
        let urlObj = url.parse(protocol + (slashes ? "//" : "") + value);

        if (urlObj.host && urlObj.host[0] === "[") {
            this.hostname = "[" + urlObj.hostname + "]";
        } else {
            this.hostname = urlObj.hostname || "";
        }

        this.port = urlObj.port || "";
    }

    @enumerable
    get search(): string {
        return qs.stringify(this.query, { addQueryPrefix: true });
    }
    set search(value) {
        this.query = qs.parse(value, { ignoreQueryPrefix: true });
    }

    @enumerable
    get hash(): string {
        return this[hash];
    }
    set hash(value) {
        if (value[0] !== "#") {
            value = "#" + value;
        }

        this[hash] = value;
    }

    get query(): qs.ParsedQs {
        return this[query];
    }
    set query(value) {
        this[query] = value;
    }

    /**
     * @readonly
     */
    @enumerable
    get origin(): string {
        return this.protocol + (this[slashes] ? "//" : "") + this.host;
    }

    get path(): string {
        return (this.pathname || "") + (this.search || "");
    }
    set path(value) {
        if (value && typeof value == "string") {
            let i = value.indexOf("?");
            this.pathname = (i !== -1 ? value.slice(0, i) : value) || "";
            this.search = i !== -1 ? value.slice(i) : "";
        } else {
            this.pathname = "";
            this.search = "";
        }
    }

    @enumerable
    get href(): string {
        return this.toString();
    }
    set href(value) {
        this.parse(value);
    }

    toString() {
        let href = this.protocol || "";

        this[slashes] && (href += "//")
        this.auth && (href += this.auth + "@")
        this.host && (href += this.host)
        this.path && (href += this.path)
        this.hash && (href += this.hash)

        return href;
    }

    toJSON() {
        return this.toString();
    }

    protected [inspect]() {
        let url = new (function URL() { });

        for (let prop of UrlProps) {
            url[prop] = this[prop];
        }

        return url;
    }
}

export default URL;