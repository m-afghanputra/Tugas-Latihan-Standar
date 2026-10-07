// Definisi interface sesuai standar LSKK
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

// Tipe data untuk entitas Buku
export interface Buku {
  id: string;
  judul: string;
  penulis: string;
  tahun: number;
}

// Tipe data untuk response list buku (asumsi backend mengembalikan array di dalam 'data')
export interface BukuListData {
  items: Buku[];
  meta: ImetaPagination;
}