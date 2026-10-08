import type { IResponseEntity, LoginData, LoginPayload } from '../types';

// MOCK SEMENTARA: backend belum tersedia. Ganti dengan pemanggilan `api` saat siap.
export const authService = {
  login: async (payload: LoginPayload): Promise<IResponseEntity<LoginData>> => {
    void payload; // belum dipakai: mock tidak memeriksa kredensial
    return {
      code: 200,
      status: true,
      message: 'Login berhasil (Mode Dummy)',
      data: {
        token: 'dummy-jwt-token-12345',
        user: { id: '1', name: 'Peserta PKL LSKK' },
      },
    };
  },
};
