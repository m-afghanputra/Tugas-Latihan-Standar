import type { Buku, BukuPayload, IResponseEntity } from '../types';

// sementara backend belum tersedia.
let books: Buku[] = [
  { id: '1', judul: 'Laskar Pelangi', penulis: 'Andrea Hirata', tahun: 2005 },
  {
    id: '2',
    judul: 'Bumi Manusia',
    penulis: 'Pramoedya Ananta Toer',
    tahun: 1980,
  },
  { id: '3', judul: 'Pulang', penulis: 'Tere Liye', tahun: 2015 },
  {
    id: '4',
    judul: 'Laut Bercerita',
    penulis: 'Leila S. Chudori',
    tahun: 2017,
  },
  { id: '5', judul: 'Cantik Itu Luka', penulis: 'Eka Kurniawan', tahun: 2002 },
];
let nextId = books.length + 1;

const findBook = (id: string): Buku => {
  const book = books.find((item) => item.id === id);
  if (!book) throw new Error('Buku tidak ditemukan');
  return book;
};

export const bukuService = {
  getList: async (
    page: number,
    limit: number,
  ): Promise<IResponseEntity<Buku[]>> => {
    const data = books.slice((page - 1) * limit, page * limit);
    return {
      code: 200,
      status: true,
      message: 'Berhasil mengambil data buku',
      data,
      meta: {
        totalPages: Math.ceil(books.length / limit),
        totalData: books.length,
        totalDataPerPage: data.length,
        page,
        limit,
      },
    };
  },

  getById: async (id: string): Promise<IResponseEntity<Buku>> => {
    return { code: 200, status: true, message: 'Berhasil', data: findBook(id) };
  },

  create: async (payload: BukuPayload): Promise<IResponseEntity<Buku>> => {
    const book: Buku = { id: String(nextId++), ...payload };
    books = [...books, book];
    return {
      code: 201,
      status: true,
      message: 'Buku berhasil ditambahkan',
      data: book,
    };
  },

  update: async (
    id: string,
    payload: BukuPayload,
  ): Promise<IResponseEntity<Buku>> => {
    const book: Buku = { ...findBook(id), ...payload };
    books = books.map((item) => (item.id === id ? book : item));
    return {
      code: 200,
      status: true,
      message: 'Buku berhasil diperbarui',
      data: book,
    };
  },

  remove: async (id: string): Promise<IResponseEntity<undefined>> => {
    findBook(id);
    books = books.filter((item) => item.id !== id);
    return { code: 200, status: true, message: 'Buku berhasil dihapus' };
  },
};
