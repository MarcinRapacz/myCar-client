import React, { useEffect, useState, useCallback } from "react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Car.scss";

// Languages
import { translatorCar } from "../../lang/translator";

// Utils
import { handleError } from "../../utils/error";

// Components
import Spinner from "../../components/Spinner/Spinner";
import Panel from "../../components/Panel/Panel";

const CarField = props => {
  let desc = "";
  if (props.translate) {
    desc = translatorCar(props.desc);
  }
  return (
    <section className="card Car__field py-2 px-3 mb-1">
      <p className="Car__field-item m-0">{props.title}</p>
      <p className="Car__field-item Car__field-item--second m-0">
        {desc || props.desc}
      </p>
    </section>
  );
};

const Car = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCar(id);
    // eslint-disable-next-line
  }, []);

  const getCar = useCallback(async id => {
    try {
      const res = await axios.get(`/api/v1/car/${id}`);
      setCar(res.data.content.car);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <section className="Car container">
      <div className="row">
        <div className="col-9 col-md-10">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <h3 className="Car__header">Szczegóły pojazdu</h3>
              <CarField title="Marka" desc={car.mark} />
              <CarField title="Model" desc={car.commercialModel} />
              <CarField
                title="Data pierwszej rejestracji"
                desc={
                  <Moment format="DD/MM/YYYY">
                    {car.dateOfFirstRegistration}
                  </Moment>
                }
              />
              <CarField title="Rok produkcji" desc={car.yearOfProduction} />
              <CarField title="Pojemność" desc={`${car.capacity} ccm`} />
              <CarField title="Moc" desc={`${car.power} kW`} />
              <CarField title="Rozdzaj paliwa" desc={car.fuel} />
              <CarField
                title="Rodzaj pojazdu"
                desc={car.typeOfVehicle}
                translate
              />
              <CarField title="Przeznaczenie" desc={car.destiny} translate />
              <CarField title="Pochodzenie" desc={car.origin} translate />
              <CarField title="Wyróżnik powiatu" desc={car.differentiator} />
              <CarField
                title="Termin nestępnego badania technicznego"
                desc={
                  <Moment format="DD/MM/YYYY">
                    {car.nextTechnicalInspection}
                  </Moment>
                }
              />
            </>
          )}
        </div>
        <div className="col-3 col-md-2 ">
          <Panel />
        </div>
      </div>
    </section>
  );
};

export default Car;
