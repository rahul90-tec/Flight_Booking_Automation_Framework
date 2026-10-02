export interface FlightSearchCriteria {
  departureCity: string;
  destinationCity: string;
}

export interface FlightInfo {
  flightNumber: string;
  airline: string;
  departs: string;
  arrives: string;
  price: number;
}

export interface BookingConfirmation {
  id: string;
  status: string;
  amount: string;
  cardNumber: string;
  expiration: string;
  authCode: string;
  date: string;
}
