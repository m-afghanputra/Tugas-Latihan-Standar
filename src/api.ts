// === TIPE DATA ===
export interface Item {
  id: number;
  name: string;
  description: string;
}

export interface ItemData {
  name: string;
  description: string;
}

export interface ListResponse {
  data: Item[];
  total: number;
  page: number;
  perPage: number;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

// === FUNGSI BANTU: DELAY ===
// Ini bikin "pura-pura loading" biar terasa seperti request ke server
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// === DATA PALSU ===
// Ini data yang akan muncul di tabel
const mockItems: Item[] = [
  { id: 1, name: 'Belajar React', description: 'Belajar dasar-dasar React JS' },
  { id: 2, name: 'Belajar TypeScript', description: 'Belajar TypeScript untuk type safety' },
  { id: 3, name: 'Belajar Node.js', description: 'Belajar backend dengan Node.js' },
  { id: 4, name: 'Belajar Database', description: 'Belajar MySQL dan MongoDB' },
  { id: 5, name: 'Belajar API', description: 'Belajar membuat REST API' },
  { id: 6, name: 'Belajar Git', description: 'Belajar version control dengan Git' },
  { id: 7, name: 'Belajar CSS', description: 'Belajar styling dengan CSS' },
  { id: 8, name: 'Belajar HTML', description: 'Belajar struktur halaman web' },
];

// === FUNGSI LOGIN ===
// Terima email & password apa saja asal tidak kosong
export const login = async (email: string, password: string) => {
  await delay(1000); // Pura-pura loading 1 detik

  // Validasi sederhana: email & password tidak boleh kosong
  if (!email || !password) {
    throw new Error('Email dan password harus diisi');
  }

  // Return data login palsu
  return {
    data: {
      token: 'token-palsu-12345',
      user: { id: 1, name: 'User Testing', email: email },
    },
  };
};

// === FUNGSI GET LIST ===
export const getItems = async (page: number = 1, perPage: number = 5) => {
  await delay(800);

  // Hitung data yang harus ditampilkan berdasarkan halaman
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = mockItems.slice(startIndex, endIndex);

  return {
    data: {
      data: paginatedData,
      total: mockItems.length,
      page: page,
      perPage: perPage,
    },
  };
};

// === FUNGSI TAMBAH ITEM ===
export const createItem = async (data: ItemData) => {
  await delay(800);

  const newItem: Item = {
    id: mockItems.length + 1,
    name: data.name,
    description: data.description,
  };

  mockItems.push(newItem);
  return { data: newItem };
};

// === FUNGSI UPDATE ITEM ===
export const updateItem = async (id: number, data: ItemData) => {
  await delay(800);

  const index = mockItems.findIndex(item => item.id === id);
  if (index !== -1) {
    mockItems[index] = { ...mockItems[index], ...data };
    return { data: mockItems[index] };
  }

  throw new Error('Item tidak ditemukan');
};

// === FUNGSI HAPUS ITEM ===
export const deleteItem = async (id: number) => {
  await delay(800);

  const index = mockItems.findIndex(item => item.id === id);
  if (index !== -1) {
    mockItems.splice(index, 1);
  }

  return { data: {} };
};

// === FUNGSI GET 1 ITEM ===
export const getItem = async (id: number) => {
  await delay(800);

  const item = mockItems.find(item => item.id === id);
  if (item) {
    return { data: item };
  }

  throw new Error('Item tidak ditemukan');
};