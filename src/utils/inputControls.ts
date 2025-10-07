const restrictEnglighLeter = (event: React.KeyboardEvent<HTMLDivElement>) => {
  const charCode = event.charCode || event.keyCode;

  // Check if the character code is within the range of English letters (A-Z, a-z)
  if (
    (charCode >= 65 && charCode <= 90) || // A-Z
    (charCode >= 97 && charCode <= 122) // a-z
  ) {
    event.preventDefault();
  }
};

const persianLeterAndDigit = (
  event: React.KeyboardEvent<HTMLDivElement>,
  onChange: (...event: any[]) => void,
  value: string
) => {
  const charCode = event.charCode || event.keyCode;

  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  // Check if the character code is within the range of English letters (A-Z, a-z)
  if (
    (charCode >= 65 && charCode <= 90) || // A-Z
    (charCode >= 97 && charCode <= 122) // a-z
  ) {
    event.preventDefault();
  }
  // Check if the character is a digit (0-9)
  if (charCode >= 48 && charCode <= 57) {
    event.preventDefault();
    // Convert English digit to Persian digit
    const persianDigit = persianDigits[charCode - 48];
    onChange(value + persianDigit);
  }
};

const handleEmail = (event: React.KeyboardEvent<HTMLDivElement>) => {
  const charCode = event.charCode || event.keyCode;
  const char = String.fromCharCode(charCode);

  const regex = /^[a-zA-Z0-9@._+-]+$/;

  if (!regex.test(char)) {
    event.preventDefault();
  }
};

const onlyNumbers = (
  event:
    | React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    | React.KeyboardEvent<HTMLDivElement>
) => {
  const charCode = event.charCode || event.keyCode;

  // Allow only numbers (0-9)
  if (
    (charCode < 48 || charCode > 57) &&
    (charCode < 1776 || charCode > 1785)
  ) {
    event.preventDefault();
  }
};

const isValidShuttleServiceCode = (key: string) => {
  // Regular expression to match English letters, numbers, and underscore
  const regex = /^[a-zA-Z0-9_]$/;
  return regex.test(key);
};

const isAllowedControlKey = (key: string) => {
  // Allow control keys: Backspace, Delete, Tab, Arrow keys, etc.
  const controlKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Enter",
  ];
  return controlKeys.includes(key);
};

const controlShuttleServiceCode = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (!isValidShuttleServiceCode(e.key) && !isAllowedControlKey(e.key))
    e.preventDefault();
};

const onlyPersionDigits = (
  event:
    | React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    | React.KeyboardEvent<HTMLDivElement>
) => {
  // Regular expression to match Persian letters and space
  const persianRegex = /^[\u0600-\u06FF\s]+$/;

  // Get the character from the event
  const char = event.key;

  // If the character is not a Persian letter, prevent the input
  if (!persianRegex.test(char)) {
    event.preventDefault();
  }
};

const onlyPositiveAndNegativeFloatNumber = (
  event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  value: string
) => {
  const { key } = event;

  // Allow navigation keys
  if (
    key === "Backspace" ||
    key === "Delete" ||
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "Tab"
  ) {
    return;
  }

  // Allow digits (english and persian)
  if (/[\d۰-۹]/.test(key)) {
    return;
  }

  // Allow one dot (.)
  if (key === "." && !value.includes(".")) {
    return;
  }

  // Allow + or - but only at the beginning
  if ((key === "+" || key === "-") && value.length === 0) {
    return;
  }

  // Otherwise, block input
  event.preventDefault();
};

export {
  restrictEnglighLeter,
  persianLeterAndDigit,
  handleEmail,
  onlyNumbers,
  isValidShuttleServiceCode,
  isAllowedControlKey,
  controlShuttleServiceCode,
  onlyPersionDigits,
  onlyPositiveAndNegativeFloatNumber,
};
