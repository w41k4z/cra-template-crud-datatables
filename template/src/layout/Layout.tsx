import Header from "./header";
import Nav from "./nav";

import "./layout.css";

type LayoutProps = {
  children: React.ReactNode;
};

const header = <h4>Start Bootstrap</h4>;

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="d-flex">
      <Nav header={header} currentPageIndex={-1} />
      <main className="main-content">
        <Header />
        <section className="d-flex flex-wrap px-1 justify-content-center">
          <div className="card mt-4 p-sm-1 p-md-3" style={{ width: "95%" }}>
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Layout;
