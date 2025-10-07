import React from "react";
import { TextField, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export const RoundedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "9px",
    fontSize: "19px",
  },
  "& .MuiFormHelperText-root": {
    fontSize: "15px",
  },
});

export const RoundedSelect = styled(Select)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "9px !important",
  },
  "& .MuiSelect-select": {
    borderRadius: "9px !important",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiPaper-root": {
    borderRadius: "9px !important",
  },
  "& .MuiMenu-list": {
    padding: "4px !important",
  },
}));

interface RequiredLabelProps {
  children: React.ReactNode;
}

export const RequiredLabel: React.FC<RequiredLabelProps> = ({ children }) => (
  <span>
    {children}
    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
  </span>
);

export const StyledAddIcon = styled(AddRoundedIcon)(() => ({
  fontWeight: "bold",
  fontSize: "15px",
  mr: "5px",
  ml: "-100px",
  mb: "10px",
  strokeWidth: 2,
  stroke: "currentColor",
  "& path": {
    strokeWidth: 2,
  },
}));

export const StyledDoneAllIcon = styled(DoneAllIcon)(() => ({
  fontWeight: "normal",
  fontSize: "15px",
  mr: "5px",
  ml: "-100px",
  mb: "10px",
  strokeWidth: 1,
  stroke: "currentColor",
  "& path": {
    strokeWidth: 1,
  },
}));
