const http = require('http');
const { stringify } = require('querystring');

const server = http.createServer((req,res)=>{
  console.log(req.method);
  console.log(req.url);
  if(req.url === '/test'){
    let body = '';
    req.on('data', (data)=>{
      body += data.toString();
    })
    req.on('end',()=>{
      console.log(body);
      res.writeHead(201,{"Content-Type":"application/json"});
      res.end(JSON.stringify({success : 'true'}));
    });
  }
});

server.listen(8080,(err)=>{
  if(err){
    console.error('Error');
  }
  console.log(`http://localhost:8080`);
});

