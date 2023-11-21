import { httpClient } from "./HttpClient";

export interface User {
  createdAt?: number;
  updatedAt?: number;
  id?: number;
  name: string;
  nameCompany: string;
  email: string;
  cnpj: string;
  telephone: string;
  cellphone: string;
  type: string;
  role?: string;
}

export interface SignupParams {
  name: string;
  email: string;
  password: string;
  cnpj: string;
  type: string;
  telephone?: string | undefined;
  cellphone: string;
}

export interface LoginParams{
  email: string;
  password: string;
}

export interface LoginResponse{
  token: string;
  user: User;
}

async function signup(params: LoginParams){
  const { data } = await httpClient.post<any>('/user', params);
  return data
} 

async function login(params: LoginParams){
  const { data } = await httpClient.post<LoginResponse>('/user/login', params);
  return data
} 

export const authService = {
  signup,
  login
}