import { isAxiosError } from 'axios';

const GENERIC_ERROR_MESSAGE =
  'Terjadi kesalahan pada server. Silakan coba lagi.';
const FALLBACK_ERROR_MESSAGE = 'Terjadi kesalahan. Silakan coba lagi.';

interface IErrorBody {
  code?: number;
  message?: string | string[];
}

// Pesan error untuk pengguna diambil dari field `message` response wrapper;
// kode 500 ditampilkan sebagai pesan generik (onboarding LSKK §3.1).
// `message` dari ValidationPipe bisa berupa array of string.
export const getErrorMessage = (error: unknown): string => {
  if (!isAxiosError<IErrorBody>(error)) return FALLBACK_ERROR_MESSAGE;

  const status = error.response?.status ?? error.response?.data?.code;
  if (status !== undefined && status >= 500) return GENERIC_ERROR_MESSAGE;

  const message = error.response?.data?.message;
  return Array.isArray(message)
    ? message.join(', ')
    : (message ?? FALLBACK_ERROR_MESSAGE);
};
