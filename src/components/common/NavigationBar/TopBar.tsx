interface Props extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

const TopBar = ({ children, ...attrs }: Props) => {
  return <ul {...attrs}>{children}</ul>;
};

export default TopBar;
