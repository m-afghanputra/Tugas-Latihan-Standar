import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import type { IResponseEntity, Buku, BukuListData } from '../types';

// Hook untuk mengambil data list buku dengan pagination
export const useBukuList = (page: number, limit: number) => {
  return useQuery<IResponseEntity<BukuListData>>({
    queryKey: ['buku', page, limit],
    queryFn: async () => {
      const response = await api.get<IResponseEntity<BukuListData>>(`/buku?page=${page}&limit=${limit}`);
      return response.data;
    },
  });
};

// Hook untuk menambah atau mengedit buku
export const useMutateBuku = () => {
  const queryClient = useQueryClient();

  return useMutation<IResponseEntity<Buku>, Error, Omit<Buku, 'id'>>({
    mutationFn: async (newBuku) => {
      const response = await api.post<IResponseEntity<Buku>>('/buku', newBuku);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate query agar TanStack Query mengambil data terbaru otomatis
      queryClient.invalidateQueries({ queryKey: ['buku'] });
    },
  });
};