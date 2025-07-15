export interface TravelOffer {
  country: string;
  offerName: string;
  price: number;
  ticketPrice: number;
  price2: number; // الباكيج الثنائي
  price3: number; // الباكيج الثلاثي
  price4: number; // الباكيج الرباعي
  priceChild: number; // سعر الطفل
  hotel: string;
  roomType: string;
  flight: string;
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  photo1: string;
  photo2: string;
  photo3: string;
  photo4: string;
  photo5: string;
  video: string;
  note: string;
}

export interface GoogleSheetsResponse {
  values: string[][];
}