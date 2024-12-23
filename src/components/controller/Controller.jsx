import "./Controller.css";

// Context import
import { usePasswordContext } from "../PasswordProvider";

function Controller() {
  const {
    charLength,
    options,
    handleCharLengthChange,
    handleOptionChange,
    strength,
    generatePassword,
  } = usePasswordContext();

  return (
    <div className="controller">
      {/* Character length */}
      <label htmlFor="char-length" className="range-label">
        <span>Character length</span>
        <span className="char-len-val">{charLength}</span>
      </label>

      <div
        className="range-wrapper"
        tabIndex={0}
        aria-label={`Set character length to ${charLength}`}
      >
        <input
          type="range"
          id="char-length"
          min={5}
          step={1}
          max={20}
          value={charLength}
          onChange={handleCharLengthChange}
          className="range-input"
        />

        <div
          style={{ width: `calc((${charLength - 5} / 15) * 100%)` }}
          className="range-progress-fill"
        ></div>
      </div>

      {/* Options */}
      {options.map((option, index) => (
        <label
          key={index}
          htmlFor={`option${index}`}
          tabIndex={0}
          className="option-label"
        >
          <input
            type="checkbox"
            id={`option${index}`}
            checked={option.isIncluded}
            onChange={() => handleOptionChange(index)}
            tabIndex={-1}
            className="checkbox-input"
          />

          <div className="checkbox-custom">
            {option.isIncluded && (
              <svg
                width="14"
                height="12"
                xmlns="http://www.w3.org/2000/svg"
                className="check-icon"
              >
                <path
                  stroke="#18171F"
                  strokeWidth="3"
                  fill="none"
                  d="M1 5.607 4.393 9l8-8"
                />
              </svg>
            )}
          </div>

          <span className="option-name">{option.name}</span>
        </label>
      ))}

      {/* Strength */}
      <div className="strength">
        <span className="strength-title">Strength</span>

        <div className="strength-indicators">
          {strength && <span className="strength-status">{strength}</span>}

          <div className={`strength-bars ${strength}`}>
            <div className="strength-bar"></div>
            <div className="strength-bar"></div>
            <div className="strength-bar"></div>
            <div className="strength-bar"></div>
          </div>
        </div>
      </div>

      {/* Generate password */}
      <button type="button" onClick={generatePassword} className="generate-btn">
        <span className="btn-text">Generate</span>

        <svg
          width="12"
          height="12"
          xmlns="http://www.w3.org/2000/svg"
          className="right-arrow-icon"
        >
          <path d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z" />
        </svg>
      </button>
    </div>
  );
}

export default Controller;
