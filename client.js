const net = require('net');
const fs = require('fs');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const conn = net.createConnection({
  host: 'localhost',
  port: 3000
});

conn.setEncoding('utf8');
conn.setEncoding('utf8'); // interpret data as text

conn.on('data', (data) => {

  let reply = JSON.parse(data);
  let fileStatus = reply.status;
  let fileError = reply.error;

  let fileContents = reply.body;
  console.log(`status: ${fileStatus}`);
  console.log(`error: ${fileError}`);
  console.log(`received: ${fileContents}`);

  if (fileStatus === "ok") {
    writeFile(reply.name, reply.body);
  } else {
    console.log("Error");
  }
});

rl.question('Which file do I need from server (filename)?', (fileName) => {
  conn.write(`Request:${fileName}`);
});

rl.on('close', () => {
  process.end;
});


const writeFile = function(name, body) {
  const savePath = ('./c/');
  let filePath = savePath + name;
  console.log(filePath);
  fs.writeFile(filePath, body, 'utf8', (error) => {
    if (error) {
      console.log("File path invalid. Exiting Program");
    } else {
      let size = fs.statSync(savePath).size;
      console.log(`Downloaded and saved ${size} bytes as ${filePath}`);
    }
    rl.close();
  });
};