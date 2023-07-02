import { CategoryObj, ProductObj, UnitObj } from "./Types";
import { fetchApiWithAuthNoBody } from "./fetchApi";

export const _token: string = localStorage.getItem("token") || "";

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

export const sortByName = (array: ProductObj[]) => {
  return array.sort((a: ProductObj, b: ProductObj) => {
    const fa = a.productName.toLowerCase(),
      fb = b.productName.toLowerCase();
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
export const sortByPorductName = (isSortByName: boolean, products: ProductObj[]) => {
  if (isSortByName) {
    const _products = [...products];
    return sortByName(_products);
  } else {
    return products;
  }
};
export function searchResults(searchValue: string, products: ProductObj[]) {
  return products.filter((product: ProductObj) => {
    return (
      product.productName
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase()) ||
      String(product.productCode)
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase()) ||
      product.measureUnit
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase()) ||
      product.productCategory
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase()) ||
      String(product.productPrice)
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase())
    );
  });
}
export function filterByCategory(filterValue: string, products: ProductObj[]) {
  if (!filterValue) {
    return products;
  }
  return products.filter((product) => {
    return product.productCategory == filterValue;
  });
}