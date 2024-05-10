export const H2 = ({ children, ...rest }: { children: React.ReactNode }) => {
  return (
    <h2 className="mb-10 text-4xl font-bold text-center" {...rest}>
      {children}
    </h2>
  );
};
