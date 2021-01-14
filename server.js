const net = require('net');
const fs = require('fs');

const server = net.createServer();

const sPackage = {
  response: true,
  name: '',
  status: '',
  error: '',
  body: ''
};


server.on('connection', (client) => {
  console.log("New client connected!");
  client.setEncoding('utf8');
  client.on('data', (data) =>{
    //get name of requested file
    sPackage.name = getInfo(data);
    packAndSend(client, sPackage.name);
  });
});


server.listen(3000, () => {
  console.log('Server listening on port 3000!');
  
});

const getInfo = function(data) {
  let fileName = (data.slice(data.indexOf(':') + 1));
  console.log(fileName);
  return fileName;
};

//will put info required in the sPackage and send it as JSON string
const packAndSend = function(client, filename) {
  const fPath = ('./s/');
  const filePath = fPath + filename;
  console.log(filePath);
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.log(`can't read file ${error}`);
      sPackage.status = "Error: can't read file";
      sPackage.error = error;
    } else {
      sPackage.status = "ok";
      sPackage.body = data;
    }
    client.write(JSON.stringify(sPackage));
  });
  


};