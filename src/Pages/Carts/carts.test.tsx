import { describe, test, expect, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach } from "vitest";
import Carts from "./Carts";
import * as router from "react-router";
import CartItem from "./CartItem";
import { Cart } from "../../Utils/Types";
import CartScreen from "./CartScreen.tsx";
import ProductswithCart from "./ProductsWithCart.tsx";
import * as fetchingFunctions from '../../Utils/Utils.tsx'
describe("Carts Page", () => {
  const location = vi.fn();
  const navigate = vi.fn();
  const getProducts = vi.fn();
  const getCategories= vi.fn();
  const filterByCategory = vi.fn();
  const searchResults = vi.fn();
  const sortByPorductName = vi.fn();

  beforeEach(() => {
    vi.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    vi.spyOn(router, "useLocation").mockImplementation(() => location());
    vi.spyOn(fetchingFunctions, "filterByCategory").mockImplementation(() => filterByCategory());
    vi.spyOn(fetchingFunctions, "searchResults").mockImplementation(() => searchResults());
    vi.spyOn(fetchingFunctions, "sortByPorductName").mockImplementation(() => sortByPorductName());

    render(<Carts />);
    vi.spyOn(fetchingFunctions ,"getProducts" ).mockImplementation(() => getProducts());
    vi.spyOn(fetchingFunctions ,"getCategories" ).mockImplementation(() => getCategories());
  });
  test("no Carts", () => {
    const noCartsText = screen.getByText(/No carts/i);
    expect(noCartsText).toBeInTheDocument();
  });
  test("Add Cart Button", () => {
    const addCartButton = screen.getByRole("button", { name: /add new cart/i });
    expect(addCartButton).toBeInTheDocument();
  });
  test("cart item will display when clicking add new cart button ", async () => {
    const addCartButton = screen.getByRole("button", { name: /add new cart/i });
    await fireEvent.click(addCartButton);
    waitFor(() => {
      const cartItem = document.getElementById("cartItem");
      expect(cartItem).toBeInTheDocument();
    });
  });
});

describe("Cart Item Component", () => {
  const handleOpenCart = vi.fn();
  const handleDeleteCart = vi.fn();
  const cart: Cart = {
    _id: "fsdt56ysfds",
    cartDesc: "newCart",
    cartTax: 0,
    cartDiscount: 0,
    products: [],
  };
  beforeEach(() => {
    render(
      <CartItem
        cart={cart}
        handleOpenCart={handleOpenCart}
        handleDeleteCart={handleDeleteCart}
      />
    );
  });
  test("Delete Cart Button", () => {
    const deleteCartButton = screen.getByLabelText(/delete/i);
    expect(deleteCartButton).toBeInTheDocument();
  });
  test("cart item will delete when clicking add new cart button ", async () => {
    const deleteCartButton = screen.getByLabelText(/delete/i);
    await fireEvent.click(deleteCartButton);
    waitFor(() => {
      const cartItem = document.getElementById("cartItem");
      expect(cartItem).toBeInTheDocument();
    });
  });
  test("Open Cart Screen", () => {
    const openCartWidelyButton = screen.getByRole("button", {
      name: /open cart/i,
    });
    expect(openCartWidelyButton).toBeInTheDocument();
  });
  test("cart item will open widely when clicking open cart button ", async () => {
    const openCartWidelyButton = screen.getByRole("button", {
      name: /open cart/i,
    });
    await fireEvent.click(openCartWidelyButton);
    waitFor(() => {
      const cartScreen = document.querySelector("cartSideBar");
      expect(cartScreen).toBeInTheDocument();
    });
  });
  test("cart description", () => {
    const cartDesc = screen.getByText(/newCart/i);
    expect(cartDesc).toBeInTheDocument();
  });
});
describe("Cart Screen", () => {
  const handleDeleteCart = vi.fn();
  const setIsCartOpenWidely = vi.fn();
  const setCart = vi.fn();
  const cart: Cart = {
    _id: "ETRFTUY6867",
    cartDesc: "newCart",
    cartTax: 0,
    cartDiscount: 0,
    products: [
      {
        productId: "sadds",
        quantity: 2,
        product: {
          productName: "tomatoes",
          productCategory: "vegetables",
          productPrice: 2,
          measureUnit: "kilogram",
        },
      },
    ],
  };
  beforeEach(() => {
    render(
      <CartScreen
        cart={cart}
        setCart={setCart}
        handleDeleteCart={handleDeleteCart}
        setIsCartOpenWidely={setIsCartOpenWidely}
      />
    );
  });
  test("close Button", async () => {
    const closeBtn = document.querySelector("closeBtn");
    if (closeBtn) {
      expect(closeBtn).toBeInTheDocument();
      await fireEvent.click(closeBtn);
      expect(setIsCartOpenWidely).toBeCalled();
      expect(setCart).toBeCalled();
      waitFor(() => {
        const cartScreen = document.querySelector("cartSideBar");
        expect(cartScreen).not.toBeInTheDocument();
      });
    }
  });
  test("description, Tax, Discount Inputs", async () => {
    const descInput = screen.getByLabelText(/Description/i);
    expect(descInput).toBeInTheDocument();
    const taxInput = screen.getByLabelText(/Tax/i);
    expect(taxInput).toBeInTheDocument();
    const discountInput = screen.getByLabelText(/Discount/i);
    expect(discountInput).toBeInTheDocument();

    fireEvent.change(descInput, { target: { value: "cart1" } });
    expect(setCart).toBeCalled();
    fireEvent.change(taxInput, { target: { value: 0.15 } });
    expect(setCart).toBeCalled();
    expect(descInput).toBeInTheDocument();
    fireEvent.change(discountInput, { target: { value: 0.12 } });
    expect(setCart).toBeCalled();
  });
  test("total Price", () => {
    const totalPrice = screen.getByText(/Total Price/i);
    expect(totalPrice).toBeInTheDocument();
  });
  test("checkout Button", async () => {
    const checkoutBtn = screen.getByRole("button", { name: /checkout/i });
    expect(checkoutBtn).toBeInTheDocument();
    await fireEvent.click(checkoutBtn);
    waitFor(() => {
      expect(handleDeleteCart).toBeCalled();
    });
  });
  test("product List", async () => {
    const productName = screen.getByText(/tomatoes/i);
    const productPrice = screen.getByText(/2/i);
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });
  test("quantity input", () => {
    const quantityInput = screen.getByLabelText(/quantity/i);
    expect(quantityInput).toBeInTheDocument();
    fireEvent.change(quantityInput, { target: { value: 3 } });
    expect(setCart).toBeCalled();
    waitFor(() => {
      const updatedQuantity = screen.queryByDisplayValue(/6/);
      expect(updatedQuantity).toBeInTheDocument();
    });
  });
  test("delete product", async () => {
    const deleteProductButton = screen.getByLabelText("deleteButton");
    expect(deleteProductButton).toBeInTheDocument();
    await fireEvent.click(deleteProductButton);
    expect(setCart).toBeCalled();
    waitFor(() => {
      const productName = screen.getByText(/tomatoes/i);
      expect(productName).not.toBeInTheDocument();
    });
  });
});



// describe("prodcuts List", () => {
//   const setCart = vi.fn();
//   const cart: Cart = {
//     _id: "ETRFTUY6867",
//     cartDesc: "newCart",
//     cartTax: 0,
//     cartDiscount: 0,
//     products: [
//       {
//         productId: "sadds",
//         quantity: 2,
//         product: {
//           productName: "tomatoes",
//           productCategory: "vegetables",
//           productPrice: 2,
//           measureUnit: "kilogram",
//         },
//       },
//     ],
//   };
//   const getProducts = vi.fn();
//   const filterByCategory = vi.fn();
//   const searchResults = vi.fn();
//   const sortByPorductName = vi.fn();
  
//   beforeEach(() => {
//       render(<ProductswithCart cart={cart} setCart={setCart} />);
// //       vi.spyOn(fetchingFunctions, "filterByCategory").mockImplementation(() => filterByCategory());
// //       vi.spyOn(fetchingFunctions, "searchResults").mockImplementation(() => searchResults());
// //       vi.spyOn(fetchingFunctions, "sortByPorductName").mockImplementation(() => sortByPorductName());
// //       vi.spyOn(fetchingFunctions ,"getProducts" ).mockImplementation(() => getProducts());
//   });
//   test('products',()=>{
//     const productName = screen.getByTestId('productName');
//     expect(productName).toBeInTheDocument()
//     // const productImage = screen.getByTestId(/productImage/i)
//     // const productPrice = screen.getByTestId(/productPrice/i)
//     // expect(productImage).toBeInTheDocument()
//     // expect(productPrice).toBeInTheDocument()
//   })
// });
