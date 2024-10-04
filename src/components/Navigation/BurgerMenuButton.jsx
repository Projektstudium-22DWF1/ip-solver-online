// components/Tabs/BurgerMenuButton.jsx
import React from "react";

const BurgerMenuButton = () => {
  return (
    <button
      className="uk-navbar-toggle uk-hidden@s"
      uk-toggle="target: #offcanvas-nav"
      aria-label="Open Menu"
      style={{
        width: "40px",  // Set the width
        height: "40px", // Set the height
        backgroundColor: "#fff", // Set background color to white
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #ccc", // Optional: Add a border
        borderRadius: "5px", // Optional: Slightly rounded corners
      }}
    >
      <span uk-navbar-toggle-icon="true"></span> {/* Correctly use uk-navbar-toggle-icon */}
    </button>
  );
};

export default BurgerMenuButton;
