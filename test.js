const { URL } = require("./");

var url = new URL("https://root:123456@example.com:443/dir/filename.html?lang=en-US#id");
console.log(url);

url.protocol = "http:"; // change protocol
url.hostname = "github.com"; // change hostname
url.port = 80; // change port
url.query.author = "Ayon Lee"; // modify query object.

console.log(url);