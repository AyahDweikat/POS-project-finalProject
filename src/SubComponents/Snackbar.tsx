import React, { useEffect, useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface SnackbarProps {
  snackBarMsg?: string;
}
const SnackbarComponent: React.FC<SnackbarProps> = ({ snackBarMsg }) => {
  useEffect(() => {
    if (snackBarMsg) {
      handleShowSnackBar();
    }
  }, [snackBarMsg]);
  const [open, setOpen] = useState<boolean>(false);
  const handleShowSnackBar = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={snackBarMsg}
      action={action}
    />
  );
};

export default SnackbarComponent;
