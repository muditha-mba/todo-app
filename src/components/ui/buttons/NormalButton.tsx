import "../../../styles/components/ui/buttons/normalButton.scss";

type Props = {
  onClick?: (event: React.MouseEvent) => void;
  icon?: JSX.Element;
  value: string;
  classes?: string;
  loading?: boolean;
  disabled?: boolean;
  normal?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  buttonType?: "danger" | "warning" | "success" | "light" | "filter";
  form?: string;
  message?: string;
};

function NormalButton({
  onClick,
  icon,
  value,
  type,
  disabled,
  classes = "",
  normal,
  buttonType,
  form,
  message,
}: Props) {
  let isNormalButton;
  if (normal) isNormalButton = "true";
  else isNormalButton = "false";

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={"normalButton" + (" " + classes)}
      data-main-square-button-normal={isNormalButton}
      data-main-square-button-type={buttonType}
      form={form}
      title={disabled ? message : ""}
    >
      {icon}
      <p>{value}</p>
    </button>
  );
}

export default NormalButton;
