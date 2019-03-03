const http = require('http')
const path = require('path')
// const { URLSearchParams } = require('url')
const fs = require('fs')
http.createServer((req, res) => {
  let method = req.method.toLowerCase()
  console.log(method)
  switch (method) {
    case 'get':
      get(req, res)
      break
    case 'post':
      _post(req, res)
      break
    default:
      break
  }
}).listen(8008)

function get (req, res) {
  let url = req.url
  console.log(req.url)
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

function _post (req, res) {
  let buffers = ''

  req.on('data', function (chunk) {
    buffers += chunk
  })

  req.on('end', function () {
    let query
    try {
      query = JSON.parse(buffers)
    } catch (e) {
      res.writeHead(400)
      res.end('Invalid JSON')
      return
    }
    handle(query, res)
  })
}

function handle (query, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.writeHead(200, { 'Content-Type': 'application/json' })

  console.log(query.type)

  let result = {
    status: 'success'
  }
  res.end(JSON.stringify(result))
}
