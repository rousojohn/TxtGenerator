let Express = require('express')
let Helmet = require('helmet')
let Compression = require('compression')
let BodyParser = require('body-parser')
let Combinatorics = require('js-combinatorics')

let urls = {
  Root: '/',
  CalcPermu: '/calcpermu',
  Ping: '/ping'
}

let configuration = {
  Port: 8081,
  Urls: urls
}

var app = Express()

app.use(Helmet())
app.use(Compression())
app.use(BodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use((req, res, next) => {
  next()
})

app.get(configuration.Urls.Ping, (req, res, next) => {
  res.send('Hello World!!!\n')
})

app.post(configuration.Urls.CalcPermu, (req, res, next) => {
  let postData = req.body
  let texts = []
  postData.forEach(element => {
    texts.push(element.text)
  })
  let cmb = Combinatorics.permutation(texts)
  let toreturn = []
  cmb.forEach(c => {
    toreturn.push({text: c.join(' ')})
  })
  res.json(toreturn)
})

let server = app.listen(configuration.Port, () => {
  let host = server.address().host
  let port = server.address().port
  console.log('Server running at http://%s:%s', host, port)
})
