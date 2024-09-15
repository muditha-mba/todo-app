import { useState } from "react";
import "../../../styles/components/ui/inputs/primaryInput.scss";
import React from "react";

type props = {
  icon: React.ReactNode;
  type?: string;
  required?: boolean;
  value: string;
  placeholder?: string;
  changeListeners?: ((e: React.ChangeEvent<HTMLInputElement>) => void)[];
  focusListeners?: ((e: React.FocusEvent) => void)[];
  id: string;
  classes?: string;
  pattern?: string;
  title?: string;
};

const PrimaryInput = React.forwardRef<HTMLInputElement, props>(
  (
    {
      icon,
      value,
      changeListeners,
      focusListeners,
      placeholder = "",
      type = "text",
      required,
      id,
      classes = "",
      pattern,
      title,
    }: props,
    ref
  ) => {
    const [innerValue, setValue] = useState<string>(value);
    const [focused, setFocused] = useState<boolean>(false);
    const [onlyOnFocus, setOnlyOnFocus] = useState<boolean>(false);

    function handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
      setValue(event.target.value);
      changeListeners?.forEach((listener) => listener(event));
    }

    function handleFocusElement(event: React.FocusEvent<HTMLInputElement>) {
      focusListeners?.forEach((listener) => listener(event));
      setOnlyOnFocus(true);
    }

    const handleBlur = () => {
      setFocused(true);
      setOnlyOnFocus(false);
    };

    return (
      <>
        <div className="primaryInput">
          <div className="primaryInput__left">{icon}</div>
          <div className="primaryInput__right">
            <input
              className={`primaryInput-input ${classes}`}
              ref={ref}
              id={id}
              type={type}
              value={innerValue}
              onChange={handleChangeValue}
              onFocus={handleFocusElement}
              onBlur={handleBlur}
              data-focused={focused.toString()}
              required={required}
              pattern={pattern}
              title={title}
            />
            <label htmlFor={id}>{placeholder}</label>
          </div>
        </div>

        <div className="primaryInput-validation-text">
          {onlyOnFocus && title}
        </div>
      </>
    );
  }
);

export default PrimaryInput;
