export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
  address: UserAddress;
  company: UserCompany;
}

export type UserKeyValue = {
  key: string;
  value: unknown;
};

interface UserAddress {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  get: UserAddressGeolocation;
}

interface UserAddressGeolocation {
  lat: string;
  lng: string;
}

interface UserCompany {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface TableHeader {
  value: string;
  text: string;
}
