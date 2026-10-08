// Definisi interface menurut standar
export interface ImetaPagination {
  totalPages: number;
  totalData: number;
  totalDataPerPage: number;
  page: number;
  limit: number;
}

export interface IResponseEntity<T> {
  code: number;
  status: boolean;
  message: string;
  data?: T;
  meta?: ImetaPagination;
}

// Entitas Buku
export interface Buku {
  id: string;
  judul: string;
  penulis: string;
  tahun: number;
}

// Payload untuk membuat / mengubah buku
export type BukuPayload = Omit<Buku, 'id'>;

// Entitas user & kontrak auth
export interface User {
  id: string;
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginData {
  token: string;
  user: User;
}
