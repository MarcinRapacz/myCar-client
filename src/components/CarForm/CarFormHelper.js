import validator from "validator";

export const availableTypeOfVehicle = [
  { car: "Samochód osobowy" },
  { truck: "Samochód ciężarowy" },
  { specialCar: "Samochód specjalny" },
  { moped: "Motorower" },
  { motorcycle: "Motocykl" },
  { quad: "Quad" },
  { bus: "Bus" },
  { trolleybus: "Trolejbus" },
  { agriculturalTractor: "Ciągnik rolniczy" },
  { carTractor: "Ciągnik samochodowy" },
  { lightTrailer: "Przyczepa lekka" },
  { semiTrailer: "Naczepa ciężarowa" },
  { specialSemiTrailer: "Naczepa specjalna" },
  { truckTrailer: "Przyczepa ciężarowa" },
  { agriculturalTruck: "Przyczepa rolnicza" },
  { specialTrailer: "Przyczepa specjalna" }
];

export const avaliableOrigin = [
  { registeredInTheCountry: "Zarejestrowany w kraju" },
  { registeredAbroad: "Zarejestrowany za granicą" },
  { new: "Nowy" }
];

export const avaliableDestiny = [
  { ownUse: "Użytek własny" },
  { firmCar: "Pojazd firmowy" },
  { taxi: "Taxi" },
  { drivingCourse: "Nauka jazdy" },
  { other: "Inny" }
];

const availableTypeOfVehicleKeys = availableTypeOfVehicle.map(
  a => Object.keys(a)[0]
);
const availableDestinyKeys = avaliableDestiny.map(a => Object.keys(a)[0]);
const availableOriginKeys = avaliableOrigin.map(a => Object.keys(a)[0]);

export const validate = values => {
  const errors = {};

  if (!validator.isLength(values.mark, { min: 1, max: 64 })) {
    errors.mark = "Wpisana wartość poza dostępnym zakresem (1-64)";
  }
  if (!validator.isLength(values.commercialModel, { min: 1, max: 64 })) {
    errors.commercialModel = "Wpisana wartość poza dostępnym zakresem (1-64)";
  }
  if (!availableTypeOfVehicleKeys.includes(values.typeOfVehicle)) {
    errors.typeOfVehicle = "Podana wartość nie jest dostępna";
  }
  if (!availableOriginKeys.includes(values.origin)) {
    errors.origin = "Podana wartość nie jest dostępna";
  }
  if (!availableDestinyKeys.includes(values.destiny)) {
    errors.destiny = "Podana wartość nie jest dostępna";
  }
  if (!validator.isInt(values.capacity.toString(), { min: 0, max: 100000 })) {
    errors.capacity = "Wpisana wartość poza dostępnym zakresem (0-100000)";
  }
  if (!validator.isInt(values.power.toString(), { min: 0, max: 10000 })) {
    errors.power = "Wpisana wartość poza dostępnym zakresem (0-10000)";
  }
  if (!validator.isLength(values.fuel, { min: 1, max: 32 })) {
    errors.fuel = "Wpisana wartość poza dostępnym zakresem (0-32)";
  }
  if (
    validator.isEmpty(values.dateOfFirstRegistration) ||
    validator.isBefore(
      values.dateOfFirstRegistration.toString(),
      new Date(1900, 0, 1).toString()
    ) ||
    validator.isAfter(
      values.dateOfFirstRegistration.toString(),
      new Date().toString()
    )
  ) {
    errors.dateOfFirstRegistration = `Wpisana wartość poza dostępnym zakresem`;
  }
  if (
    !validator.isInt(values.yearOfProduction.toString(), {
      min: new Date(1900, 0, 1).getFullYear(),
      max: new Date().getFullYear()
    })
  ) {
    errors.yearOfProduction = "Wpisana wartość poza dostępnym zakresem";
  }
  if (!validator.isLength(values.differentiator, { min: 1, max: 3 })) {
    errors.differentiator = "Wpisana wartość poza dostępnym zakresem (1-3)";
  }
  if (
    validator.isEmpty(values.nextTechnicalInspection) ||
    validator.isBefore(
      values.nextTechnicalInspection.toString(),
      new Date(1900, 0, 1).toString()
    ) ||
    validator.isAfter(
      values.nextTechnicalInspection.toString(),
      new Date(Date.now() + 4 * 365 * 24 * 60 * 60 * 1000).toString()
    )
  ) {
    errors.nextTechnicalInspection = `Wpisana wartość poza dostępnym zakresem`;
  }

  return errors;
};
