import React from "react";

const Loader = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh" }}
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
