interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
