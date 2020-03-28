const express = require('express')
const bodyParser = require('body-parser');
const trades = require('./trades');
const app = express()
const http = require('http')
const fetch = require('node-fetch')

//const request = require('request')
app.use(bodyParser.json());

const port = 4000

app.get('/', (req, res) => res.send('Hello World'))

app.get('/trades', (req, res) => trades.getTrades(req, res))
app.post('/trades', (req, res) => trades.addTrade(req, res))
app.delete('/trades/:id', (req, res) => trades.removeTrade(req, res))
//app.post('/pokemons', (req, res) => pokemons.addPokemon(req, res))
//app.delete('/pokemons/:id', (req, res) => pokemons.removePokemon(req, res))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const Discord = require('discord.js')
const client = new Discord.Client();
const tradeData = []; 

/*http.get('http://localhost:4000/trades', function(res) {

    var body = "";
    res.on('data', function(chunk){
        body += chunk;
    });
    res.on('end', function(){
        var resp = JSON.parse(body)
        console.log(resp)
        
    })
})*/

fetch('http://localhost:4000/trades')
    .then(res => res.json())
    .then(json => console.log(json))
    .then(json => tradeData.push(json))
    .then(console.log(tradeData))

    
//console.log("Tradedata: " +tradeData);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

})

client.on('message', msg =>  {

    if(msg.content.startsWith('!')) {
        processCommand(msg);
    }
    if(msg.content === 'ping') {
        msg.reply('Pong!');
    }


});

function processCommand(msg) {
    const fullCommand =msg.content.substr(1)
    const splitCommand = fullCommand.split(" ");
    const primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    console.log("Command: " +primaryCommand)
    console.log("Arguments: " +arguments)

    if(primaryCommand == "search") {
        searchCommand(arguments, msg)
    }
}

function searchCommand(arguments, msg) {
    console.log("Search for: " +arguments)
    msg.channel.send("Etsit: " +arguments)
    //getData();
    //console.log("trades: " +tradeData)
}

/*async function getData() {
    const res = await fetch("/api/trades");
    res
        .json()
        .then(data => tradeData.push(data))
        .catch(err => console.log(err))
} */

client.login('NjkzMDA2OTA4MjgxNTg1Njc0.Xn226A.oeLYgrsZ7W4zM3UcNyb3yhQlXuI');