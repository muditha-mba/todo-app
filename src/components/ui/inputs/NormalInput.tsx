import React, { useEffect, useState } from "react";
import "../../../styles/components/ui/inputs/normalInput.scss";

type props = {
  type?: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  changeListeners?: ((
    e: React.ChangeEvent<HTMLInputElement>,
    option?: string
  ) => void)[];
  focusListeners?: ((e: React.FocusEvent) => void)[];
  id: string;
  style?: React.CSSProperties;
  classes?: string;
  innerPlaceholder?: string;
  readonly?: boolean;
  pattern?: string;
  title?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  labelClasses?: string;
  disabled?: boolean;
  maxlength?: number;
  minlength?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const NormalInput = React.forwardRef<HTMLInputElement, props>(
  (
    {
      value,
      changeListeners,
      focusListeners,
      placeholder = "",
      type = "text",
      required,
      id,
      style,
      classes = "",
      innerPlaceholder,
      readonly,
      pattern,
      title,
      defaultValue,
      autoFocus,
      labelClasses,
      disabled,
      maxlength,
      minlength,
      onKeyDown,
    }: props,
    ref
  ) => {
    const [innerValue, setValue] = useState<string | undefined>(value);
    const [focused, setFocused] = useState<boolean>(false);
    const [onlyOnFocus, setOnlyOnFocus] = useState<boolean>(false);

    useEffect(() => {
      setValue(value);
    }, [value]);

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
      <div className="normalInput-outer">
        <div className="normalInput">
          <input
            ref={ref}
            id={id}
            className={classes}
            style={{ fontFamily: "var(--main-font-secondary)", ...style }}
            type={type}
            value={innerValue}
            onChange={handleChangeValue}
            onFocus={handleFocusElement}
            required={required}
            placeholder={innerPlaceholder}
            readOnly={readonly}
            onBlur={handleBlur}
            data-focused={focused.toString()}
            pattern={pattern}
            title={title}
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            disabled={disabled}
            maxLength={maxlength}
            minLength={minlength}
            onKeyDown={onKeyDown}
          />
          <label className={labelClasses} htmlFor={id}>
            {placeholder}
          </label>
        </div>
        <div className="normalInput-validation-text">
          {onlyOnFocus && title}
        </div>
      </div>
    );
  }
);

export default NormalInput;
