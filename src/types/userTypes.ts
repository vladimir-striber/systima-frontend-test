export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface UserResponse {
  data: User[];
}

export interface TableHeader {
  value: string;
  text: string
}
