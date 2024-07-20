const http = require('http');
const { stringify } = require('querystring');

const server = http.createServer((req,res)=>{
  if(req.url === '/test'){
    let body = '';
    req.on('data', (data)=>{
      body += data.toString();
    })
    req.on('end',()=>{
      res.writeHead(300,{"Content-Type":"application/json"});
      res.end(JSON>stringify({success : 'true'}));
    });
  }
});

server.listen(8080,(err)=>{
  if(err){
    console.error('Error');
  }
  console.log(`http://localhost:8080`);
});

