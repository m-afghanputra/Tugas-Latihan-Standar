import MockAdapter from 'axios-mock-adapter';
import type { AxiosInstance } from 'axios';
import type { Buku, IResponseEntity } from '../types';

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
};
