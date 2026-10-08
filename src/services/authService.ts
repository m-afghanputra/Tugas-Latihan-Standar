import type { IResponseEntity, LoginData, LoginPayload } from '../types';

// Sementara backend belum ada ganti pemanggilan 'api' kalau udah ada
export const authService = {
  login: async (payload: LoginPayload): Promise<IResponseEntity<LoginData>> => {
    void payload; // belum kepake
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
