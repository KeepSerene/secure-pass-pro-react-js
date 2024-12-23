import { createContext, useContext, useState } from "react";

const PasswordContext = createContext();

export default function PasswordProvider({ children }) {
  const [charLength, setCharLength] = useState(10);
  const [options, setOptions] = useState([
    {
      isIncluded: false,
      name: "Include uppercase letters",
      value: String.fromCharCode(
        ...Array(26)
          .fill()
          .map((_, index) => 65 + index)
      ),
    },

    {
      isIncluded: false,
      name: "Include lowercase letters",
      value: String.fromCharCode(
        ...Array(26)
          .fill()
          .map((_, index) => 97 + index)
      ),
    },

    {
      isIncluded: false,
      name: "Include numbers",
      value: String.fromCharCode(
        ...Array(10)
          .fill()
          .map((_, index) => 48 + index)
      ),
    },

    {
      isIncluded: false,
      name: "Include symbols",
      value: "!@#$%^&*()_+[]{}|;:',.<>?/~`",
    },
  ]);
  const [strength, setStrength] = useState("");
  const [password, setPassword] = useState("");

  const handleCharLengthChange = (event) => {
    setCharLength(event.target.value);
  };

  const handleOptionChange = (index) => {
    const updatedOptions = options.map((option, idx) =>
      idx === index ? { ...option, isIncluded: !option.isIncluded } : option
    );

    setOptions(updatedOptions);
  };

  const calculateStrength = () => {
    const checkedOptions = options.filter((option) => option.isIncluded).length;

    if (checkedOptions === 0) {
      setPassword("");
      alert("Please select at least one option to generate a new password!");

      return null;
    }

    // Calculate strength based on both character length and option count
    if (charLength <= 8) {
      if (checkedOptions <= 2) return "too weak";
      if (checkedOptions === 3) return "weak";

      return "medium";
    }

    if (charLength <= 12) {
      if (checkedOptions === 1) return "too weak";
      if (checkedOptions === 2) return "weak";
      if (checkedOptions === 3) return "medium";

      return "strong";
    }

    if (checkedOptions === 1) return "weak";
    if (checkedOptions === 2) return "medium";

    return "strong";
  };

  const generatePassword = () => {
    const strengthLevel = calculateStrength();

    if (!strengthLevel) return;

    setStrength(strengthLevel);

    let chars = "";

    for (let i = 0; i < options.length; i++) {
      if (options[i].isIncluded) chars += options[i].value;
    }

    let newPassword = "";

    for (let i = 0; i < charLength; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(newPassword);
  };

  return (
    <PasswordContext.Provider
      value={{
        charLength,
        options,
        handleCharLengthChange,
        handleOptionChange,
        strength,
        generatePassword,
        password,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
}

export const usePasswordContext = () => useContext(PasswordContext);
