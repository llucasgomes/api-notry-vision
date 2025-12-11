export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  cargo: string;
  name: string;
  username: string;
};

export type LoginError = {
  message: string;
};
