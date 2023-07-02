import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { _token, getCategories } from "../../Utils/Utils";
import { CategoryObj } from "../../Utils/Types";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface FilterProps {
    filterValue:string;
    handleChangeFilterValue:(val:string)=>void;
}
const FilterComponent: React.FC<FilterProps> = ({filterValue, handleChangeFilterValue}) => {
    const [categories, setCategories] = useState<CategoryObj[]>([]);

    useEffect(() => {
        getCategories(_token, setCategories);
      }, []);
  return (
    <FormControl sx={{ m: "10px", width: 300, backgroundColor: "white" }}>
      <InputLabel id="demo-multiple-name-label">Filter By Category</InputLabel>
      <Select
        value={filterValue}
        onChange={(e: SelectChangeEvent) => handleChangeFilterValue(e.target.value)}
        input={<OutlinedInput label="Filter By Category" />}
        MenuProps={MenuProps}
      >
        <MenuItem key={"dasjldsdfdsfsd"} value={""}>
          ...
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category._id} value={category.category}>
            {category.category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterComponent;
