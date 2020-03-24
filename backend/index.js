const express = require('express')
const bodyParser = require('body-parser');
const trades = require('./trades');
const app = express()
app.use(bodyParser.json());

const port = 4000

app.get('/', (req, res) => res.send('Hello World'))

app.get('/trades', (req, res) => trades.getTrades(req, res))
app.post('/trades', (req, res) => trades.addTrade(req, res))
app.delete('/trades/:id', (req, res) => trades.removeTrade(req, res))
//app.post('/pokemons', (req, res) => pokemons.addPokemon(req, res))
//app.delete('/pokemons/:id', (req, res) => pokemons.removePokemon(req, res))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))