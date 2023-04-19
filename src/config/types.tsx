export type imagesType = {
  public_id: string;
  url: string;
};

export type commentsType = {
  userId: String;
  userName: String;
  contextOfComment: String;
  rating: number;
};

export type enterprise = {
  _id: number;
  name: string;
  city: string;
  street: string;
  number: number;
  numberPhone: number;
  email: string;
  description: string;
  rating: number;
  typeOfEnterprises: [string];
  comments: commentsType[];
  logoEnterprise: imagesType;
  voivodeship: string;
  zipCode: string;
  webside: string;
  latitude: number;
  longitude: number;
  imagesEnterprise: imagesType[];
};

export type cereal={
    memberStateCode: string,
    memberStateName: string,
    beginDate: string,
    endDate: string,
    weekNumber: number,
    price: string,
    unit: string,
    productName: string,
    marketName: string,
    stageName: string,
}

export type PaginationProps = {
  numberOfEnterprises: number;
  enterprisesPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

export type grain = {
  _id: string;
  nameOfPlant: string;
  quantity: number;
  unit: string;
  area: number;
  price: number;
  cropCost: number;
};