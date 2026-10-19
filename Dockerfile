FROM node:20-bookworm-slim
WORKDIR /app
COPY . .
RUN node --test test/app.test.mjs
EXPOSE 8080
CMD ["node", "-e", "require('http').createServer((q,r)=>require('fs').createReadStream('.'+(q.url==='/'?'/index.html':q.url)).on('error',()=>{r.statusCode=404;r.end()}).pipe(r)).listen(8080)"]
