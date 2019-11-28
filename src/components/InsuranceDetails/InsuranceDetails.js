import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit, FaTimes } from "react-icons/fa";
import Moment from "react-moment";
import axios from "axios";

import "./InsuranceDetails.scss";

// Actions
import { showModal } from "../../actions/modalActions";

// Utils
import { handleError } from "../../utils/error";

// Components
import Spinner from "../../components/Spinner/Spinner";

const InsuranceDetails = props => {
  useEffect(() => {
    getDetails();
    // eslint-disable-next-line
  }, []);

  const dispatch = useDispatch();
  const [insurance, setInsurance] = useState();
  const [loading, setLoading] = useState(false);
  const user = useSelector(s => s.auth);

  const getDetails = async () => {
    try {
      const res = await axios.get(`/api/v1/car/${props.carId}/insurance`);
      setInsurance(res.data.content.list[0]);
      props.isInsurance(res.data.content.list[0]);
    } catch (error) {
      handleError(error);
    }
  };

  const removeInsurance = async id => {
    try {
      setLoading(true);
      await axios.delete(`/api/v1/insurance/${id}`);
      props.isInsurance(false);
    } catch (error) {
      handleError(error);
    }
    setInsurance(null);
    setLoading(false);
    dispatch(
      showModal({ text: "Ubezpieczenie zostało usunięte", color: "success" })
    );
  };

  return (
    insurance && (
      <section className="InsuranceDetails containers mt-4">
        <div className="row">
          {loading ? (
            <Spinner />
          ) : (
            <div className="col-12">
              <h4>Szczegóły ubezpieczenia</h4>
              <div className="card p-3">
                <p>
                  Polisa ważna do:{" "}
                  <span className="font-weight-bold">
                    <Moment format="DD/MM/YYYY">{insurance.to}</Moment>
                  </span>
                </p>
                <p>
                  Nazwa zakładu ubezpieczeń:{" "}
                  <span className="font-weight-bold">{insurance.company}</span>
                </p>
                <p>
                  Posiadane zniżki:{" "}
                  <span className="font-weight-bold">
                    {insurance.discount}%
                  </span>
                </p>
                <p>
                  Raty:{" "}
                  <span className="font-weight-bold">
                    {insurance.installment ? "Tak" : "Nie"}
                  </span>
                </p>

                {user.id === insurance.user && (
                  <div className="mr-0 ml-auto">
                    <Link
                      to={{
                        pathname: `/insurance/${insurance._id}/edit`,
                        state: { insurance }
                      }}
                    >
                      <FaEdit className="Panel__icon Panel__icon--edit mx-2" />
                    </Link>
                    <FaTimes
                      className="Panel__icon Panel__icon--danger"
                      onClick={() => removeInsurance(insurance._id)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    )
  );
};

export default React.memo(InsuranceDetails);
