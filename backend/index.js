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

    //console.log(msg.user)
    if (msg.content.startsWith('!')) {
        processCommand(msg);
    }
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }


});

function processCommand(msg) {
    const fullCommand = msg.content.substr(1)
    //const re = /\s*(?:[,/]|$)\s*
    const splitCommand = fullCommand.split(/\s*(?:[, /]|$)\s*/g)
    const primaryCommand = splitCommand[0]
    const user = msg.member.user.username;
    let arguments = splitCommand.slice(1)

    // console.log("Command: " + primaryCommand)
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
    if (primaryCommand == "del") {
        deleteCommand(arguments, msg)
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
            //console.log(" id: " + tradeData[0].id)
            msg.channel.send("Käyttäjä " + arguments + " haluaa: " + filtTrades)
        }

    })

}

function addCommand(arguments, msg) {

    console.log("Käyttäjä: " + msg.member.user.username + " Lisättävä: " + arguments
        + " Monta tulossa? " + arguments.length)

    /*for (i in arguments) {
        console.log(arguments[i].replace(/[,()]/g, '').replace(/[/]/g, ' '))
    }*/


    for (i in arguments) {
        trades.addTrade({
            body: {
                username: msg.member.user.username.toString(),
                pokemon: arguments[i].toString().replace(/[,()]/g, '').replace(/[/]/g, ' '),

            }
        }, { status: (errorCode) => ({ send: (errorMsg) => console.log("ERROR", errorCode, errorMsg) }) }
        );
    }



}

function deleteCommand(arguments, msg) {

    //console.log(arguments)

    //console.log(msg)

    trades.getTrades({}, {
        send: tradeData => {
            const filtTrades = tradeData
                .filter(filterName => filterName.username.toLowerCase().includes(msg.member.user.username.toString().toLowerCase()))
                .filter(filterPokemon => filterPokemon.pokemon.toLowerCase().includes(arguments.toString().toLowerCase()))
                .map(pokeData => pokeData.id)
            console.log("tradeData " + filtTrades)
            deleteTrade(filtTrades)
            //msg.channel.send("Käyttäjä " + arguments + " haluaa: " + filtTrades)
        }

    })



    /*trades.removeTrade(filtTrades,
        { status: (errorCode) => ({ send: (errorMsg) => console.log("ERROR", errorCode, errorMsg) }) }
    );*/

}

function deleteTrade(id) {

    console.log("Tää id pitäs poistaa: " + id)
    //trades.removeTrade({}, { status: (errorCode) => ({ send: (errorMsg) => console.log("ERROR", errorCode, errorMsg) }) });
    /*trades.removeTrade(id,
        { status: (errorCode) => ({ send: (errorMsg) => console.log("ERROR", errorCode, errorMsg) }) }
    );*/

}

client.login('NjkzMDA2OTA4MjgxNTg1Njc0.Xn226A.oeLYgrsZ7W4zM3UcNyb3yhQlXuI');