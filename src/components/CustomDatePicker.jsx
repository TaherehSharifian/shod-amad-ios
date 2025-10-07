import React, { useState, useRef } from "react";
import { TextField, InputAdornment } from "@mui/material";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import opacity from "react-element-popper/animations/opacity";
import { DateObject } from "react-multi-date-picker";

const CustomDatePicker = ({
  label,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef();

  const handleDateChange = (date) => {
    if (date instanceof DateObject) {
      onChange(date.format("YYYY/MM/DD"));
    } else {
      onChange("");
    }
    setIsOpen(false);
  };

  const openCalendar = () => {
    setIsOpen(true);
    datePickerRef.current?.openCalendar();
  };

  const displayDate = (dateString) => {
    if (!dateString) return "";
    try {
      const dateObject = new DateObject({
        date: dateString,
        calendar: persian,
        locale: persian_fa,
      });
      return dateObject.format("YYYY/MM/DD");
    } catch (error) {
      console.error("Error parsing date:", error);
      return "";
    }
  };

  return (
    <DatePicker
      ref={datePickerRef}
      value={value}
      onChange={handleDateChange}
      format="YYYY/MM/DD"
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      animations={[opacity()]}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      style={{ zIndex: 1000 }}
      disabled={disabled}
      readOnly={disabled}
      render={({ inputRef, ...inputProps }) => {
        return (
          <TextField
            {...inputProps}
            inputRef={inputRef}
            fullWidth
            label={label}
            error={error}
            helperText={helperText}
            value={displayDate(value)}
            disabled={disabled}
            sx={{
              borderRadius: "9px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "9px",
              },
              "& .MuiSelect-select": {
                borderRadius: "9px",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "9px",
                fontSize: "16px",
                height: "45px",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" disablePointerEvents={disabled}>
                  <InsertInvitationIcon
                    className="text-zinc-500 cursor-pointer"
                    onClick={openCalendar}
                  />
                </InputAdornment>
              ),
            }}
            onFocus={openCalendar}
            InputLabelProps={{
              shrink: isOpen || value !== "",
            }}
            FormHelperTextProps={{ sx: { fontSize: "15px" } }}
          />
        );
      }}
    />
  );
};

export default CustomDatePicker;
