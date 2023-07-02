import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Typography, TextField, Box } from "@mui/material";
import styles from "./product.module.css";

interface SearchProps {
    handleChangeSearchValue:(val:string)=>void;
}

const SearchForm:React.FC<SearchProps> = ({handleChangeSearchValue}) => {
  return (
    <Box className={styles.searchFormControl}>
      <TextField
        className={styles.searchInput}
        onChange={(e) => handleChangeSearchValue(e.target.value)}
        fullWidth
        label={
          <Box className={styles.labelSearch} sx={{ color: "primary.main" }}>
            <SearchRoundedIcon sx={{ fontSize: "22px" }} />
            <Typography sx={{ fontSize: "15px" }}>Search</Typography>
          </Box>
        }
        id="fullWidth"
      />
    </Box>
  );
};

export default SearchForm;
