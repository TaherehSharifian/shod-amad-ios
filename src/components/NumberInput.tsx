import React from "react";
import { InputAdornment } from "@mui/material";
import { RequiredLabel, RoundedTextField } from "../utils/StyledComponents";
import { toEnglishDigits, toPersianDigits } from "../utils/numberConversions";
import { removeZeros as rmZeros } from "../utils/numberConversions";
import { onlyNumbers } from "../utils/inputControls";

interface IProps {
  value: string | number | undefined;
  onChange: (val: string) => void;
  label: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  size?: "medium" | "small";
  maxLength?: number;
  removeZeros?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean; // <-- اضافه شد
}

const NumberInput: React.FC<IProps> = ({
  value,
  onChange,
  maxLength = 100,
  label,
  error,
  helperText,
  required,
  size = "small",
  removeZeros = false,
  fullWidth = true,
  icon,
  disabled = false, // <-- اضافه شد
}) => {
  return (
    <RoundedTextField
      value={
        value
          ? removeZeros
            ? rmZeros(toPersianDigits(value))
            : toPersianDigits(value)
          : ""
      }
      autoComplete="off"
      onChange={(e) => !disabled && onChange(toEnglishDigits(e.target.value))}
      label={required ? <RequiredLabel>{label}</RequiredLabel> : label}
      error={error}
      helperText={toPersianDigits(helperText || "")}
      fullWidth={fullWidth}
      onKeyPress={(e) => !disabled && onlyNumbers(e)}
      inputProps={{
        maxLength: maxLength,
        autoComplete: "off",
        inputMode: "numeric",
        style: { textAlign: "right" },
        readOnly: disabled, // <-- اعمال شد
      }}
      size={size}
      disabled={disabled} // <-- اعمال شد
      InputProps={{
        endAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
      }}
    />
  );
};

export default NumberInput;
