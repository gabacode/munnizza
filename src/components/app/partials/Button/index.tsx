export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: string;
}) => (
  <button className="btn btn-light" onClick={onClick}>
    {children}
  </button>
);
