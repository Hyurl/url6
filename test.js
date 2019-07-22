const URL = require("./").default;
const assert = require("assert");
var inspect = require("util").inspect.custom || "inspect";

describe("new URL()", function () {
    it("http://localhost", () => {
        var url = new URL("http://localhost");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "http:",
            username: "",
            password: "",
            hostname: "localhost",
            port: "",
            pathname: "/",
            search: "",
            hash: "",
            host: "localhost",
            origin: "http://localhost",
            href: "http://localhost/",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "");
        assert.strictEqual(url.path, "/");
        assert.deepStrictEqual(url.query, {});
    });

    it("//localhost", () => {
        var url = new URL("//localhost");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "http:",
            username: "",
            password: "",
            hostname: "localhost",
            port: "",
            pathname: "/",
            search: "",
            hash: "",
            host: "localhost",
            origin: "http://localhost",
            href: "http://localhost/",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "");
        assert.strictEqual(url.path, "/");
        assert.deepStrictEqual(url.query, {});
    });

    it("mysql:127.0.0.1:6379", () => {
        var url = new URL("mysql:127.0.0.1:6379");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "mysql:",
            username: "",
            password: "",
            hostname: "127.0.0.1",
            port: "6379",
            pathname: "/",
            search: "",
            hash: "",
            host: "127.0.0.1:6379",
            origin: "mysql:127.0.0.1:6379",
            href: "mysql:127.0.0.1:6379/",
        });
        assert.strictEqual(url.slashes, false);
        assert.strictEqual(url.auth, "");
        assert.strictEqual(url.path, "/");
        assert.deepStrictEqual(url.query, {});
    });

    it("http://localhost/", () => {
        var url = new URL("http://localhost/");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "http:",
            username: "",
            password: "",
            hostname: "localhost",
            port: "",
            pathname: "/",
            search: "",
            hash: "",
            host: "localhost",
            origin: "http://localhost",
            href: "http://localhost/",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "");
        assert.strictEqual(url.path, "/");
        assert.deepStrictEqual(url.query, {});
    });

    it("http://localhost:80", () => {
        var url = new URL("http://localhost:80");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "http:",
            username: "",
            password: "",
            hostname: "localhost",
            port: "",
            pathname: "/",
            search: "",
            hash: "",
            host: "localhost",
            origin: "http://localhost",
            href: "http://localhost/",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "");
        assert.strictEqual(url.path, "/");
        assert.deepStrictEqual(url.query, {});
    });

    it("http://localhost:443", () => {
        var url = new URL("http://localhost:443");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "http:",
            username: "",
            password: "",
            hostname: "localhost",
            port: "443",
            pathname: "/",
            search: "",
            hash: "",
            host: "localhost:443",
            origin: "http://localhost:443",
            href: "http://localhost:443/",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "");
        assert.strictEqual(url.path, "/");
        assert.deepStrictEqual(url.query, {});
    });

    it("https://localhost", () => {
        var url = new URL("https://localhost");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "",
            password: "",
            hostname: "localhost",
            port: "",
            pathname: "/",
            search: "",
            hash: "",
            host: "localhost",
            origin: "https://localhost",
            href: "https://localhost/",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "");
        assert.strictEqual(url.path, "/");
        assert.deepStrictEqual(url.query, {});
    });

    it("//localhost:443", () => {
        var url = new URL("//localhost:443");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "",
            password: "",
            hostname: "localhost",
            port: "",
            pathname: "/",
            search: "",
            hash: "",
            host: "localhost",
            origin: "https://localhost",
            href: "https://localhost/",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "");
        assert.strictEqual(url.path, "/");
        assert.deepStrictEqual(url.query, {});
    });

    it("https://localhost:443", () => {
        var url = new URL("https://localhost:443");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "",
            password: "",
            hostname: "localhost",
            port: "",
            pathname: "/",
            search: "",
            hash: "",
            host: "localhost",
            origin: "https://localhost",
            href: "https://localhost/",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "");
        assert.strictEqual(url.path, "/");
        assert.deepStrictEqual(url.query, {});
    });

    it("https://localhost:80", () => {
        var url = new URL("https://localhost:80");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "",
            password: "",
            hostname: "localhost",
            port: "80",
            pathname: "/",
            search: "",
            hash: "",
            host: "localhost:80",
            origin: "https://localhost:80",
            href: "https://localhost:80/",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "");
        assert.strictEqual(url.path, "/");
        assert.deepStrictEqual(url.query, {});
    });

    it("http://ayonly@localhost", () => {
        var url = new URL("http://ayonly@localhost");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "http:",
            username: "ayonly",
            password: "",
            hostname: "localhost",
            port: "",
            pathname: "/",
            search: "",
            hash: "",
            host: "localhost",
            origin: "http://localhost",
            href: "http://ayonly@localhost/",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "ayonly");
        assert.strictEqual(url.path, "/");
        assert.deepStrictEqual(url.query, {});
    });

    it("http://ayonly:190711@localhost", () => {
        var url = new URL("http://ayonly:190711@localhost");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "http:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "",
            pathname: "/",
            search: "",
            hash: "",
            host: "localhost",
            origin: "http://localhost",
            href: "http://ayonly:190711@localhost/",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "ayonly:190711");
        assert.strictEqual(url.path, "/");
        assert.deepStrictEqual(url.query, {});
    });

    it("http://ayonly:190711@localhost/index.html", () => {
        var url = new URL("http://ayonly:190711@localhost/index.html");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "http:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "",
            pathname: "/index.html",
            search: "",
            hash: "",
            host: "localhost",
            origin: "http://localhost",
            href: "http://ayonly:190711@localhost/index.html",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "ayonly:190711");
        assert.strictEqual(url.path, "/index.html");
        assert.deepStrictEqual(url.query, {});
    });

    it("http://ayonly:190711@localhost/index.html?lang=en-US", () => {
        var url = new URL("http://ayonly:190711@localhost/index.html?lang=en-US");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "http:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "",
            host: "localhost",
            origin: "http://localhost",
            href: "http://ayonly:190711@localhost/index.html?lang=en-US",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "ayonly:190711");
        assert.strictEqual(url.path, "/index.html?lang=en-US");
        assert.deepStrictEqual(url.query, { lang: "en-US" });
    });

    it("http://ayonly:190711@localhost/index.html?lang=en-US#id", () => {
        var url = new URL("http://ayonly:190711@localhost/index.html?lang=en-US#id");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "http:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "localhost",
            origin: "http://localhost",
            href: "http://ayonly:190711@localhost/index.html?lang=en-US#id",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "ayonly:190711");
        assert.strictEqual(url.path, "/index.html?lang=en-US");
        assert.deepStrictEqual(url.query, { lang: "en-US" });
    });

    it("http://ayonly:190711@[::1]/index.html?lang=en-US#id", () => {
        var url = new URL("http://ayonly:190711@[::1]/index.html?lang=en-US#id");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "http:",
            username: "ayonly",
            password: "190711",
            hostname: "[::1]",
            port: "",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "[::1]",
            origin: "http://[::1]",
            href: "http://ayonly:190711@[::1]/index.html?lang=en-US#id",
        });
        assert.strictEqual(url.slashes, true);
        assert.strictEqual(url.auth, "ayonly:190711");
        assert.strictEqual(url.path, "/index.html?lang=en-US");
        assert.deepStrictEqual(url.query, { lang: "en-US" });
    });

    it("http://ayonly:190711@[::1]:80/index.html?lang=en-US#id", () => {
        var url = new URL("http://ayonly:190711@[::1]:80/index.html?lang=en-US#id");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "http:",
            username: "ayonly",
            password: "190711",
            hostname: "[::1]",
            port: "",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "[::1]",
            origin: "http://[::1]",
            href: "http://ayonly:190711@[::1]/index.html?lang=en-US#id",
        });
    });

    it("https://ayonly:190711@[::1]/index.html?lang=en-US#id", () => {
        var url = new URL("https://ayonly:190711@[::1]/index.html?lang=en-US#id");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "[::1]",
            port: "",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "[::1]",
            origin: "https://[::1]",
            href: "https://ayonly:190711@[::1]/index.html?lang=en-US#id",
        });
    });

    it("https://ayonly:190711@[::1]:443/index.html?lang=en-US#id", () => {
        var url = new URL("https://ayonly:190711@[::1]:443/index.html?lang=en-US#id");

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "[::1]",
            port: "",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "[::1]",
            origin: "https://[::1]",
            href: "https://ayonly:190711@[::1]/index.html?lang=en-US#id",
        });
    });
});

describe("Manipulation", () => {
    it("should change the protocol", () => {
        var url = new URL("https://ayonly:190711@[::1]:443/index.html?lang=en-US#id");

        url.protocol = "http:"

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "http:",
            username: "ayonly",
            password: "190711",
            hostname: "[::1]",
            port: "443",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "[::1]:443",
            origin: "http://[::1]:443",
            href: "http://ayonly:190711@[::1]:443/index.html?lang=en-US#id",
        });

        url.protocol = "https"

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "[::1]",
            port: "",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "[::1]",
            origin: "https://[::1]",
            href: "https://ayonly:190711@[::1]/index.html?lang=en-US#id",
        });
    });

    it("should change the username", () => {
        var url = new URL("https://ayonly:190711@[::1]:443/index.html?lang=en-US#id");

        url.username = "ayonly@gmail.com"

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly@gmail.com",
            password: "190711",
            hostname: "[::1]",
            port: "",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "[::1]",
            origin: "https://[::1]",
            href: "https://ayonly@gmail.com:190711@[::1]/index.html?lang=en-US#id",
        });
    });

    it("should change the password", () => {
        var url = new URL("https://ayonly:190711@[::1]:443/index.html?lang=en-US#id");

        url.password = ""

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "",
            hostname: "[::1]",
            port: "",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "[::1]",
            origin: "https://[::1]",
            href: "https://ayonly@[::1]/index.html?lang=en-US#id",
        });
    });

    it("should change the auth", () => {
        var url = new URL("https://ayonly:190711@[::1]:443/index.html?lang=en-US#id");

        url.auth = "ayonly@gmail.com:20190711"

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly@gmail.com",
            password: "20190711",
            hostname: "[::1]",
            port: "",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "[::1]",
            origin: "https://[::1]",
            href: "https://ayonly@gmail.com:20190711@[::1]/index.html?lang=en-US#id",
        });
    });

    it("should change the hostname", () => {
        var url = new URL("https://ayonly:190711@[::1]:443/index.html?lang=en-US#id");

        url.hostname = "localhost"

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "localhost",
            origin: "https://localhost",
            href: "https://ayonly:190711@localhost/index.html?lang=en-US#id",
        });
    });

    it("should change the port", () => {
        var url = new URL("https://ayonly:190711@localhost:443/index.html?lang=en-US#id");

        url.port = "3000"

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "3000",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "localhost:3000",
            origin: "https://localhost:3000",
            href: "https://ayonly:190711@localhost:3000/index.html?lang=en-US#id",
        });
    });

    it("should change the host", () => {
        var url = new URL("https://ayonly:190711@localhost:443/index.html?lang=en-US#id");

        url.host = "[::1]:443"

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "[::1]",
            port: "",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "[::1]",
            origin: "https://[::1]",
            href: "https://ayonly:190711@[::1]/index.html?lang=en-US#id",
        });
    });

    it("should change the pathname", () => {
        var url = new URL("https://ayonly:190711@localhost:443/index.html?lang=en-US#id");

        url.pathname = "/article.html"

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "",
            pathname: "/article.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "localhost",
            origin: "https://localhost",
            href: "https://ayonly:190711@localhost/article.html?lang=en-US#id",
        });

        url.pathname = "list.html"

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "",
            pathname: "/list.html",
            search: "?lang=en-US",
            hash: "#id",
            host: "localhost",
            origin: "https://localhost",
            href: "https://ayonly:190711@localhost/list.html?lang=en-US#id",
        });
    });

    it("should change the search string", () => {
        var url = new URL("https://ayonly:190711@localhost:443/index.html?lang=en-US#id");

        url.search = "?lang=zh-CN"

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "",
            pathname: "/index.html",
            search: "?lang=zh-CN",
            hash: "#id",
            host: "localhost",
            origin: "https://localhost",
            href: "https://ayonly:190711@localhost/index.html?lang=zh-CN#id",
        });

        url.search = "lang=zh-TW"

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "",
            pathname: "/index.html",
            search: "?lang=zh-TW",
            hash: "#id",
            host: "localhost",
            origin: "https://localhost",
            href: "https://ayonly:190711@localhost/index.html?lang=zh-TW#id",
        });
    });

    it("should change the search string via query object", () => {
        var url = new URL("https://ayonly:190711@localhost:443/index.html?lang=en-US#id");

        url.query = { lang: "zh-CN" };

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "",
            pathname: "/index.html",
            search: "?lang=zh-CN",
            hash: "#id",
            host: "localhost",
            origin: "https://localhost",
            href: "https://ayonly:190711@localhost/index.html?lang=zh-CN#id",
        });

        url.query.lang = "zh-TW"

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "",
            pathname: "/index.html",
            search: "?lang=zh-TW",
            hash: "#id",
            host: "localhost",
            origin: "https://localhost",
            href: "https://ayonly:190711@localhost/index.html?lang=zh-TW#id",
        });
    });

    it("should change the path string (include search string)", () => {
        var url = new URL("https://ayonly:190711@localhost:443/index.html?lang=en-US#id");

        url.path = "/article.html?lang=zh-CN";

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "",
            pathname: "/article.html",
            search: "?lang=zh-CN",
            hash: "#id",
            host: "localhost",
            origin: "https://localhost",
            href: "https://ayonly:190711@localhost/article.html?lang=zh-CN#id",
        });
    });

    it("should change the hash string", () => {
        var url = new URL("https://ayonly:190711@localhost:443/index.html?lang=en-US#id");

        url.hash = "#title"

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#title",
            host: "localhost",
            origin: "https://localhost",
            href: "https://ayonly:190711@localhost/index.html?lang=en-US#title",
        });

        url.hash = "#content"

        assert.deepStrictEqual(Object.assign({}, url[inspect]()), {
            protocol: "https:",
            username: "ayonly",
            password: "190711",
            hostname: "localhost",
            port: "",
            pathname: "/index.html",
            search: "?lang=en-US",
            hash: "#content",
            host: "localhost",
            origin: "https://localhost",
            href: "https://ayonly:190711@localhost/index.html?lang=en-US#content",
        });
    });
});