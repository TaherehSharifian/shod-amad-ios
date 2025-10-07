const toPersianDigits = (num: number | string): string => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  if (typeof num === "number")
    return num?.toString().replace(/\d/g, (digit: any) => persianDigits[digit]);
  if (typeof num === "string")
    return num.replace(/\d/g, (digit: any) => persianDigits[digit]);
  return "";
};

const stringFloatToPersianDigits = (input: string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // Function to convert a single part (integer or fractional)
  const convertPart = (part: string): string => {
    return part
      .split("")
      .map((char) => {
        const index = englishDigits.indexOf(char);
        return index !== -1 ? persianDigits[index] : char;
      })
      .join("");
  };

  // Split the input into integer and fractional parts
  const [integerPart, fractionalPart] = input.split(".");

  // Convert both parts
  const convertedIntegerPart = convertPart(integerPart);
  const convertedFractionalPart = fractionalPart
    ? convertPart(fractionalPart)
    : "";

  // Combine the parts, using Persian decimal separator (U+066B: ARABIC DECIMAL SEPARATOR)
  return convertedFractionalPart
    ? `${convertedIntegerPart}/${convertedFractionalPart}`
    : convertedIntegerPart;
};

const toEnglishDigits = (num: string): any => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";

  return num.replace(/[۰-۹]/g, (digit) => {
    return englishDigits[persianDigits.indexOf(digit)];
  });
};
const convertPersianToEnglishNumbers = (
  input: string | number | undefined | null
): string => {
  if (input === undefined || input === null) return "";

  // Convert any input to string
  const str = input.toString();

  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return str
    .split("")
    .map((char) => {
      const index = persianNumbers.indexOf(char);
      return index !== -1 ? englishNumbers[index] : char;
    })
    .join("");
};

const digitDivider = (str: string) => {
  str = str?.replace(/\,/g, "");
  var objRegex = new RegExp("(-?[۰-۹]+)([۰-۹]{3})");

  while (objRegex.test(str)) {
    str = str.replace(objRegex, "$1,$2");
  }

  return str;
};

const removeCommas = (str: string): string => {
  // Remove commas from the string
  return str?.replace(/\,/g, "");
};

const removeZeros = (str: string) => {
  let i = 0;
  while (i < str?.length && str[i] === "۰") {
    i++;
  }
  // If the entire string consists of zeros, return '0'
  // if (i === str?.length) {
  //   return "۰";
  // }
  return str?.substring(i);
};
const toPersianLetters = (num: number) => {
  const ones = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
  const tens = [
    "",
    "ده",
    "بیست",
    "سی",
    "چهل",
    "پنجاه",
    "شصت",
    "هفتاد",
    "هشتاد",
    "نود",
  ];
  const teens = [
    "ده",
    "یازده",
    "دوازده",
    "سیزده",
    "چهارده",
    "پانزده",
    "شانزده",
    "هفده",
    "هجده",
    "نوزده",
  ];
  const hundreds = [
    "",
    "یکصد",
    "دویست",
    "سیصد",
    "چهارصد",
    "پانصد",
    "ششصد",
    "هفتصد",
    "هشتصد",
    "نهصد",
  ];
  const thousands = ["", "هزار", "میلیون", "میلیارد"];

  if (num === 0) return "صفر";

  let word = "";

  let numStr = num.toString();

  // Processing each 3-digit chunk
  for (let i = 0; i < numStr.length; i += 3) {
    const chunk = parseInt(
      numStr.substring(Math.max(0, numStr.length - 3 - i), numStr.length - i),
      10
    );

    if (chunk) {
      let chunkWord = "";

      // Hundreds
      chunkWord += hundreds[Math.floor(chunk / 100)];

      // Tens and Ones
      const remainder = chunk % 100;
      if (remainder < 10) {
        chunkWord +=
          (chunkWord && ones[remainder] ? " و " : "") + ones[remainder];
      } else if (remainder < 20) {
        chunkWord += (chunkWord ? " و " : "") + teens[remainder - 10];
      } else {
        chunkWord +=
          (chunkWord ? " و " : "") + tens[Math.floor(remainder / 10)];
        chunkWord += remainder % 10 ? " و " + ones[remainder % 10] : "";
      }

      // Thousands, Millions, etc.
      chunkWord += (chunkWord ? " " : "") + thousands[Math.floor(i / 3)];

      word = chunkWord + (word ? " و " + word : "");
    }
  }

  return word;
};

export {
  toPersianDigits,
  stringFloatToPersianDigits,
  toEnglishDigits,
  digitDivider,
  removeCommas,
  removeZeros,
  toPersianLetters,
  convertPersianToEnglishNumbers,
};
