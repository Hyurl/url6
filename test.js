const { URL } = require("./");
const assert = require("assert");

describe("new URL()", () => {
    var url = new URL("https://root:123456@example.com:443/dir/filename.html?lang=en-US#id");

    it("should initate a new URL instance as expected", () => {
        assert.deepStrictEqual(Object.assign({}, url.inspect()), {
            href: 'https://root:123456@example.com:443/dir/filename.html?lang=en-US#id',
            protocol: 'https:',
            slashes: true,
            auth: 'root:123456',
            username: 'root',
            password: '123456',
            host: 'example.com:443',
            hostname: 'example.com',
            port: 443,
            origin: 'https://example.com:443',
            path: '/dir/filename.html?lang=en-US',
            pathname: '/dir/filename.html',
            search: '?lang=en-US',
            query: { lang: 'en-US' },
            hash: '#id'
        });
    });

    it("should modified url properties as expected", () => {
        url.protocol = "http:"; // change protocol
        url.hostname = "github.com"; // change hostname
        url.port = 80; // change port
        url.query.author = "Ayon Lee"; // modify query object.

        assert.deepStrictEqual(Object.assign({}, url.inspect()), {
            href: 'http://root:123456@github.com/dir/filename.html?lang=en-US&author=Ayon%20Lee#id',
            protocol: 'http:',
            slashes: true,
            auth: 'root:123456',
            username: 'root',
            password: '123456',
            host: 'github.com',
            hostname: 'github.com',
            port: 80,
            origin: 'http://github.com',
            path: '/dir/filename.html?lang=en-US&author=Ayon%20Lee',
            pathname: '/dir/filename.html',
            search: '?lang=en-US&author=Ayon%20Lee',
            query: { lang: 'en-US', author: 'Ayon Lee' },
            hash: '#id'
        });
    });
});