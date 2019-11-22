import React, { useEffect, useState, useCallback } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import axios from "axios";
import "./CarsList.scss";

// Utils
import { handleError } from "../../utils/error";

// Components
import Spinner from "../../components/Spinner/Spinner";

const CarsList = props => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCarsList();
    // eslint-disable-next-line
  }, []);

  const getCarsList = useCallback(async () => {
    try {
      const res = await axios.get("/api/v1/car");
      setList(res.data.content.cars);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClick = useCallback(
    id => props.history.push(`${props.location.pathname}/${id}`),
    // eslint-disable-next-line
    []
  );

  return (
    <section className="CarList container">
      <div className="row">
        <div className="col-12 text-right p-0">
          <Link to="/car/new" className="btn btn-outline-secondary mb-1 mx-1">
            Dodaj nowy pojazd
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          list.map(car => (
            <div className="col-6 px-1" key={car._id}>
              <div
                className="card py-3 px-0 mb-1 CarList__content"
                onClick={() => handleClick(car._id)}
              >
                <div className="CarList__item">
                  <FaCar className="mx-auto my-1 h1" />
                  <p className="m-0  font-weight-bold text-center">
                    {car.mark} {car.commercialModel}
                  </p>
                </div>
                <div className="CarList__item">
                  <p className="m-0">Termin następnego badania technicznego:</p>
                  <p className="m-0 font-weight-bold">
                    <Moment format="DD/MM/YYYY">
                      {car.nextTechnicalInspection}
                    </Moment>
                  </p>
                  <p className="m-0">Ubezpieczenie ważne do:</p>
                  <p className="m-0 font-weight-bold">
                    <Moment format="DD/MM/YYYY"></Moment>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CarsList;
