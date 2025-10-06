import React from "react";
import { Fab } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon icon={faSearch} />
    </Fab>
  );
};

export default FabButton;
