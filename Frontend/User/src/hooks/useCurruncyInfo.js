import { useEffect,useState } from "react";

function useCurrencyInfo(){
    const [data,setdata] = useState({})
    useEffect(()=>{
        fetch(`https://v6.exchangerate-api.com/v6/8d62be10a2ec559d97397b26/latest/usd`)
        .then((res)=> res.json())
        .then((res) => setdata(res["conversion_rates"]))
    },[])

    console.log("data Curruncy :",data);
    
    return data
    
}

export default useCurrencyInfo