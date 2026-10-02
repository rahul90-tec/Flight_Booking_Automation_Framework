export type CardType = 'visa' | 'amex' | 'dinersclub';

export interface PassengerDetails {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardType: CardType;
  cardNumber: string;
  cardMonth: string;
  cardYear: string;
  nameOnCard: string;
  rememberMe?: boolean;
}
