const pokemonList = [
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

const getPokemons = (req, res) => res.send(pokemonList);

const addPokemon = (req, res) => {
    
    const pokemon = req.body;
    pokemon.id = (pokemonList.slice(-1)[0] || {id: 0}).id + 1;
    pokemonList.push(pokemon);
    res.send(pokemon);
}

const removePokemon = (req, res) => {
    const id = req.params.id;
  //  const index = fruitList.findIndex(fruit => fruit.id === parseInt(id));

    if(index > -1) {
        const removedPokemon = pokemonList.splice(index, 1);
        //console.log("ID", id);
       // res.send(removedFruit);
    }
    else{
        //return error
        res.status(404).send('Not found');
    }
}

module.exports = {
    getPokemons,
    addPokemon,
    removePokemon
};