import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box>
      <img
        style={{display:"inline-block", verticalAlign:"middle" , borderRadius: "100%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
      </Box>

  );
};

export default UserImage;