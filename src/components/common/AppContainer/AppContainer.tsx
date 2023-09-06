import "./AppContainer.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AppContainer = ({ children }: Props) => {
  return <div className="app-container">{children}</div>;
};

export default AppContainer;
