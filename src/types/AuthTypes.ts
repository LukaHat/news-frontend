export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  role: string;
  fullName: string;
  alias: string;
}

export interface AuthUser extends RegisterData {
  _id: string;
  registeredAt: string;
  __v: number;
}
