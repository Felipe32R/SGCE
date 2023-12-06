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
  senha: string;
}

export interface LoginResponse{
  accessToken: string;
}

async function signup(params: LoginParams){
  const { data } = await httpClient.post<any>('/auth/signup', params);
  return data
} 

async function login(params: LoginParams){
  const { data } = await httpClient.post<LoginResponse>('/auth/signin', params);
  return data
} 

export const authService = {
  signup,
  login
}