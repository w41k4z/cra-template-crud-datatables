import Header from "./layout/header";
import Nav from "./layout/nav";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="d-flex">
      <Nav header={undefined} />
      <main className="content">
        <Header />
        <section className="d-flex flex-wrap px-1 justify-content-center">
          <div className="card mt-4 p-sm-1 p-md-3" style={{ width: "90%" }}>
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Layout;
