
import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_-+=<>?/{}[]~";

    let generated = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generated += charset[randomIndex];
    }
    setPassword(generated);
  }, [length, includeNumbers, includeSymbols]);

  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      navigator.clipboard.writeText(password);
    }
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeSymbols, generatePassword]);

  return (
    <div className="app-container">
      <h1 className="title">🔐 Password Generator</h1>

      <div className="password-box">
        <input
          type="text"
          ref={passwordRef}
          value={password}
          readOnly
          className="password-input"
        />
        <button onClick={copyToClipboard} className="copy-btn">
          Copy
        </button>
      </div>

      <div className="controls">
        <div className="control">
          <label htmlFor="length">Length: {length}</label>
          <input
            type="range"
            id="length"
            min={6}
            max={30}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="numbers"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers((prev) => !prev)}
          />
          <label htmlFor="numbers">Include Numbers</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="symbols"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols((prev) => !prev)}
          />
          <label htmlFor="symbols">Include Symbols</label>
        </div>
      </div>
    </div>
  );
}

export default App;
