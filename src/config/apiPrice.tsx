export const option1 = (currency: string) =>
  `https://ec.europa.eu/agrifood/api/cereal/prices?productCodes=TRI&beginDate=01/01/2022&endDate=01/11/2022&memberStateCodes=PL`;

export const option2 = (id: string) =>
  `https://ec.europa.eu/agrifood/api/cereal/prices?productCodes=TRI&years=2021&memberStateCodes=PL`;

export const option3 = (id: string, days = 365, currency: string) =>
  `https://ec.europa.eu/agrifood/api/cereal/production?memberStateCodes=AT&crops=Barley&years=2021`;
