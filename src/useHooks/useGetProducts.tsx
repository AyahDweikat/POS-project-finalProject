import { useState } from 'react';
import { ProductObj } from '../Utils/Types';
import { useEffect } from 'react';
import { _token, getProducts } from '../Utils/Utils';

function useGetProducts() {
    const [products, setProducts] = useState<ProductObj[]>([]);


  useEffect(()=>{
    getProducts(_token, setProducts);
  },[])
  return products;
}

export default useGetProducts