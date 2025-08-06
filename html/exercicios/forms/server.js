const express = require('express')
const bodyParser = require('body-parser')


app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/usuarios', (req, resp) => {
    console.log(req.body)  // ao utiliziar o método get a requisição vem como querystring, usar "req.query"
    resp.send('<h1>OK, incluindo!</h1>')

})
app.post('/usuarios/toalter/:id', (req, resp) => {
    console.log(`Alterando usuário: ${req.params.id}`)
    console.log(req.body)
    resp.send('<h1>OK, alterando!</h1>')

})

app.post('/usuarios/todelete/:id', (req, resp) => {
    console.log(`Excluindo usuário: ${req.params.id}`)
    console.log(req.body)
    resp.send('<h1>OK, excluindo!</h1>')

})

app.listen(3003)
