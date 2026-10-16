import api from '../lib/axios.ts';
import type { Buku, BukuPayload, IResponseEntity } from '../types';

export const bukuService = {
  getList: async (
    page: number,
    limit: number,
  ): Promise<IResponseEntity<Buku[]>> => {
      const response = await api.get<IResponseEntity<Buku[]>>('/buku', {
        params: { page, limit },
      });
      return response.data;
    },

  getById: async (id: string): Promise<IResponseEntity<Buku>> => {
    const response = await api.get<IResponseEntity<Buku>>(`/buku/${id}`);
  return response.data;
  },

  create: async (payload: BukuPayload): Promise<IResponseEntity<Buku>> => {
    const response = await api.post<IResponseEntity<Buku>>('/buku', payload);
    return response.data;
  },

  update: async (
    id: string,
    payload: BukuPayload,
  ): Promise<IResponseEntity<Buku>> => {
    const response = await api.put<IResponseEntity<Buku>>(`/buku/${id}`, payload);
    return response.data;
  },

  remove: async (id: string): Promise<IResponseEntity<undefined>> => {
    const response = await api.delete<IResponseEntity<undefined>>(`/buku/${id}`);
    return response.data;
  },
};
