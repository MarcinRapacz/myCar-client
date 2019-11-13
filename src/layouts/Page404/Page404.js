import React from "react";
import { FaBackspace } from "react-icons/fa";
import "./Page404.scss";

const Page404 = () => {
  return (
    <section className="Page404">
      <h1 className="Page404__header">
        <FaBackspace /> 404 - Nie znaleziono strony
      </h1>
    </section>
  );
};

export default Page404;
