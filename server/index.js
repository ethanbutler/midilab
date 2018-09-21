const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const qrcode = require('qrcode-terminal')
const ip = require('ip')
const socketInit = require('./io')
const port = process.env.PORT || 3000

app.use('/', express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

http.listen(port, () => {
  // socketInit(http)

  console.log(`Listening!`)
  const address = `http://${ip.address()}:${port}`
  console.log(address)
  qrcode.generate(address)
})
