import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bukuService } from '../services/bukuService';
import type { Buku, BukuPayload, IResponseEntity } from '../types';

// Hook untuk mengambil data list buku dengan pagination
export const useBukuList = (page: number, limit: number) => {
  return useQuery<IResponseEntity<Buku[]>>({
    queryKey: ['buku', page, limit],
    queryFn: () => bukuService.getList(page, limit),
  });
};

// Hook untuk mengambil detail satu buku (mode edit)
export const useBukuDetail = (id: string | undefined) => {
  return useQuery<IResponseEntity<Buku>>({
    queryKey: ['buku', id],
    queryFn: () => bukuService.getById(id as string),
    enabled: id !== undefined,
  });
};

interface IMutateBukuVariables {
  id?: string;
  payload: BukuPayload;
}

// Hook untuk menambah (tanpa id) atau mengedit (dengan id) buku
export const useMutateBuku = () => {
  const queryClient = useQueryClient();

  return useMutation<IResponseEntity<Buku>, Error, IMutateBukuVariables>({
    mutationFn: ({ id, payload }) =>
      id === undefined
        ? bukuService.create(payload)
        : bukuService.update(id, payload),
    onSuccess: () => {
      // Invalidate query agar TanStack Query mengambil data terbaru otomatis
      queryClient.invalidateQueries({ queryKey: ['buku'] });
    },
  });
};

// Hook untuk menghapus buku
export const useDeleteBuku = () => {
  const queryClient = useQueryClient();

  return useMutation<IResponseEntity<undefined>, Error, string>({
    mutationFn: (id) => bukuService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buku'] });
    },
  });
};
