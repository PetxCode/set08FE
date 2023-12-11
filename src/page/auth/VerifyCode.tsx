import React, { useRef, useState, useEffect, FC } from "react";
import { FaTimes } from "react-icons/fa";
import { verifyAccount } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";

interface iProps {
  callback?: any;
  reset?: any;
  isLoading?: boolean;
  verifyFunction?: any;
}

const VerifyCode: FC<iProps> = ({
  verifyFunction,
  callback,
  reset,
  isLoading,
}) => {
  const navigate = useNavigate();
  const [code, setCode]: any = useState("");

  // Refs to control each digit input element
  const inputRefs: any = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Reset all inputs and clear state
  const resetCode = () => {
    inputRefs.forEach((ref: React.MutableRefObject<any>) => {
      ref.current.value = "";
    });

    inputRefs[0]?.current?.focus();
    setCode("");
  };

  // Call our callback when code = 6 chars
  useEffect(() => {
    if (code.length === 6) {
      if (typeof callback === "function") callback(code);
      //   resetCode();

      verifyAccount(code).then(() => {
        navigate("/account/login");
      });
      {
        verifyFunction;
      }
    }
  }, [code]); //eslint-disable-line

  // Listen for external reset toggle
  useEffect(() => {
    resetCode();
  }, [reset]); //eslint-disable-line

  // Handle input
  function handleInput(e: any, index: number) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    // Update code state with single digit
    const newCode = [...code];
    // Convert lowercase letters to uppercase
    if (/^[a-z]+$/.test(input.value)) {
      const uc = input.value.toUpperCase();
      newCode[index] = uc;
      inputRefs[index].current.value = uc;
    } else {
      newCode[index] = input.value;
    }
    setCode(newCode.join(""));

    input.select();

    if (input.value === "") {
      // If the value is deleted, select previous input, if exists
      if (previousInput) {
        previousInput.current.focus();
      }
    } else if (nextInput) {
      // Select next input on entry, if exists
      nextInput.current.select();
    }
  }

  // Select the contents on focus
  function handleFocus(e: any) {
    e.target.select();
  }

  // Handle backspace key
  function handleKeyDown(e: any, index: number) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    if ((e.keyCode === 8 || e.keyCode === 46) && input.value === "") {
      e.preventDefault();
      setCode(
        (prevCode: any) => prevCode.slice(0, index) + prevCode.slice(index + 1)
      );
      if (previousInput) {
        previousInput.current.focus();
      }
    }
  }

  // Capture pasted characters
  const handlePaste = (e: any) => {
    const pastedCode = e.clipboardData.getData("text");
    if (pastedCode.length === 6) {
      setCode(pastedCode);
      inputRefs.forEach((inputRef: any, index: number) => {
        inputRef.current.value = pastedCode.charAt(index);
      });
    }
  };

  // Clear button deletes all inputs and selects the first input for entry
  const ClearButton = () => {
    return (
      <div className="w-full flex  justify-center">
        <button onClick={resetCode} className="text-2xl flex items-center">
          <FaTimes />
          <span>Cancel</span>
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 relative">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            className="text-2xl bg-transparent border w-10 flex p-2 text-center"
            key={index}
            type="text"
            maxLength={1}
            onChange={(e) => handleInput(e, index)}
            ref={inputRefs[index]}
            autoFocus={index === 0}
            onFocus={handleFocus}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={isLoading}
          />
        ))}
      </div>
      <div className="">{code.length ? <ClearButton /> : <></>}</div>
    </div>
  );
};

export default VerifyCode;
