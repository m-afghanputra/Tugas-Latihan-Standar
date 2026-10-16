import api from '../lib/axios';
import type { IResponseEntity, LoginData, LoginPayload } from '../types';

export const authService = {
  login: async (payload: LoginPayload): Promise<IResponseEntity<LoginData>> => {
   const response = await api.post<IResponseEntity<LoginData>>(
    '/auth/login',
    payload,
   )
   return response.data;
  },
};
