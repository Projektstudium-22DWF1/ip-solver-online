// components/Tabs/BurgerMenuButton.jsx
import React from "react";

const BurgerMenuButton = () => {
  return (
    <button
      className="uk-navbar-toggle uk-hidden@s"
      uk-toggle="target: #offcanvas-nav"
      aria-label="Open Menu"
      style={{
        width: "40px", 
        height: "40px", 
        backgroundColor: "#fff", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <span uk-navbar-toggle-icon="true"></span>{" "}
    </button>
  );
};

export default BurgerMenuButton;
