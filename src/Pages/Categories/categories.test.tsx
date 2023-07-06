import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Categories from "./Categories";
import { beforeEach } from "vitest";
import CategoryForm from "./CategoryForm";
import TableOfCategories from "./TableOfCategories";
import * as fetchingFunctions from "../../Utils/Utils";

describe("Categories Page", () => {
  const getCategories = vi.fn();
  beforeEach(() => {
    vi.spyOn(fetchingFunctions ,"getCategories" ).mockImplementation(() => getCategories());
    render(<Categories />);
  });
  test("'No Categories text' when no data", () => {
    const noCategoriesText = screen.getByText(/No categories/i);
    expect(noCategoriesText).toBeInTheDocument();
  });
  test("add Categoy button is found", () => {
    const addModal = screen.getByRole("button", { name: /Add New Category/i });
    expect(addModal).toBeInTheDocument();
  });
  test("When button clicked, modal will open", async () => {
    const addModal = screen.getByRole("button", { name: /Add New Category/i });
    await fireEvent.click(addModal);
    waitFor(() => {
      const addCategoryModal = document.querySelector("addCategoryForm");
      expect(addCategoryModal).toBeInTheDocument();
    });
  });
});

describe("AddModal Component", () => {
  const handleAddCategory = vi.fn();
  const handleCloseForm = vi.fn();
  const handleUpdateCategory = vi.fn();
  test("cancel button", () => {
    render(
      <CategoryForm
        handleAddCategory={handleAddCategory}
        handleCloseForm={handleCloseForm}
        handleUpdateCategory={handleUpdateCategory}
        idToUpdate={""}
        CategoryToUpdate={{
          _id: "",
          category: "",
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
      <CategoryForm
      handleAddCategory={handleAddCategory}
        handleCloseForm={handleCloseForm}
        handleUpdateCategory={handleUpdateCategory}
        idToUpdate={""}
        CategoryToUpdate={{
            _id: "",
            category: "",
          }}
      />
    );
    const addSubmit = screen.getByRole("button", { name: /add/i });
    expect(addSubmit).toBeDisabled();
  });
  test("adding category successfully", async () => {
    render(
      <CategoryForm
        handleAddCategory={handleAddCategory}
        handleCloseForm={handleCloseForm}
        handleUpdateCategory={handleUpdateCategory}
        idToUpdate={""}
        CategoryToUpdate={{
            _id: "",
            category: "",
        }}
      />
    );
    const categoryInput = screen.getByLabelText(/Category Name/);
    expect(categoryInput).toBeInTheDocument();
    const addSubmit = screen.getByRole("button", { name: /add/i });
    expect(addSubmit).toBeInTheDocument();
    await fireEvent.change(categoryInput, { target: { value: "chips" } });
    await fireEvent.click(addSubmit);
    expect(handleAddCategory).toBeCalled();
    waitFor(() => {
      const addCategoryModal = document.querySelector("addCategoryForm");
      expect(addCategoryModal).toBeInTheDocument();
      const categoryValue = screen.getByText(/chips/i);
      expect(categoryValue).toBeInTheDocument();
    });
  });
  test("update category successfully", async () => {
    render(
      <CategoryForm
      handleAddCategory={handleAddCategory}
        handleCloseForm={handleCloseForm}
        handleUpdateCategory={handleUpdateCategory}
        idToUpdate={"sdhghg"}
        CategoryToUpdate={{
            _id: "sdhghg",
            category: "biscuit",
        }}
      />
    );
    const categoryInput = screen.getByLabelText(/Category Name/);
    const updateSubmit = screen.getByRole("button", { name: /update/i });
    expect(updateSubmit).toBeInTheDocument();
    await fireEvent.change(categoryInput, { target: { value: "chocolate" } });
    await fireEvent.click(updateSubmit);
    expect(handleUpdateCategory).toBeCalled();
    waitFor(() => {
        const addCategoryModal = document.querySelector("addCategoryForm");
        expect(addCategoryModal).not.toBeInTheDocument();
      const newCategory = screen.getByText(/chocolate/i);
      expect(newCategory).toBeInTheDocument();
      const oldCategory = screen.getByText(/biscuit/i);
      expect(oldCategory).not.toBeInTheDocument();
    });
  });
});

describe('Table of Categories', ()=>{
  const handleDeleteCategory = vi.fn()
  const handleChangeCategoryToUpdate = vi.fn()
  const handleChangeIdToUpdate = vi.fn()
  const setIsAddModalOpen = vi.fn()
  const fullCategoryArray = [{
    _id:"w09j34iourtoiurtpos80",
    category:"chips",
    },
  ]
  beforeEach(() => {
    render(<TableOfCategories
        handleDeleteCategory={handleDeleteCategory}
        categories={fullCategoryArray}
        handleChangeCategoryToUpdate={handleChangeCategoryToUpdate}
        handleChangeIdToUpdate={handleChangeIdToUpdate}
        setIsAddModalOpen={setIsAddModalOpen} />);
  });
  test('should display table head when there are no errors in the data.',()=>{
    const categoryTableHead = screen.getByText(/Category/);
    const numberTableHead = document.getElementById('categoryIndex');
    const DeleteTableHead = document.getElementById('deleteHeadCell')
    const EditTableHead = document.getElementById('editHeadCell')
    expect(categoryTableHead).toBeInTheDocument();
    expect(numberTableHead).toBeInTheDocument();
    expect(DeleteTableHead).toBeInTheDocument();
    expect(EditTableHead).toBeInTheDocument();
  })
  test('should display table with categories and their details when there are no errors in the data.',()=>{
    const numberForTableBody = screen.getByText(/1/);
    const categoryTableBody = screen.getByText('chips');
    const deleteTableBody = screen.getByLabelText('delete')
    const EditTableBody = screen.getByLabelText('edit')
    expect(numberForTableBody).toBeInTheDocument();
    expect(categoryTableBody).toBeInTheDocument();
    expect(deleteTableBody).toBeInTheDocument();
    expect(EditTableBody).toBeInTheDocument();
  })
  test('should delete category when clicked delete button',()=>{
    const deleteTableBody = screen.getByLabelText('delete')
    fireEvent.click(deleteTableBody);
    expect(handleDeleteCategory).toBeCalled();
    waitFor(()=>{
        const categoryTableBody = screen.getByText('chips');
      expect(categoryTableBody).not.toBeInTheDocument();
    })
  })
  test('should delete category when clicked delete button',()=>{
    const editTableBody = screen.getByLabelText('edit')
    fireEvent.click(editTableBody);
    expect(handleChangeCategoryToUpdate).toBeCalled()
    expect(handleChangeIdToUpdate).toBeCalled()
    expect(setIsAddModalOpen).toBeCalled()
  })
})

