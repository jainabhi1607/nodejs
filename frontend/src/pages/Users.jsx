import axios from "axios";
import { useEffect, useState } from "react";

function Users() {

    const [results, setResults] = useState([]);

    useEffect(() =>{
        async function getUsers(){
            try{
                const response = await axios.get("http://localhost:4000/data/get")
                setResults(response.data);
                }
            catch(error){
                console.log(error)
            }
        }
    getUsers()
    },[])

   async function deleteUser(e,id){
        e.preventDefault = false;

        try{
            await axios.delete("http://localhost:4000/data/delete/"+id)
            setResults(results.filter((elem, ind) => {
                return id !== elem._id
                }))
            }
        catch(error){
            console.log(error)
        }
    }

    async function editUser(e,id){
        
    }


  return (
    <>
    <h2>Users </h2>
      <div className="products" style={{paddingleft:'20px'}} >
        {results?.length > 0 &&
            results.map((result,index) => {
                // return <ProductDisplay key={product.id} product={product} />;
                return <>
                    <div key={result._id} id={result._id}>
                        <span style={{marginRight:'20px'}} >{result.name}</span>
                        <span style={{marginRight:'20px'}} >{result.email}</span>
                        <span>{result.phone}</span>
                        <a style={{marginRight:'20px'}} onClick={(e) => editUser(e, result._id)}>Edit</a>
                        <a style={{marginRight:'20px'}} onClick={(e) => deleteUser(e, result._id)}>Delete</a>
                    </div>
                </>
            })}
      </div>
    </>
  )
}

export default Users
