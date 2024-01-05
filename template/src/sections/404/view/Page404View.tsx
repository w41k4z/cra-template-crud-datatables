import page404 from "../../../assets/images/404-page.png";

import "../404.css";

const Page404View = () => {
  return (
    <div className="page d-flex flex-column align-items-center">
      <section className="my-3 w-50">
        <img src={page404} alt="404" className="img-fluid w-100" />
      </section>
    </div>
  );
};

export default Page404View;
