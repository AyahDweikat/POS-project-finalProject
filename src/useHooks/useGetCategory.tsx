import { useState } from 'react';
import { CategoryObj } from '../Utils/Types';
import { useEffect } from 'react';
import { _token, getCategories } from '../Utils/Utils';

function useGetCategory() {
  const [categories, setCategories] = useState<CategoryObj[]>([]);

  useEffect(()=>{
    getCategories(_token, setCategories);
  },[])
  return categories;
}

export default useGetCategory