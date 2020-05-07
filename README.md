# URL6

**A more practical URL parser for Node.js that combines new and legacy APIs.**

## Install

```sh
npm install url6 --save
```

## Example

```javascript
const { URL } = require("url6");

var url = new URL("https://root:123456@example.com:443/dir/filename.html?lang=en-US#id");
console.log(url);

url.protocol = "http:"; // change protocol
url.hostname = "github.com"; // change hostname
url.port = 80; // change port
url.query.author = "Ayon Lee"; // modify query object.

console.log(url);
```

## API

### class URL

- `new URL(input?: string)`
- `url.href: string`
- `url.protocol: string` with trailing `:`.
- `url.slashes: boolean` whether `//` appears after the `protocol`.
- `url.auth: string`
- `url.username: string`
- `url.password: string`
- `url.host: string`
- `url.hostname: string` without trailing `port` number.
- `url.port: number`
- `url.origin: string` readonly.
- `url.path: string`
- `url.pathname: string` without trailing `search` string.
- `url.search: string`
- `url.query: { [key: string]: string }` parsed by 
    [qs](https://www.npmjs.com/package/qs) module.
- `url.hash: string`
- `url.toString()` same as `url.href`.
- `url.toJSON()` same as `url.toString()`.

This module is meant to bring some features from Node.js 8.0+ to Node.js 6.X 
or even lower versions, it cannot be run in browser, use native `URL` instead.