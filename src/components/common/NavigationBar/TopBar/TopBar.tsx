import "./TopBar.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TopBar = ({ children, ...attrs }: Props) => {
  return (
    <div className="navigation-bar" {...attrs}>
      {children}
    </div>
  );
};

export default TopBar;
