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
app.post('/trades', (req, res) => trades.addTradeDiscord(req, res))
app.delete('/trades/:id', (req, res) => trades.removeTrade(req, res))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const Discord = require('discord.js')
const client = new Discord.Client();
let tradeData = []

/*fetch('http://localhost:3000/api/trades')
    .then(res => res.json())
    .then(data => handleData(data))
    //.then(json => console.log(json))
    .catch(err => console.log(err))*/


/*const request = async() => {

    const response = await fetch('http://localhost:4000/trades')
    const json = await response.json()
    console.log(json)
   
}*/

/*function handleData(data) {

    tradeData = [];

    for (var i in data) {
        //    console.log(data[i])
        tradeData.push(data[i])
    }
    //  console.log(tradeData)
}

function haeTradet() {

    fetch('http://localhost:3000/api/trades')
        .then(res => res.json())
        .then(data => handleData(data))
        //.then(json => console.log(json))
        .catch(err => console.log(err))
}*/
//console.log("Tradedata: " +tradeData);
//console.log(trades.getTrades(req,res))

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

})

client.on('message', msg => {

    console.log(msg.user)
    if (msg.content.startsWith('!')) {
        processCommand(msg);
    }
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }


});

function processCommand(msg) {
    const fullCommand = msg.content.substr(1)
    const splitCommand = fullCommand.split(" ");
    const primaryCommand = splitCommand[0]
    const user = msg.member.user.username;
    let arguments = splitCommand.slice(1)

    //console.log("Command: " + primaryCommand)
    //console.log("Arguments: " + arguments.toString().toLowerCase())
    //console.log("User: " + user)

    if (primaryCommand == "search") {
        searchCommand(arguments, msg)
    }
    if (primaryCommand == "user") {
        userCommand(arguments, msg)
    }
    if (primaryCommand == "add") {
        addCommand(arguments, msg)
    }
}

function searchCommand(arguments, msg) {

    //console.log("Search for: " + arguments)
    trades.getTrades({}, {
        send: tradeData => {

            const filtTrades = tradeData
                .filter(hakuSuodatin => hakuSuodatin.pokemon.toLowerCase().includes(arguments.toString().toLowerCase()))
                .map(pokeData => pokeData.username)
            msg.channel.send("Pokemonia " + arguments + " haluavat käyttäjät: " + filtTrades)
        }
    })
}

function userCommand(arguments, msg) {

    //console.log("Search for: " + arguments)

    trades.getTrades({}, {
        send: tradeData => {
            const filtTrades = tradeData
                .filter(hakuSuodatin => hakuSuodatin.username.toLowerCase().includes(arguments.toString().toLowerCase()))
                .map(pokeData => pokeData.pokemon)
            msg.channel.send("Käyttäjä " + arguments + " haluaa: " + filtTrades)
        }

    })

}

function addCommand(arguments, msg) {

    console.log("Käyttäjä: " + msg.member.user.username + " Lisättävä: " + arguments
        + " Monta tulossa? " + arguments.length)


    trades.addTrade({
        body: {
            username: msg.member.user.username.toString(),
            pokemon: arguments[0].toString(),

        }
    }
    );

    /*
    for (var i in arguments) {
        //console.log(arguments[i])

        fetch('http://localhost:3000/api/trades', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: msg.member.user.username.toString(),
                pokemon: arguments[i].toString(),
                info: ""
            })
        })
            .then(response => response.json())
        //.then(newTradeItem => handleData(newTradeItem))
    }*/


}



client.login('NjkzMDA2OTA4MjgxNTg1Njc0.Xn226A.oeLYgrsZ7W4zM3UcNyb3yhQlXuI');