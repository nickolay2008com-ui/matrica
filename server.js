const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8',
  '.svg':'image/svg+xml', '.json':'application/json; charset=utf-8', '.webmanifest':'application/manifest+json; charset=utf-8'
};

function send(res,status,body,headers={}){res.writeHead(status,headers);res.end(body);}

http.createServer((req,res)=>{
  const urlPath=decodeURIComponent((req.url||'/').split('?')[0]);
  if(urlPath==='/healthz') return send(res,200,JSON.stringify({ok:true,service:'matrica'}),{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
  let filePath=path.resolve(root,'.'+(urlPath==='/'?'/index.html':urlPath));
  if(!filePath.startsWith(path.resolve(root))) return send(res,403,'Forbidden');
  fs.stat(filePath,(err,stat)=>{
    if(!err&&stat.isDirectory()) filePath=path.join(filePath,'index.html');
    fs.readFile(filePath,(readErr,data)=>{
      if(readErr){
        fs.readFile(path.join(root,'index.html'),(fallbackErr,fallback)=>{
          if(fallbackErr) return send(res,404,'Not found');
          send(res,200,fallback,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'});
        });
        return;
      }
      const ext=path.extname(filePath);
      const cache=ext==='.html'?'no-cache':'public, max-age=3600';
      send(res,200,data,{'Content-Type':mime[ext]||'application/octet-stream','Cache-Control':cache});
    });
  });
}).listen(port,'0.0.0.0',()=>console.log(`Matrica listening on ${port}`));
