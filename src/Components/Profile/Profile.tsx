import { Avatar, Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { fetchApiWithAuthNoBody } from "../fetchApi";
interface User {
  _id: string;
  userName: string;
  email: string;
  profilePic: string;
}
function Profile() {
  const _token: string | null = localStorage.getItem("token") || "";
  const [userData, setUserData] = useState<User>({_id:'', userName:'', email:'', profilePic:''});
  const fetchData = async (_token: string) => {
    const results = await fetchApiWithAuthNoBody(
      "GET",
      `https://posapp.onrender.com/user/getProfile`,
      `black__${_token}`
    );
    if (results.message == "user profile") {
      setUserData(results.user);
    }
    return results;
  };
  useEffect(() => {
    fetchData(_token);
  }, [_token]);
  const handleFileChange=()=>{
    console.log("first")
  }
  return (
    <>
      <Box sx={{ position: "relative", width: "40%", margin: "auto" }}>
        <Avatar
          alt={userData.userName}
          src={userData.profilePic}
          sx={{
            width: 200,
            height: 200,
            margin: "auto",
            mt: "40px",
            fontSize: "100px",
          }}
        />
        <Button
        // type="file" onChange={handleFileChange}
          sx={{
            backgroundColor: "primary.light",
            p: "10px",
            pb: "3px",
            borderRadius: "50%",
            position: "absolute",
            zIndex: "8",
            top: "150px",
            right: "70px",
          }}
          
        >
          <CameraAltIcon sx={{ color: "secondary.main" }} />
        </Button>

        <Typography sx={{textAlign:"left", ml:"50px"}}>User Name: {userData.userName}</Typography>
        <Typography sx={{textAlign:"left", ml:"50px"}}>Email: {userData.email}</Typography>
      </Box>
    </>
  );
}

export default Profile;
