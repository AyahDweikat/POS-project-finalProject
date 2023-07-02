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

export class Cart {
  constructor(
    public _id: string,
    public cartDesc: string,
    public cartTax: number,
    public cartDiscount: number,
    public products: Array<Products>
  ) {
    this._id = _id;
    this.cartDesc = cartDesc;
    this.cartTax = cartTax;
    this.cartDiscount = cartDiscount;
    this.products = products;
  }
}
export interface Products {
  productId: string;
  product: ProductToCart;
  quantity: number;
}
export interface ProductToCart {
  productName: string;
  productCategory: string;
  productPrice: number;
  measureUnit: string;
}

