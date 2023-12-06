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

async function getMyProfile() {
  const { data } = await httpClient.get<any>(`/candidates/me`);
  return data;
}

async function getPresidents() {
  const { data } = await httpClient.get<any>(`/candidates/presidents`);
  return data;
}

async function createCampaign(params: any) {
  const { data } = await httpClient.post<any>(`/campaigns/create`,params);
  return data;
}

async function createGoal(params: any) {
  const { data } = await httpClient.post<any>(`/goals`,params);
  return data;
}
async function createRealization(params: any) {
  const { data } = await httpClient.post<any>(`/realizations`,params);
  return data;
}
async function createSocial(params: any) {
  const { data } = await httpClient.post<any>(`/socials`,params);
  return data;
}
async function createPropose(params: any) {
  const { data } = await httpClient.post<any>(`/proposes`,params);
  return data;
}
async function createSupport(params: any) {
  const { data } = await httpClient.post<any>(`/support`,params);
  return data;
}

async function deleteCandidate(id: string) {
  const { data } = await httpClient.delete<any>(`/candidates/${id}`);
  return data;
}



async function getCandidatesByState(cargo: string,state: string, city?: string) {
  const { data } = await httpClient.post<any>(`/candidates/byState`,{cargo,state, city});
  return data;
}

async function getCargos(cargo: string,state?: string, city?: string) {
  const { data } = await httpClient.post<any[]>(`/positions/byState`,{cargo,state, city});
  return data;
}

async function getStates() {
  const { data } = await httpClient.get<any>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/`);
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
  getStates,
  getCandidatesByState,
  getCargos,
  createCampaign,
  createGoal,
  deleteCandidate,
  createPropose,
  createRealization,
  createSocial,
  createSupport,
  getMyProfile,
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
