export type user = {
  id: string;
  username: string;
  image:string
  name: string;
  password: string;
  cargo: string;
  logged:boolean
  sector: string
};

export type userRequest = {
  username: string;
   image?:string
  name: string;
  password: string;
  cargo: "operador" | "supervisor" | "admin";
  sector: string
  logged?:boolean
};

export type UpdateUserRequest = {
  username?: string;
   image?:string
  name?: string;
  password?: string;
  cargo?: string;
  sector?:string
  logged?:boolean
};
