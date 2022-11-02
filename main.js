const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8081;

let indexFile;
let indexScript;
let menuBox;

const requestListener = function (req, res) {
  if (req.url === '/') {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexFile);
    return;
  } else if (req.url === '/js/index.js') {
    res.setHeader("Content-Type", "text/javascript");
    res.writeHead(200);
    res.end(indexScript);
    return;
  } else if (req.url === '/assets/MenuBox.glbb') {
    res.setHeader("Content-Type", "text/javascript");
    res.writeHead(200);
    res.end(menuBox);
    return;
  } else {
    res.writeHead(200);
    res.end();
    return;
  }
};

const server = http.createServer(requestListener);
fs.readFile(__dirname + "/index.html")
  .then(contents => {
    indexFile = contents;
    server.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  })
  .catch(err => {
    console.error(`Could not read index.html file: ${err}`);
    process.exit(1);
  });

fs.readFile(__dirname + '/js/index.js')
  .then(contents => {
    indexScript = contents;
  })
  .catch(err => {
    console.error(`Could not read index.js file: ${err}`);
    process.exit(1);
  });

fs.readFile(__dirname + '/assets/MenuBox.glb')
  .then(contents => {
    menuBox = contents;
  })
  .catch(err => {
    console.error(`Could not read index.js file: ${err}`);
    process.exit(1);
  });
