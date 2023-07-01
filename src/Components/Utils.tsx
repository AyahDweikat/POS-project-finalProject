import { CategoryObj, ProductObj, UnitObj } from "./Types";
import { fetchApiWithAuthNoBody } from "./fetchApi";

export const sortFunctionByStrings = (array: CategoryObj[]) => {
  return array.sort((a: CategoryObj, b: CategoryObj) => {
    const fa = a.category.toLowerCase(),
      fb = b.category.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
};

export const getCategories = async (
  _token: string,
  setCategories: (array: CategoryObj[]) => void
) => {
  const results = await fetchApiWithAuthNoBody(
    "GET",
    `https://posapp.onrender.com/category/getCategories`,
    `black__${_token}`
  );
  if (results.CategoryList) {
    setCategories(sortFunctionByStrings(results.CategoryList));
  }
};

export const getUnits = async (
  _token: string,
  setUnits: (arr: UnitObj[]) => void
) => {
  const results = await fetchApiWithAuthNoBody(
    "GET",
    `https://posapp.onrender.com/unit/getUnits`,
    `black__${_token}`
  );
  if (results.UnitList) {
    setUnits(results.UnitList);
  }
};
export const getProducts = async (
  _token: string,
  setProducts: (arr: ProductObj[]) => void
) => {
  const results = await fetchApiWithAuthNoBody(
    "GET",
    `https://posapp.onrender.com/product/getProducts`,
    `black__${_token}`
  );
  if (results.ProductList) {
    setProducts(results.ProductList);
  }
};
