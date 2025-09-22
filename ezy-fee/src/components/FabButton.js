import React from "react";
import { Fab } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const FabButton = ({ onClick }) => {
  return (
    <Fab
      color="primary"
      onClick={onClick}
      sx={{
        position: "absolute",
        top: -30,
        left: "50%",
        transform: "translateX(-80%)",
      }}
    >
      <FontAwesomeIcon icon={faPlus} />
    </Fab>
  );
};

export default FabButton;
