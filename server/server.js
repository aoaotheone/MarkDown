const http = require('http')
const path = require('path')
// const { URLSearchParams } = require('url')
const fs = require('fs')
// var option = {
//   key:fs.readFileSync('/var/nodeServer/key.pem'),
//   cert:fs.readFileSync('/var/nodeServer/cert.pem')
// }
http.createServer((req, res) => {
  let method = req.method.toLowerCase()
  switch (method) {
    case 'get':
      get(req, res)
      break
    default:
      break
  }
}).listen(8001)

function get (req, res) {
  let url = req.url
  if (url === '/') {
    url = '/index.html'
  }
  fs.readFile(path.join(__dirname, url), function (err, file) {
    if (err) {
      res.writeHead(404)
      res.end()
      return
    }
    res.writeHead(200)
    res.end(file)
  })
}
