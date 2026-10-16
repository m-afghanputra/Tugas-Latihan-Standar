import MockAdapter from 'axios-mock-adapter';
import type { AxiosInstance } from 'axios';
import type { Buku, BukuPayload, IResponseEntity, LoginData } from '../types';

const books: Buku[] = [
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

export const setupMock = (api: AxiosInstance) => {
  const mock = new MockAdapter(api, { delayResponse: 300 });

  mock.onGet('/buku').reply((config) => {
    const { page, limit } = config.params as { page: number; limit: number };
    const data = books.slice((page - 1) * limit, page * limit);
    const response: IResponseEntity<Buku[]> = {
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
    return [200, response];
    
  });

  mock.onGet(/\/buku\/\w+/).reply((config) => {
    const id = config.url?.split('/').pop();
    const book = books.find((item) => item.id === id);

    if (!book) {
      return [
        404,
        { code: 404, status: false, message: 'Buku tidak ditemukan' },
      ];
    }

    const response: IResponseEntity<Buku> = {
      code: 200,
      status: true,
      message: 'Berhasil',
      data: book,
    };
    return [200, response];
  });

  mock.onPost('/buku').reply((config) => {
    const payload = JSON.parse(config.data as string) as BukuPayload;
    const book: Buku = { id: String(nextId++), ...payload };
    books.push(book);
    const response: IResponseEntity<Buku> = {
      code: 201,
      status: true,
      message: 'Buku berhasil ditambahkan',
      data: book,
    };
    return [201, response]
  });

mock.onPut(/\/buku\/\w+/).reply((config) => {
  const id = config.url?.split('/').pop();
  const payload = JSON.parse(config.data as string) as BukuPayload;
  const index = books.findIndex((item) => item.id === id);

  if (index === -1) {
    return [
      404,
      { code: 404, status: false, message: 'Buku tidak ditemukan' },
    ];
  }

  const updated: Buku = { ...books[index], ...payload };
  books[index] = updated;

  const response: IResponseEntity<Buku> = {
    code: 200,
    status: true,
    message: 'Buku berhasil diperbarui',
    data: updated,
  };
  return [200, response];
});

  mock.onDelete(/\/buku\/\w+/).reply((config) => {
  const id = config.url?.split('/').pop();
  const index = books.findIndex((item) => item.id === id);

  if (index === -1) {
    return [
      404,
      { code: 404, status: false, message: 'Buku tidak ditemukan' },
    ];
  }
  books.splice(index, 1);
  const response: IResponseEntity<undefined> = {
    code: 200,
    status: true,
    message: 'Buku berhasil dihapus',
  };
  return [200, response];
  });
  
  mock.onPost('/auth/login').reply(() => {
    const response: IResponseEntity<LoginData> = {
        code: 200,
        status: true,
        message: 'Login Berhasil!',
        data: {
        token: 'dummy-jwt-token-12345',
        user: { id: '1', name: 'Peserta PKL LSKK' },
      },
    };
  return [200, response];
});
};
