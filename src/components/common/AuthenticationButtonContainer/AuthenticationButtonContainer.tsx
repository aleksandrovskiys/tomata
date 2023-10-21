export function AuthenticationButtonContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {children}
    </div>
  );
}
