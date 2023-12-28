import { BsSearch } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="head-nav sticky-top px-md-5 px-sm-2 d-flex justify-content-between align-items-center">
      <div className="search-bar d-flex align-items-center w-25">
        <input className="border-less" type="search" placeholder="Search..." />
        <span style={{ fontSize: "25px", color: "white" }} className="ms-2">
          <BsSearch />
        </span>
      </div>
      <div className="profile">
        <button
          onClick={logout}
          className="btn btn-danger d-flex align-items-center"
        >
          <span>
            <FiLogOut />
          </span>
          <span className="d-none ms-md-2 d-md-block">Log out</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
