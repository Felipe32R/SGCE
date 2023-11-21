import { httpClient } from './HttpClient';


export interface NpsResponse {
  detractors: number;
  promoters: number;
  nps: number;
}

export interface EvaluationsResponse {
  createdAt: number;
  updatedAt: number;
  id: number;
  value: number;
  email: string;
  justification: string;
  telephone: number;
  cellphone: number;
  status: string;
  questionId: number;
  userId: number;
  origin: 'qrCode' | 'socialMedia';
}

export interface Evolution {
  nps: number;
  month: number;
  year: number;
}

interface MainActivitys {
  data: Array<string>;
}

async function getPresidents() {
  const { data } = await httpClient.get<any>(`/candidates/presidents`);
  return data;
}

async function getNps(userId: number | undefined) {
  const { data } = await httpClient.get<NpsResponse>(`/nps/${userId}`);
  return data;
}

async function getEvaluations(userId: number | undefined) {
  const { data } = await httpClient.get<Array<EvaluationsResponse>>(
    `/answersByCompany/${userId}`
  );
  return data;
}

async function getQrCode(userId: number | undefined) {
  const { data } = await httpClient.get<Blob>(`/qrCode/${userId}`, {
    responseType: 'blob',
  });
  const imgUrl = URL.createObjectURL(data);
  return imgUrl;
}

async function getLink(userId: number | undefined) {
  const { data } = await httpClient.get<string>(`/returnLink/${userId}`);
  return data;
}

async function getEvolution(userId: number | undefined) {
  const { data } = await httpClient.get<Array<Evolution>>(`/byDate/${userId}`);
  return data;
}

async function sendEvaluation(data: any) {
  await httpClient.post<Array<Evolution>>(`/answer`, data);
  return data;
}

async function getMainActivitys() {
  const { data } = await httpClient.get<MainActivitys>(
    `/user/returnMainActivity`
  );
  return data.data;
}

async function editUser(userId: number | undefined, data: any) {
  const response = await httpClient.patch<any>(`/user/${userId}`, data);
  return response;
}

async function retrievePassword(email: string) {
  const response = await httpClient.post<any>('/user/generateToken', { email });
  return response;
}

async function resetPassword(data: any) {
  const response = await httpClient.post<any>('/user/resetPassword', data);
  return response;
}

export const sgceService = {
  getPresidents,
  getNps,
  getEvaluations,
  getQrCode,
  getLink,
  getEvolution,
  sendEvaluation,
  getMainActivitys,
  editUser,
  retrievePassword,
  resetPassword,
};
