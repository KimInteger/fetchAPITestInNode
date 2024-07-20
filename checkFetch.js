const http = require('http');

const server = http.createServer((req,res)=>{
  console.log('test');
});

server.listen(8080,(err)=>{
  if(err){
    console.error('Error');
  }
  console.log(`http://localhost:8080`);
});

