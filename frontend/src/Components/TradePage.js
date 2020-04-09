import React, { useState, useEffect } from 'react';
import "./Home.css"
import TradeItem from './TradeItem'
import AddTrade from './AddTrade'
import './TradePage.css'
import SearchBar from './SearchBar'

export default function TradePage(props) {

    const [trades, setTrades] = useState([]);
    const [search, setSearch] = useState('');
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("/api/trades");
            res
                .json()
                .then(data => setTrades(data))
                .catch(err => console.log(err))
        }
        fetchData();


    }, []);


    const onDelete = (id) => {
        fetch(`/api/trades/${id}`, {
            method: "DELETE"
        })
            .then(() =>
                setTrades(trades.filter(trade => trade.id !== id))
            );
    }


    const temp = trades.map(kayttajadata => (kayttajadata.username)).sort();
    const unique = new Set(temp);

    const users = [...unique];

    const addSearchTerm = (newSearch) => {

        setSearch(newSearch);

    }
    function toggleAddArea() {

        setSeen(!seen);
        console.log("Näkyykö: " + seen)
    }
    const Modal = ({ handleClose, show, children }) => {

        const showHideClassName = show ? 'modal display-block' : 'modal display-none';

        return (
            <div className={showHideClassName}>
                <AddTrade onTradeAdded={newTradeItem => setTrades([...trades, newTradeItem])} />
                <button onClick={handleClose}>Close</button>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div>
                <Modal show={seen} handleClose={toggleAddArea}>

                </Modal>
            </div>

            <div className="addBtn" onClick={toggleAddArea}>
                <button>+</button>
            </div>
            <div>

                <SearchBar addSearchTerm={addSearchTerm} />
            </div>
            <div>
                {users.map((user) =>
                    <div key={user} className={`users ${user}`}>
                        <h1>{user}</h1>
                        <div className="trades">
                            {
                                trades
                                    .filter(suodatin => suodatin.username.includes(user))
                                    .filter(hakuSuodatin => hakuSuodatin.pokemon.toLowerCase().includes(search.toLowerCase()))
                                    .map(pokeData => {
                                        return <TradeItem
                                            key={pokeData.id}
                                            username={pokeData.username}
                                            pokemon={pokeData.pokemon}
                                            onDelete={() => onDelete(pokeData.id)}

                                        >
                                            {pokeData.info}</TradeItem>
                                    })

                            }
                        </div>

                    </div>
                )

                }

            </div>



        </React.Fragment>


    );
}
//   <div>
//<UserArea trades={trades} search={search} onDelete={onDelete}> </UserArea>
//</div>
// <User users={users} trades={trades} search={search} onDelete={del => onDelete(del)}></User>

