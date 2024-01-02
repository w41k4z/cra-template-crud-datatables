import "../assets/css/404.css";
import page404 from "../assets/images/404-page.png";

const Page404 = () => {
  return (
    <div className="page d-flex flex-column align-items-center">
      <section className="my-3 w-50">
        <img src={page404} alt="404" className="img-fluid w-100" />
      </section>
    </div>
  );
};

export default Page404;
