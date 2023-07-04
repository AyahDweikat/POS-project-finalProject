import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach } from "vitest";
import Products from "./Products";
import FilterComponent from "./FilterComponent";
import SearchForm from "./SearchForm";
import AddProductModal from "./AddProductModal";
import TableOfProducts from "./TableOfProducts";
describe("Products Page", () => {
  beforeEach(() => {
    render(<Products />);
  });
  
  test("No Products when no data", () => {
    const noProductsText = screen.getByText(/no products/i);
    expect(noProductsText).toBeInTheDocument();
  });
  test("add product button is found", () => {
    const addProductBtn = screen.getByRole("button", { name: /add product/i });
    expect(addProductBtn).toBeInTheDocument();
  });
  test("When add button clicked, modal will open", async () => {
    const addProductBtn = screen.getByRole("button", { name: /add product/i });
    await fireEvent.click(addProductBtn);
    waitFor(() => {
      const addProductModal = document.getElementById("productModal");
      expect(addProductModal).toBeInTheDocument();
    });
  });
  test("sort product by name button is found", () => {
    const sortingBtn = screen.getByRole("button", { name: /Sort By Name/i });
    expect(sortingBtn).toBeInTheDocument();
  });
});
describe('Filter Component',()=>{
  const handleChangeFilterValue = vi.fn()
  beforeEach(()=>{
    render(<FilterComponent filterValue="" handleChangeFilterValue={handleChangeFilterValue}/>)
  })
  test("filter by category input for product is found", () => {
    const filterInput = document.getElementById('filterByCategory');
    expect(filterInput).toBeInTheDocument();
  });
  test('set Filter value when change input value', async()=>{
    const contentInput = screen.getByTestId("content-input").querySelector('input')
    if(contentInput){
      fireEvent.change(contentInput, { target: { value: "option" } })
      expect(handleChangeFilterValue).toBeCalled()
    }
 })
})
describe('Search Form',()=>{
  const handleChangeSearchValue = vi.fn()
  beforeEach(()=>{
    render(<SearchForm handleChangeSearchValue={handleChangeSearchValue}/>)
  })
  test("Search for product is found", () => {
    const searchInput = screen.getByLabelText(/Search/i)
    expect(searchInput).toBeInTheDocument();
  });
  test('set search value when change input value', async()=>{
    const searchInput = screen.getByLabelText(/Search/i)
    await fireEvent.change(searchInput, { target: { value: "fruits" } });
    expect(handleChangeSearchValue).toBeCalled();
  })
})
describe("AddModal Component", () => {
  const handleCloseForm = vi.fn();
  const setProducts = vi.fn();

  let file:File;
  beforeEach(()=>{
    file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" })
  })
  test("cancel button", async() => {
    render(
      <AddProductModal
        handleCloseForm={handleCloseForm}
        setProducts={setProducts}
        idToUpdate={""}
        productToUpdate={{
          _id: "",
          productName: "",
          productCode: "",
          productCategory: "",
          productImg: "",
          productPrice: 0,
          measureUnit: "",
        }}
      />
    );
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);
    expect(handleCloseForm).toBeCalled();
  });
  test("when empty form, add Button disabled", async () => {
    render(
      <AddProductModal
        handleCloseForm={handleCloseForm}
        setProducts={setProducts}
        idToUpdate={""}
        productToUpdate={{
          _id: "",
          productName: "",
          productCode: "",
          productCategory: "",
          productImg: "",
          productPrice: 0,
          measureUnit: "",
        }}
      />
    );
    const addSubmit = screen.getByRole("button", { name: /add/i });
    expect(addSubmit).toBeDisabled();
  });
  test("adding product successfully", async () => {
    render(
      <AddProductModal
        handleCloseForm={handleCloseForm}
        setProducts={setProducts}
        idToUpdate={""}
        productToUpdate={{
          _id: "",
          productName: "",
          productCode: "",
          productCategory: "",
          productImg: "",
          productPrice: 0,
          measureUnit: "",
        }}
      />
    );
    const productName = screen.getByLabelText(/Product Name/);
    const productCode = screen.getByLabelText(/Product Code/);
    const productCategory = screen.getByLabelText(/Select Category/);
    const productImg = screen.getByPlaceholderText(/add image/);
    const productPrice = screen.getByLabelText(/Product Price/);
    const measureUnit = screen.getByLabelText(/Unit Of Measure/);
    expect(productName).toBeInTheDocument();
    expect(productCode).toBeInTheDocument();
    expect(productCategory).toBeInTheDocument();
    expect(productImg).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(measureUnit).toBeInTheDocument();

    const addSubmit = screen.getByRole("button", { name: /add/i });
    expect(addSubmit).toBeInTheDocument();

    await fireEvent.change(productName, { target: { value: "tomatoes" } });
    await fireEvent.change(productCode, { target: { value: "123456789" } });
    const contentInput = screen.getByTestId("content-input").querySelector('input')
    if(contentInput){
      fireEvent.change(contentInput, { target: { value: "vegetables" } })
    }
    await fireEvent.load(productImg, file)
    await fireEvent.change(productPrice, { target: { value: 1 } });
    await fireEvent.change(measureUnit, { target: { value: "kilogram" } });
    await fireEvent.click(addSubmit);
    waitFor(() => {
      const addProductModal = document.getElementById("productModal");
      expect(addProductModal).not.toBeInTheDocument();
      const newProductName = screen.getByText(/tomatoes/i);
      expect(newProductName).toBeInTheDocument();
      const newProductCode = screen.getByText(/123456789/i);
      expect(newProductCode).toBeInTheDocument();
      const newProductCategory = screen.getByText(/vegetables/i);
      expect(newProductCategory).toBeInTheDocument();
      const newProductImg = screen.getByRole('img', { name: 'tomatoes' })
      expect(newProductImg).toBeInTheDocument();
      const newProductMeasure = screen.getByText(/kilogram/i);
      expect(newProductMeasure).toBeInTheDocument();
      const newProductPrice = screen.getByText(/1/i);
      expect(newProductPrice).toBeInTheDocument();
    });
  });
  test("update product successfully", async () => {
    render(
      <AddProductModal
        handleCloseForm={handleCloseForm}
        setProducts={setProducts}
        idToUpdate={""}
        productToUpdate={{
          _id: "34gtrttr",
          productName: "banana",
          productCode: "123852",
          productCategory: '',
          productImg: "tryttyutyesdfsd",
          productPrice: 5,
          measureUnit: "unit",
        }}
      />
    );
    const productName = screen.getByLabelText(/Product Name/);
    const productCode = screen.getByLabelText(/Product Code/);
    const productImg = screen.getByPlaceholderText(/add image/);
    const productPrice = screen.getByLabelText(/Product Price/);
    const measureUnit = screen.getByLabelText(/Unit Of Measure/);

    const updateSubmit = document.getElementById('submitBtn')
    expect(updateSubmit).toBeInTheDocument();

    await fireEvent.change(productName, { target: { value: "tomatoes" } });
    await fireEvent.change(productCode, { target: { value: "123456789" } });
    const contentInput = screen.getByTestId("content-input").querySelector('input')
    if(contentInput){
      fireEvent.change(contentInput, { target: { value: "vegetables" } })
    }
    await fireEvent.load(productImg, file)
    await fireEvent.change(productPrice, { target: { value: 1 } });
    await fireEvent.change(measureUnit, { target: { value: "kilogram" } });
    if(updateSubmit){
      await fireEvent.click(updateSubmit);
      waitFor(() => {
        const addProductModal = document.getElementById("productModal");
        expect(addProductModal).not.toBeInTheDocument();
        const newProductName = screen.getByText(/tomatoes/i);
        expect(newProductName).toBeInTheDocument();
        const newProductCode = screen.getByText(/123456789/i);
        expect(newProductCode).toBeInTheDocument();
        const newProductCategory = screen.getByText(/vegetables/i);
        expect(newProductCategory).toBeInTheDocument();
        const newProductImg = screen.getByRole('img', { name: 'tomatoes' })
        expect(newProductImg).toBeInTheDocument();
        const newProductMeasure = screen.getByText(/kilogram/i);
        expect(newProductMeasure).toBeInTheDocument();
        const newProductPrice = screen.getByText(/1/i);
        expect(newProductPrice).toBeInTheDocument();
      });
    }
  });
});
describe('Table of products', ()=>{
  const handleDeleteProduct = vi.fn()
  const handleChangeProductToUpdate = vi.fn()
  const handleChangeIdToUpdate = vi.fn()
  const setIsOpenAddProductModal = vi.fn()
  const fullProductArray = [{
    _id: "34gtrttr",
    productName: "banana",
    productCode: "123852",
    productCategory: 'fruits',
    productImg: "tryttyutyesdfsd",
    productPrice: 15,
    measureUnit: "unit",
  },
  ]
  beforeEach(() => {
    render(<TableOfProducts
      handleDeleteProduct={handleDeleteProduct}
      displayedProducts={fullProductArray}
      handleChangeProductToUpdate={handleChangeProductToUpdate}
      handleChangeIdToUpdate={handleChangeIdToUpdate}
      setIsOpenAddProductModal={setIsOpenAddProductModal} />);
  });
  test('should display table head when there are no errors in the data.',()=>{
    const nameTableHead = screen.getByText(/Product Name/);
    const codeTableHead = screen.getByText(/Code/);
    const imgTableHead = screen.getByText(/Image/);
    const CategoryTableHead = screen.getByText(/Category/);
    const priceTableHead = screen.getByText(/Price/);
    const unitMeasureTableHead = screen.getByText(/Unit Measure/);
    const DeleteTableHead = document.getElementById('deleteHeadCell')
    const EditTableHead = document.getElementById('editHeadCell')
    expect(nameTableHead).toBeInTheDocument();
    expect(codeTableHead).toBeInTheDocument();
    expect(imgTableHead).toBeInTheDocument();
    expect(CategoryTableHead).toBeInTheDocument();
    expect(priceTableHead).toBeInTheDocument();
    expect(unitMeasureTableHead).toBeInTheDocument();
    expect(DeleteTableHead).toBeInTheDocument();
    expect(EditTableHead).toBeInTheDocument();
  })
  test('should display table with units and their details when there are no errors in the data.',()=>{
    const nameTableBody = screen.getByText('banana');
    const codeTableBody = screen.getByText('123852');
    const imageTableBody = screen.getByRole('img', { name: 'banana' })
    const categoryTableBody = screen.getByText('fruits');
    const priceTableBody = screen.getByText(/15/);
    const unitMeasureTableBody = screen.getByText(/unit/);
    const deleteTableBody = screen.getByLabelText('delete')
    const EditTableBody = screen.getByLabelText('edit')
    expect(nameTableBody).toBeInTheDocument();
    expect(codeTableBody).toBeInTheDocument();
    expect(imageTableBody).toBeInTheDocument();
    expect(categoryTableBody).toBeInTheDocument();
    expect(priceTableBody).toBeInTheDocument();
    expect(unitMeasureTableBody).toBeInTheDocument();
    expect(deleteTableBody).toBeInTheDocument();
    expect(EditTableBody).toBeInTheDocument();
  })
  test('should delete product when clicked delete button',()=>{
    const deleteTableBody = screen.getByLabelText('delete')
    fireEvent.click(deleteTableBody);
    expect(handleDeleteProduct).toBeCalled();
    waitFor(()=>{
    const nameTableBody = screen.getByText('banana');
    const codeTableBody = screen.getByText('123852');
    const imageTableBody = screen.getByRole('img', { name: 'banana' })
    const categoryTableBody = screen.getByText('fruits');
    const priceTableBody = screen.getByText(/15/);
    const unitMeasureTableBody = screen.getByText(/unit/);
    const deleteTableBody = screen.getByLabelText('delete')
    const EditTableBody = screen.getByLabelText('edit')
    expect(nameTableBody).not.toBeInTheDocument();
    expect(codeTableBody).not.toBeInTheDocument();
    expect(imageTableBody).not.toBeInTheDocument();
    expect(categoryTableBody).not.toBeInTheDocument();
    expect(priceTableBody).not.toBeInTheDocument();
    expect(unitMeasureTableBody).not.toBeInTheDocument();
    expect(deleteTableBody).not.toBeInTheDocument();
    expect(EditTableBody).not.toBeInTheDocument();
    })
  })
  test('should update product when clicked update button',()=>{
    const editTableBody = screen.getByLabelText('edit')
    fireEvent.click(editTableBody);
    expect(handleChangeProductToUpdate).toBeCalled()
    expect(handleChangeIdToUpdate).toBeCalled()
    expect(setIsOpenAddProductModal).toBeCalled()
  })
})

