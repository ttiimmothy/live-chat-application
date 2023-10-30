import { Footer } from "./layout/Footer";
import Navbar from "./layout/Navbar";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
