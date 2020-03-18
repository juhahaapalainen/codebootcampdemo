import React, {useState, useEffectfrom, useEffect} from 'react';
import Pokemon from './Pokemon'
import AddTrade from './AddTrade';
import "./Pokemonlist.css"
import User from "./User"
//import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

/*const FormPage = () => {
return (
<MDBContainer>
  <MDBRow>
    <MDBCol md="6">
      <form>
        <p className="h5 text-center mb-4">Sign up</p>
        <div className="grey-text">
          <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
            success="right" />
          <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
            success="right" />
          <MDBInput label="Confirm your email" icon="exclamation-triangle" group type="text" validate
            error="wrong" success="right" />
          <MDBInput label="Your password" icon="lock" group type="password" validate />
        </div>
        <div className="text-center">
          <MDBBtn color="primary">Register</MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
);
};*/
export default function(props) {

const [tradeList, setTradeList] = useState([]);
//const [userList, setUserList] = useState([]); 

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("/api/pokemons");
            res
                .json()
                .then(data => setTradeList(data))
                .catch(err => console.log(err))
        }    
        fetchData();   
    }, []);

    
  


    const tradeElements = tradeList.map(
        tradeData => {
          return <Pokemon 
            key={tradeData.id} 
            type={tradeData.pokemon}
            onDelete = {() => onDelete(tradeData.id)}
          >
          {tradeData.user}</Pokemon>
        }
    )

  
    const onDelete = (id) => {
        fetch(`/api/pokemons/${id}`, {
            method: "DELETE"
        })
        
        .then(() =>
            setTradeList(tradeList.filter(trade => trade.id !== id))
        );
    }

   
    
    const kayttajat = tradeList.map(kayttajadata => (kayttajadata.user)).sort();

    /*const kayttajat = tradeList.map(kayttajadata => {
        return <User
        key = {kayttajadata.id.toString()} 
        user= {kayttajadata.user}>
            </User>
    })*/

    const unique = new Set(kayttajat);

    const uniqueArray = [...unique];
    //let pp = tradeList.filter( (ele, ind) => ind === tradeList.findIndex( elem => elem.user === ele.user && elem.id === ele.id))
   // console.log("tradeList: " +tradeList)
    //console.log("tradeListuser: " +tradeList.user)
    console.log("UsersList: " +uniqueArray);
   // console.log("pp: " +pp);
    console.log("kayttaja " +kayttajat);

    console.log("Toimmiiko:" +tradeList.map(kayttajadata => (kayttajadata.user)).sort())
     

    return (
        <React.Fragment>
        <div>
            <AddTrade/>
     
        
        
        </div>

        <div>
            <label>
                Looping through
            <select>
                {tradeList
                .map(item => (
                    <option key = {item.id} value={item.user}>
                        {item.user}
                    </option>

                ))}

            </select>
            </label>

            <label>
                Looping through unique
            <select>
                {uniqueArray
                .map(item => (
                    <option key= {item} value= {item}>
                        {item}
                    </option>

                ))}

            </select>
            </label>

            <label>
                Looping through sorted
            <select>
                {tradeList
                .sort((a,b) => a.user.localeCompare(b.user))
                .map(item => (
                    <option key = {item.id} value={item.user}>
                        {item.user}
                    </option>
                
                ))}

            </select>
            </label>
        </div>
      
        </React.Fragment>
    );

}       
//export default FormPage;