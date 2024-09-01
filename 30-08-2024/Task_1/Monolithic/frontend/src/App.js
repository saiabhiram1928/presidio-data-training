import React, { useEffect,useState } from 'react'



const fetchcall = async()=>{
  const res = await fetch('http://localhost:5000/' , {
    method : 'GET',
  })
  const data = await res.json();
  if(!res.ok){
    console.log(data);
    throw new Error("Something went wrong while fetching the data");
  }
  return data;
}
const App = () => {
  const [rdata, setRdata] = useState([])
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const data = await fetchcall();
        setRdata(data);
      }catch(err)  {
        alert(err);
      }
    }
    fetchData();
  },[])
  if(rdata.length == 0) return  <h1> Loading ....</h1>
  return (
    <div>
      <h1>Product names</h1>
      <ul>
      {
        rdata.map((item,index) =>{
          return <li key={index}> {item.name} </li>
        })
      }
      </ul>
    </div>
  )
}

export default App