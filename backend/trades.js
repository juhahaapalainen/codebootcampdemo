const tradeList = [
    {
        "id": 1, 
        "pokemon": "Torkoal" , 
        "user": "User1"
    },
    {
        "id": 2, 
        "pokemon": "Heracross", 
        "user": "User2"
    },
    {
        "id": 3, 
        "pokemon": "Torkoal", 
        "user": "User3"
    },
    {
        "id": 4, 
        "pokemon": "Heracross", 
        "user": "User3"
    },
    {
        "id": 5, 
        "pokemon": "Heracross", 
        "user": "User1"
    },
    {
        "id": 6, 
        "pokemon": "Relicanth", 
        "user": "User1"
    },
    {
        "id": 7, 
        "pokemon": "Carnivine", 
        "user": "User3"
    }
];

const pgp = require('pg-promise')(); 

 const db = pgp ( 
{
    host: 'localhost',
    port: 5432,
    database: 'pokemonTrades',
    user: 'postgres',
    password: 'test1234',
    max: 30 // use up to 30 connections
}
 );



const getTrades = (req, res) => 
    db.any('SELECT * FROM pokemontrades')
        .then(tradeListDb => res.send(tradeListDb))
        .catch(error => res.status(500).send(error))

const addTrade = (req, res) => {
            const trade = req.body;
            db.one(
                'INSERT INTO pokemontrades(username, pokemon) VALUES($1, $2) RETURNING id',
                [trade.username, trade.pokemon]
            ).then(result => {
                res.send({
                    id: result.id,
                    type: trade.username,
                    name: trade.pokemon,
                });
        
            }).catch(error => res.status(500).send(error))
            
        }

const removeTrade = (req, res) => {
            const id = req.params.id;
            db.result('DELETE FROM pokemontrades WHERE id = $1', [id])
            .then(result => {
                    if(result.rowCount > 0) {
                        res.send("OK");
        
                    }else {
                        res.status(404).send("Not found");
                    }
        
            }).catch(error => res.status(500).send(error))
}
        /*const getTrades = (req, res) => res.send(tradeList);
const addTrade = (req, res) => {
    
    const trade = req.body;
    trade.id = (tradeList.slice(-1)[0] || {id: 0}).id + 1;
    tradeList.push(trade);
    res.send(trade);
}

const removeTrade = (req, res) => {
    const id = req.params.id;
  //  const index = fruitList.findIndex(fruit => fruit.id === parseInt(id));

    if(index > -1) {
        const removedTrade = tradeList.splice(index, 1);
        //console.log("ID", id);
       // res.send(removedFruit);
    }
    else{
        //return error
        res.status(404).send('Not found');
    }
}
*/
module.exports = {
    getTrades,
    addTrade,
    removeTrade
};