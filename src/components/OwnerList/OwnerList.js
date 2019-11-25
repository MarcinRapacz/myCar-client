import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import axios from "axios";
import Moment from "react-moment";
import "./OwnerList.scss";

// Actions
import { showModal } from "../../actions/modalActions";

// Utils
import { handleError } from "../../utils/error";

// Languages
import { translatorOwner } from "../../lang/translator";

const OwnerList = ({ carId }) => {
  useEffect(
    () => {
      getOnwerList();
    },
    // eslint-disable-next-line
    []
  );

  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(s => s.auth);

  const getOnwerList = useCallback(
    async () => {
      try {
        const res = await axios.get(`/api/v1/car/${carId}/owner`);
        setList(res.data.content.owners);
      } catch (error) {
        handleError(error);
      }
    },
    // eslint-disable-next-line
    []
  );

  const removeOwner = async id => {
    try {
      await axios.delete(`/api/v1/owner/${id}`);
      dispatch(
        showModal({ text: "Właściciel został usunięty", color: "success" })
      );
      const newList = list.filter(v => v._id !== id);
      setList(newList);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <section className="OwnerList mt-4">
      <h4>Lista właścicieli</h4>
      <div className="card-group">
        {list.map(owner => (
          <div className="card mt-1 col-12 col-md-6" key={owner._id}>
            <div className="card-body">
              <p className="card-text">
                Płeć:{" "}
                <span className="font-weight-bold">
                  {translatorOwner(owner.sex)}
                </span>
              </p>
              <p className="card-text">
                Kod pocztowy:{" "}
                <span className="font-weight-bold">{owner.postCode}</span>
              </p>
              <p className="card-text">
                Data urodzenia:{" "}
                <span className="font-weight-bold">
                  <Moment format="DD/MM/YYYY">{owner.dateOfBirth}</Moment>
                </span>
              </p>
              <p className="card-text">
                Data odobioru prawa jazdy:{" "}
                <span className="font-weight-bold">
                  <Moment format="DD/MM/YYYY">
                    {owner.drivingLicensePickupDate}
                  </Moment>
                </span>
              </p>
              <p className="card-text">
                Stan cywilny:{" "}
                <span className="font-weight-bold">
                  {translatorOwner(owner.maritalStatus)}
                </span>
              </p>
              <p className="card-text">
                Liczba dzieci do 18 roku życia:{" "}
                <span className="font-weight-bold">
                  {owner.numberOfChildrenUnder18Years}
                </span>
              </p>
            </div>
            {user.id === owner.user && (
              <div className="mr-0 ml-auto">
                <Link
                  to={{
                    pathname: `/owner/${owner._id}/edit`,
                    state: { owner }
                  }}
                >
                  <FaEdit className="Panel__icon Panel__icon--edit mx-2" />
                </Link>
                <FaTimes
                  className="Panel__icon Panel__icon--danger"
                  onClick={() => removeOwner(owner._id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

OwnerList.propTypes = {
  carId: PropTypes.string.isRequired
};

export default React.memo(OwnerList);
