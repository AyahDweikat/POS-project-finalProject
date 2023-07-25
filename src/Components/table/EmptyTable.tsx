import Typography from "@mui/material/Typography";

const EmptyTable: React.FC = () => {
  return (
    <Typography
      sx={{
        width: "20%",
        mb: "10px",
        textAlign: "center",
        m: "auto",
        color: "green",
      }}
    >
      No Data!
    </Typography>
  );
};

export default EmptyTable;
