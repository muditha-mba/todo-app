import "../../../styles/components/ui/buttons/primaryButton.scss";

type props = {
  onClick?: (event: React.MouseEvent) => void;
  value: string;
  classes?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  form?: string;
  children?: React.ReactNode;
};

const PrimaryButton: React.FC<props> = ({
  onClick,
  children,
  value,
  type,
  disabled,
  classes = "",
  form,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      form={form}
      className={"primaryButton" + (" " + classes)}
    >
      {value}
      {children}
    </button>
  );
};

export default PrimaryButton;
