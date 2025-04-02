import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router'
import {ProductForm} from '../components/index.js'
import service from '../services/config.js'

function AddProduct() {
  const {id} = useParams()
  return (
    <div>
      <ProductForm />
    </div>
  )
}

export default AddProduct
