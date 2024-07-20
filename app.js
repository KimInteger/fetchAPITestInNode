const http = require('http');

const fs = require('fs');

const qs = require('querystring')

const server = http.createServer((req,res)=>{
    console.log(req.method);
    console.log(req.url);
    if(req.method === 'GET' && req.url === '/'){
        fs.readFile('./index.html',(err,data)=>{
            if(err){
                res.writeHead(500,{"Content-Type":"text/plain"});
                res.end('server error');
                return
            }
            res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            res.end(data);
        });
    } else if(req.method === 'POST' && req.url === '/test') { 
        let body = '';
        req.on('data',(data)=>{
            body += data.toString();
        });
        req.on('end',()=>{
            const {id, password} = qs.parse(body);
            async function fetchData() {
                try {
                    console.log(id,password);
                    const response = await fetch('http://localhost:8080/test',{
                        method : 'POST',
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({"id":id,"password" : password})
                    });
                    if(!response.ok) {
                        res.writeHead(response.status, {"Content-Type":"application/json"});
                        res.end(JSON.stringify({error : "Error fetching data"}));
                        return;
                    }
                    const data = await response.json();
                    res.writeHead(200,{"Content-Type":"application/json"});
                    res.end(JSON.stringify(data));
                } catch (error) {
                    res.writeHead(500,{"Content-Type":"application/json"});
                    res.end(JSON.stringify({error:"server error"}));
                }
            }
    
            fetchData();
        });
    } else {
        res.writeHead(404,{"Content-Type":"text/html"});
        res.end('404 - Not Found');
    }
});

server.listen(3000,(err)=>{
    if(err){
        console.error('Error listen');
    }
    console.log('http://localhost:3000');
});