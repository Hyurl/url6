import "source-map-support/register";
import * as url from "url";
import * as qs from "qs";

const UrlProps = [
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

export class URL {
    /** with trailing `:`. */
    protocol: string;
    /** wheter `//` appears after the `protocol`. */
    slashes: boolean;
    username: string;
    password: string;
    /** without trailing `port` number. */
    hostname: string;
    port: number;
    /** without trailing `search` string. */
    pathname: string;
    /** parsed by [qs](https://www.npmjs.com/package/qs) module. */
    query: { [key: string]: string };
    hash: string;

    constructor(input?: string) {
        if (input) this.parse(input);
        else this.slashes = true;
    }

    protected parse(input: string) {
        let noProtocol = input.slice(0, 2) == "//";
        if (noProtocol) input = "http:" + input;

        let urlObj = url.parse(input);

        this.protocol = !noProtocol && urlObj.protocol || undefined;
        this.slashes = urlObj.slashes || false;
        this.auth = urlObj.auth || undefined;
        this.host = urlObj.host || undefined;
        this.path = urlObj.path || undefined;
        this.hash = urlObj.hash || undefined;
    }

    get href(): string {
        return this.toString();
    }

    set href(value) {
        this.parse(value);
    }

    get auth(): string {
        let str: string;
        if (this.username) {
            str = this.username;
            if (this.password)
                str += ":" + this.password;
        }
        return str;
    }

    set auth(value) {
        if (typeof value == "string") {
            let pair = value.split(":");
            this.username = pair[0];
            this.password = pair[1];
        } else {
            this.username = undefined;
            this.password = undefined;
        }
    }

    get origin(): string {
        return (this.protocol || "")
            + (this.slashes ? "//" : "")
            + (this.host || "");
    }

    set origin(value) {
        let matches = value && value.match(/(.+?:)\/\/(.+)|(.+?:)(.+)/);
        if (matches) {
            this.protocol = matches[1] || matches[3];
            this.host = matches[2] || matches[4];
        } else {
            this.protocol = undefined;
            this.host = undefined;
        }
    }

    get host(): string {
        let host = this.hostname;
        if(this.port && this.port !== 80) host += ":" + this.port;
        return host;
    }

    set host(value) {
        let matches = value && value.match(/\[(.+)\]:(\d+)|(.+):(\d+)|(.+)/);
        if (matches) {
            this.hostname = matches[1] || matches[3] || matches[5];
            this.port = parseInt(matches[2] || matches[4]) || undefined;
        } else {
            this.hostname = undefined;
            this.port = undefined;
        }
    }

    get path(): string {
        return (this.pathname || "") + (this.search || "");
    }

    set path(value) {
        if (value && typeof value == "string") {
            let i = value.indexOf("?");
            this.pathname = (i !== -1 ? value.slice(0, i) : value) || undefined;
            this.search = i !== -1 ? value.slice(i) : undefined;
        } else {
            this.pathname = undefined;
            this.search = undefined;
        }
    }

    get search() {
        return this.query ? ("?" + qs.stringify(this.query)) : undefined;
    }

    set search(value) {
        this.query = value ? qs.parse(value, {
            ignoreQueryPrefix: true
        }) : null;
    }

    toString() {
        let href = this.protocol || "";

        if (this.slashes) href += "//";
        if (this.auth) href += this.auth + "@";
        if (this.host) href += this.host;
        if (this.path) href += this.path;
        if (this.hash) href += this.hash;

        return href;
    }

    toJSON() {
        return this.toString();
    }

    protected inspect() {
        let res = new (class URL {});
        for (let prop of UrlProps) {
            res[prop] = this[prop];
        }
        return res;
    }
}