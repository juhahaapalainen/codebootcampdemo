const express = require('express')
const bodyParser = require('body-parser');
const pokemons = require('./pokemons');
const app = express()
app.use(bodyParser.json());

const port = 4000

app.get('/', (req, res) => res.send('Hello World'))

app.get('/pokemons', (req, res) => pokemons.getPokemons(req, res))
//app.post('/pokemons', (req, res) => pokemons.addPokemon(req, res))
//app.delete('/pokemons/:id', (req, res) => pokemons.removePokemon(req, res))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))