import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Units from "./Units";
import { beforeEach } from "vitest";
import UnitsAddForm from "./UnitsAddForm";
import TableOfUnits from "./TableOfUnits";
// import { getUnits } from "../../Utils/Utils";
// const token =
//   "black__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTBhOGI3OTBlZmUxYzAzOWUwZmIzNiIsImlhdCI6MTY4NzI1NzU5NywiZXhwIjoxNjg3MzQzOTk3fQ.Oiem-z2e6MJAfBlMCYHKmzQqE6pT_2dsDFIxgFqOx60";

describe("Unit Page", () => {
  beforeEach(() => {
    render(<Units />);
  });
  
  test("No Units when no data", () => {
    const noUnitsText = screen.getByText(/no units/i);
    expect(noUnitsText).toBeInTheDocument();
  });
  test("add unit button is found", () => {
    const addModal = screen.getByRole("button", { name: /add new unit/i });
    expect(addModal).toBeInTheDocument();
  });
  test("When button clicked, modal will open", async () => {
    const addModal = screen.getByRole("button", { name: /add new unit/i });
    await fireEvent.click(addModal);
    waitFor(() => {
      const addUnitModal = document.getElementById("unitsPage");
      expect(addUnitModal).toBeInTheDocument();
    });
  });
});

describe("AddModal Component", () => {
  const handleAddUnit = vi.fn();
  const handleCloseForm = vi.fn();
  const handleUpdateUnit = vi.fn();
  test("cancel button", async() => {
    render(
      <UnitsAddForm
        handleAddUnit={handleAddUnit}
        handleCloseForm={handleCloseForm}
        handleUpdateUnit={handleUpdateUnit}
        idToUpdate={""}
        unitToUpdate={{
          _id: "",
          unitOfMeasure: "",
          baseUnit: "",
          conversionFactor: 0,
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
      <UnitsAddForm
        handleAddUnit={handleAddUnit}
        handleCloseForm={handleCloseForm}
        handleUpdateUnit={handleUpdateUnit}
        idToUpdate={""}
        unitToUpdate={{
          _id: "",
          unitOfMeasure: "",
          baseUnit: "",
          conversionFactor: 0,
        }}
      />
    );
    const addSubmit = screen.getByRole("button", { name: /add/i });
    expect(addSubmit).toBeDisabled();
  });
  test("adding unit successfully", async () => {
    render(
      <UnitsAddForm
        handleAddUnit={handleAddUnit}
        handleCloseForm={handleCloseForm}
        handleUpdateUnit={handleUpdateUnit}
        idToUpdate={""}
        unitToUpdate={{
          _id: "",
          unitOfMeasure: "",
          baseUnit: "",
          conversionFactor: 0,
        }}
      />
    );
    const unitMeasure = screen.getByLabelText(/Measure of Unit/);
    const baseUnit = screen.getByLabelText(/Base Unit/);
    const conversionFactor = screen.getByLabelText(/Conversion Factor/);
    expect(unitMeasure).toBeInTheDocument();
    expect(baseUnit).toBeInTheDocument();
    expect(conversionFactor).toBeInTheDocument();
    const addSubmit = screen.getByRole("button", { name: /add/i });
    expect(addSubmit).toBeInTheDocument();
    await fireEvent.change(unitMeasure, { target: { value: "hhh" } });
    await fireEvent.change(baseUnit, { target: { value: "iii" } });
    await fireEvent.change(conversionFactor, { target: { value: 1 } });
    await fireEvent.click(addSubmit);
    expect(handleAddUnit).toBeCalled();
    waitFor(() => {
      const addUnitModal = document.getElementById("unitsPage");
      expect(addUnitModal).not.toBeInTheDocument();
      const newUnit = screen.getByText(/hhh/i);
      expect(newUnit).toBeInTheDocument();
      const newBaseUnit = screen.getByText(/iii/i);
      expect(newBaseUnit).toBeInTheDocument();
      const newConcersionFactor = screen.getByText(/1/i);
      expect(newConcersionFactor).toBeInTheDocument();
    });
  });
  test("update Unit successfully", async () => {
    render(
      <UnitsAddForm
        handleAddUnit={handleAddUnit}
        handleCloseForm={handleCloseForm}
        handleUpdateUnit={handleUpdateUnit}
        idToUpdate={"sdhghg"}
        unitToUpdate={{
          _id: "sdhghg",
          unitOfMeasure: "gram",
          baseUnit: "kilo",
          conversionFactor: 0.001,
        }}
      />
    );
    const unitMeasure = screen.getByLabelText(/Measure of Unit/);
    const baseUnit = screen.getByLabelText(/Base Unit/);
    const conversionFactor = screen.getByLabelText(/Conversion Factor/);
    const updateSubmit = screen.getByRole("button", { name: /update/i });
    expect(updateSubmit).toBeInTheDocument();
    await fireEvent.change(unitMeasure, { target: { value: "leter" } });
    await fireEvent.change(baseUnit, { target: { value: "millileter" } });
    await fireEvent.change(conversionFactor, { target: { value: 1000 } });
    await fireEvent.click(updateSubmit);
    expect(handleUpdateUnit).toBeCalled();
    waitFor(() => {
      const addUnitModal = document.getElementById("unitsPage");
      expect(addUnitModal).not.toBeInTheDocument();
      const newUnit = screen.getByText(/leter/i);
      expect(newUnit).toBeInTheDocument();
      const newBaseUnit = screen.getByText(/millileter/i);
      expect(newBaseUnit).toBeInTheDocument();
      const newConcersionFactor = screen.getByText(/1000/i);
      expect(newConcersionFactor).toBeInTheDocument();
      const oldUnit = screen.getByText(/gram/i);
      expect(oldUnit).not.toBeInTheDocument();
      const oldBaseUnit = screen.getByText(/kilo/i);
      expect(oldBaseUnit).not.toBeInTheDocument();
    });
  });
});

describe('Table of Units', ()=>{
  const handleDeleteUnit = vi.fn()
  const handleChangeUnitToUpdate = vi.fn()
  const handleChangeIdToUpdate = vi.fn()
  const setIsAddModalOpen = vi.fn()
  const fullUnitsArray = [{
    _id:"dkdlfsjsdffsdsfd",
    unitOfMeasure:"kilogram",
    baseUnit: 'gram',
    conversionFactor: 1000,
    },
  ]
  beforeEach(() => {
    render(<TableOfUnits
      handleDeleteUnit={handleDeleteUnit}
      units={fullUnitsArray}
      handleChangeUnitToUpdate={handleChangeUnitToUpdate}
      handleChangeIdToUpdate={handleChangeIdToUpdate}
      setIsAddModalOpen={setIsAddModalOpen} />);
  });
  test('should display table head when there are no errors in the data.',()=>{
    const unitMeasureTableHead = screen.getByText(/Unit of Measure/);
    const baseUnitTableHead = screen.getByText(/Base Unit/);
    const conversionFactorTableHead = screen.getByText(/Conversion factor/);
    const DeleteTableHead = document.getElementById('deleteHeadCell')
    const EditTableHead = document.getElementById('editHeadCell')
    expect(unitMeasureTableHead).toBeInTheDocument();
    expect(baseUnitTableHead).toBeInTheDocument();
    expect(conversionFactorTableHead).toBeInTheDocument();
    expect(DeleteTableHead).toBeInTheDocument();
    expect(EditTableHead).toBeInTheDocument();
  })
  test('should display table with units and their details when there are no errors in the data.',()=>{
    const unitMeasureTableBody = screen.getByText(/kilogram/);
    const baseUnitTableBody = screen.getByText('gram');
    const conversionFactorTableBody = screen.getByText(/1000/);
    const deleteTableBody = screen.getByLabelText('delete')
    const EditTableBody = screen.getByLabelText('edit')
    expect(unitMeasureTableBody).toBeInTheDocument();
    expect(baseUnitTableBody).toBeInTheDocument();
    expect(conversionFactorTableBody).toBeInTheDocument();
    expect(deleteTableBody).toBeInTheDocument();
    expect(EditTableBody).toBeInTheDocument();
  })
  test('should delete unit when clicked delete button',()=>{
    const deleteTableBody = screen.getByLabelText('delete')
    fireEvent.click(deleteTableBody);
    expect(handleDeleteUnit).toBeCalled();
    waitFor(()=>{
      const unitMeasureTableBody = screen.getByText(/kilogram/);
      const baseUnitTableBody = screen.getByText('gram');
      const conversionFactorTableBody = screen.getByText(/1000/);
      expect(unitMeasureTableBody).not.toBeInTheDocument();
      expect(baseUnitTableBody).not.toBeInTheDocument();
      expect(conversionFactorTableBody).not.toBeInTheDocument();
    })
  })
  test('should delete unit when clicked delete button',()=>{
    const editTableBody = screen.getByLabelText('edit')
    fireEvent.click(editTableBody);
    expect(handleChangeUnitToUpdate).toBeCalled()
    expect(handleChangeIdToUpdate).toBeCalled()
    expect(setIsAddModalOpen).toBeCalled()
  })
})

