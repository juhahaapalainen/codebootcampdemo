const pgp = require('pg-promise')();

const db = pgp(
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
    const username = trade.username
    const pokemon = trade.pokemon.charAt(0).toUpperCase() + trade.pokemon.slice(1)
    console.log("add:" + username + " " + pokemon)
    db.one(
        'INSERT INTO pokemontrades(username, pokemon) VALUES($1, $2) RETURNING id',
        [username, pokemon]
    ).then(result => {
        res.send({
            id: result.id,
            username: username,
            pokemon: pokemon,
        });

    }).catch(error => res.status(500).send(error))

}

const removeTrade = (req, res) => {

    let id = -1;
    if (req.id === undefined) {

        id = req.params.id;
    }
    else {
        id = req.id;
    }

    console.log("delid: " + id)
    if (id > 0) {
        db.result('DELETE FROM pokemontrades WHERE id = $1', [id])
            .then(result => {
                if (result.rowCount > 0) {
                    res.send("OK");

                } else {
                    res.status(404).send("Not found");
                }

            }).catch(error => res.status(500).send(error))
    }
    else {
        res.status(404).send("Not found")
    }
}

module.exports = {
    getTrades,
    addTrade,
    removeTrade
};