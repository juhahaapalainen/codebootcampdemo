const express = require('express')
const bodyParser = require('body-parser');
const trades = require('./trades');
const app = express()
//const JSONDB = require('node-json-db')
const Discord = require('discord.js')
//const request = require('request')
app.use(bodyParser.json());

const port = 4000

app.get('/', (req, res) => res.send('Hello World'))

app.get('/trades', (req, res) => trades.getTrades(req, res))
app.post('/trades', (req, res) => trades.addTrade(req, res))
app.delete('/trades/:id', (req, res) => trades.removeTrade(req, res))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var fs = require('fs');
var key = fs.readFileSync('key.txt', 'utf8');

const client = new Discord.Client();
client.login(key);

let tradeData = []

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

    if (primaryCommand === "search") {
        searchCommand(arguments, msg)
    }
    else if (primaryCommand === "user") {
        userCommand(arguments, msg)
    }
    else if (primaryCommand === "add") {
        addCommand(arguments, msg)
    }
    else if (primaryCommand === "del") {
        deleteCommand(arguments, msg)
    }
    else {
        msg.channel.send("Command **" + primaryCommand + "** not found")
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
                username: msg.member.displayName.toString(),
                pokemon: arguments[i].toString().replace(/[,()]/g, '').replace(/[/]/g, ' '),

            }
        }, { status: (errorCode) => ({ send: (errorMsg) => console.log("ERROR", errorCode, errorMsg) }) }
        );
    }



}

function deleteCommand(arguments, msg) {

    //console.log(arguments)
    const id = arguments[0]
    const pokemon = ""
    const username = ""
    console.log("id: " + id)
    //const delTrade = -1;
    //console.log(msg)

    trades.getTrades({}, {
        send: tradeData => {
            const filtTrades = tradeData
                .filter(filterName => filterName.username.toLowerCase().includes(msg.member.user.username.toString().toLowerCase()))
                .filter(filterPokemon => filterPokemon.pokemon.toLowerCase().includes(arguments.toString().toLowerCase()))
                .map(pokeData => pokeData.id)
            console.log("tradeData " + filtTrades)
            deleteTrade(filtTrades, msg, arguments)

        }

    }
    )

    // msg.channel.send("OK")
    // console.log("Deltrades: " + delTrade)

    //delTrade.map(id => delTrade.id)
    /*trades.removeTrade({ id: id },
        { status: (errorCode) => ({ send: (errorMsg) => console.log("ERROR", errorCode, errorMsg) }) }
    )*/

}

function deleteTrade(id, msg, arguments) {

    if (id != '') {
        console.log("Ei tyhjä")
        trades.removeTrade({ id: filtTrades[0] },
            { status: (errorCode) => ({ send: (errorMsg) => console.log("ERROR", errorCode, errorMsg) }) }
        );
        msg.channel.send("Poistettu: " + arguments)
    }
    else {
        console.log("Tyhjä " + arguments)
        msg.channel.send("Ei löydy " + arguments)
    }
    /*  */
}



