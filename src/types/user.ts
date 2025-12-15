export type user = {
  id: string;
  username: string;
  name: string;
  password: string;
  cargo: string;
};

export type userRequest = {
  username: string;
  name: string;
  password: string;
  cargo: "operador" | "supervisor" | "admin";
  // cargo: string;
};

export type UpdateUserRequest = {
  username?: string;
  name?: string;
  password?: string;
  cargo?: string;
};
