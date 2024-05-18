import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [IsNumber, SetIsNumber] = useState(false);
  const [IsChar, SetIsChar] = useState(false);
  const [password, SetPassword] = useState("");

  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(() => {
    let PassWord = "";
    let Str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWXYZ";

    if (IsNumber) Str += "0123456789";
    if (IsChar) Str += "!@#$%^&*(){}[]";

    for (let i = 0; i < length; i++) {
      let char = Math.round(Math.random() * Str.length + 1);
      PassWord += Str.charAt(char);

      SetPassword(PassWord);
    }
  }, [length, IsNumber, IsChar, SetPassword]);

  // PasswordGenerator()

  useEffect(() => {
    PasswordGenerator();
  }, [length, IsNumber, IsChar, PasswordGenerator]);

 const CopyPassword = useCallback(() => {
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
 },[password])


  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-400	 bg-purple-700">
      <h1 className="text-white py-2 text-center my-3 text-2xl">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-3 px-3"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button className="bg-blue-500 text-white px-3 py-0.5 shrink-0 outline-none" onClick={CopyPassword}>
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer outline-none "
            type="range"
            min={8}
            max={50}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length:{length}</label>
        </div>
        <div className="flex text-sm py-3 gap-x-2">
          <input
            className="cursor-pointer outline-none "
            type="checkbox"
            defaultChecked={IsNumber}
            id="numberInput"
            onChange={() => {
              SetIsNumber((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex text-sm py-3 gap-x-2">
          <input
            className="cursor-pointer outline-none "
            type="checkbox"
            defaultChecked={IsChar}
            id="charInput"
            onChange={() => {
              SetIsChar((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
