import * as translated from "./pl";

export const translatorCar = text => {
  let translatedText;
  switch (text) {
    case "car":
      translatedText = translated.car;
      break;
    case "truck":
      translatedText = translated.truck;
      break;
    case "specialCar":
      translatedText = translated.specialCar;
      break;
    case "moped":
      translatedText = translated.moped;
      break;
    case "motorcycle":
      translatedText = translated.motorcycle;
      break;
    case "quad":
      translatedText = translated.quad;
      break;
    case "bus":
      translatedText = translated.bus;
      break;
    case "trolleybus":
      translatedText = translated.trolleybus;
      break;
    case "agriculturalTractor":
      translatedText = translated.agriculturalTractor;
      break;
    case "carTractor":
      translatedText = translated.carTractor;
      break;
    case "lightTrailer":
      translatedText = translated.lightTrailer;
      break;
    case "semiTrailer":
      translatedText = translated.semiTrailer;
      break;
    case "specialSemiTrailer":
      translatedText = translated.specialSemiTrailer;
      break;
    case "truckTrailer":
      translatedText = translated.truckTrailer;
      break;
    case "agriculturalTruck":
      translatedText = translated.agriculturalTruck;
      break;
    case "specialTrailer":
      translatedText = translated.specialTrailer;
      break;

    case "registeredInTheCountry":
      translatedText = translated.registeredInTheCountry;
      break;
    case "registeredAbroad":
      translatedText = translated.registeredAbroad;
      break;
    case "new":
      translatedText = translated.newCar;
      break;

    case "ownUse":
      translatedText = translated.ownUse;
      break;
    case "firmCar":
      translatedText = translated.firmCar;
      break;
    case "taxi":
      translatedText = translated.taxi;
      break;
    case "drivingCourse":
      translatedText = translated.drivingCourse;
      break;

    default:
      translatedText = translated.different;
      break;
  }

  return translatedText;
};
