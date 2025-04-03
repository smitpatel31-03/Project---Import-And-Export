import React, { useEffect, useState } from 'react'
import {Select} from '../index.js'
import useCurrencyInfo from '../../hooks/useCurruncyInfo.js'
import {convert } from '../../Store/curruncySlice.js'
import { useDispatch,useSelector  } from 'react-redux'

function CurruncySelect() {
    const data = useCurrencyInfo()
    const [from,setFrom] = useState("INR")
    const dispatch = useDispatch()

    const options = data ? Object.keys(data) : []


    
    useEffect(()=>{
      dispatch(convert(data[from]))
    },[from,dispatch,data])
    
    
    const converteedRates = useSelector((state)=>state.curruncyConvert.convertedValue)

  return (
        <Select 
        options={options}
        onChange={(e)=>setFrom(e.target.value)}
        />
  )
}

export default CurruncySelect
