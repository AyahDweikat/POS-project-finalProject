import { fetchApiWithAuthNoBody } from "./fetchApi";

export type UnitObj = {
  _id: string;
  unitOfMeasure: string;
  baseUnit: string;
  conversionFactor: number;
};
export interface InputsObj {
  unitOfMeasure: string;
  baseUnit: string;
  conversionFactor: number;
}
export interface SignUpObj {
  userName: string;
  email: string;
  password: string;
  cPassword: string;
}
export type Auth = {
  user: string;
  token: string;
  setToken: void;
  setUser: void;
  signout: void;
};
export interface LoginObj {
  email: string;
  password: string;
}
export interface CategoryObj {
  _id: string;
  category: string;
}
export interface Category {
  category: string;
}
export interface ProductItemDB {
  productName: string;
  productCategory: string;
  productPrice: number;
  measureUnit: string;
}
export interface ProductsInDB {
  _id: string;
  productId: string;
  product: ProductItemDB;
  quantity: number;
}
export interface CartInDB {
  _id: string;
  cartDesc: string;
  cartTax: number;
  cartDiscount: number;
  products: Array<ProductsInDB>;
}
export interface ProductObj {
  _id: string;
  productName: string;
  productCode: string;
  productCategory: string;
  productImg: string;
  productPrice: number;
  measureUnit: string;
}
export interface ProductInputObj {
  productName: string;
  productCode: string;
  productCategory: string;
  productImg: string;
  productPrice: number;
  measureUnit: string;
}
export interface ProductToCart {
  productName: string;
  productCategory: string;
  productPrice: number;
  measureUnit: string;
}
export interface Products {
  productId: string;
  product: ProductItemDB;
  quantity: number;
}
export interface Cart {
  cartDesc: string;
  cartTax: number;
  cartDiscount: number;
  products: Array<Products>;
}



export const fetchCartData = async (_token: string) => {
  const results = await fetchApiWithAuthNoBody(
    "GET",
    `https://posapp.onrender.com/cart/getCarts`,
    `black__${_token}`
  );
  if (results.CartList) {
    // setCarts(results.CartList);
    return results.CartList
  }
  return results;
};