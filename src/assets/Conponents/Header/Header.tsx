import React, { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  items: string[];
  setSelectedItem: (index: number) => void;
}

function Header() {
  const items = ["Home", "About"];
  // const items = {name: "Home", path: "/"}
  const [SelectedItem, setSelectedItem] = useState(0);

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg px-3">
        <div className="container-fluid">
          <a href="#" className="navbar-brand">
            <span className="fs-4">Lijin Lekshman</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenuBar"
            aria-controls="navMenuBar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navMenuBar"
          >
            <div className="navbar-nav">
              {items.map((items, index) => {
                return (
                  <a
                    key={index}
                    // to={`/${items}`}
                    href="#"
                    className={
                      SelectedItem === index ? "nav-link active" : "nav-link"
                    }
                    onClick={() => {
                      setSelectedItem(index);
                    }}
                  >
                    {" "}
                    {items}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
