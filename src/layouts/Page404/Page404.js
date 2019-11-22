import React from "react";
import { useSelector } from "react-redux";
import { FaBackspace } from "react-icons/fa";
import "./Page404.scss";

const Page404 = props => {
  const auth = useSelector(s => s.auth);

  if (!auth.id) {
    props.history.replace("/login");
  }

  return (
    <section className="Page404">
      <h1 className="Page404__header">
        <FaBackspace /> 404 - Nie znaleziono strony
      </h1>
    </section>
  );
};

export default Page404;
