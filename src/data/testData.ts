import { FlightSearchCriteria } from '../models/flight.model';
import { PassengerDetails } from '../models/passenger.model';

export const flightSearchCriteria: FlightSearchCriteria = {
  departureCity: 'Boston',
  destinationCity: 'London',
};

export const passengerData: PassengerDetails = {
  name: 'John Doe',
  address: '123 Main Street',
  city: 'Boston',
  state: 'MA',
  zipCode: '02108',
  cardType: 'visa',
  cardNumber: '4111222233334444',
  cardMonth: '11',
  cardYear: '2028',
  nameOnCard: 'John Doe',
  rememberMe: true,
};
