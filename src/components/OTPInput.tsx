import React, { useEffect, useRef } from "react";
import { TextField, Box } from "@mui/material";
import { toPersianDigits } from "../utils/numberConversions";

type InputEvent = React.KeyboardEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLDivElement
>;

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, value, onChange }) => {
  const inputs = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) => {
    const input = e.target as HTMLInputElement;
    const val = input.value;

    if (!/^[0-9]$/.test(val) && val !== "") return;

    const newValue = value.split("");
    newValue[i] = val;
    onChange(newValue.join(""));

    if (val && i < length - 1) {
      inputs.current[i + 1].focus();
    }
  };

  const handleKeyDown = (e: InputEvent, i: number) => {
    const input = e.target as HTMLInputElement;
    const key = e.key;

    if (key === "Backspace") {
      if (input.value) {
        const newValue = value.split("");
        newValue[i] = "";
        onChange(newValue.join(""));
      } else if (i > 0) {
        inputs.current[i - 1].focus();
        const newValue = value.split("");
        newValue[i - 1] = "";
        onChange(newValue.join(""));
      }
    }
  };

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, [length]);

  return (
    <Box
      display="flex"
      flexDirection="row-reverse"
      gap={1}
      justifyContent="center"
    >
      {Array.from({ length }).map((_, i) => (
        <TextField
          key={i}
          inputRef={(el) => (inputs.current[i] = el!)}
          value={toPersianDigits(value[i] || "")}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center" },
            inputMode: "numeric",
          }}
          variant="outlined"
          sx={{
            width: 50,
            height: 50,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
      ))}
    </Box>
  );
};

export default OTPInput;
