import React from "react";
import { HTMLProps, ReactNode, useState } from "react";
import { navConfig } from "./config-navigation";
import { Link } from "react-router-dom";

import "../assets/css/nav.css";

type NavProps = HTMLProps<HTMLElement> & {
  header: ReactNode;
  currentPageIndex?: number;
};

const Nav = ({
  header,
  currentPageIndex,
  className = "",
  ...rest
}: NavProps) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  return (
    <nav className={`side-panel ${className}`} {...rest}>
      <span className="d-none d-md-block">{header}</span>
      <hr />
      <ul className="nav nav-pills flex-column align-sm-items-center mb-auto">
        {navConfig.map((navItem, index1) => {
          return (
            <React.Fragment key={`section-${index1}`}>
              <li
                className={"menu-title my-2 d-none d-md-block"}
                style={{ fontWeight: "bold", fontSize: "0.9rem" }}
              >
                {navItem.title}
              </li>
              {navItem.elements.map((element, index2) => {
                return (
                  <li
                    className="nav-item"
                    key={`section-${index1}-item-${index2}`}
                    onClick={() => {
                      setActiveItemIndex(index1 + index2);
                      element.onItemClick();
                    }}
                  >
                    <Link
                      className={
                        activeItemIndex === index1 + index2
                          ? "nav-link active d-flex align-items-center"
                          : "nav-link default text-dark d-flex align-items-center"
                      }
                      to={element.path}
                    >
                      <span
                        className="d-flex align-items-center"
                        style={{ fontSize: "20px" }}
                      >
                        {element.icon}
                      </span>
                      <p className="m-0 ms-3 d-none d-md-block">
                        {element.title}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
