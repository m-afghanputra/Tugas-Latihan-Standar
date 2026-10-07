import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Table, Button, Pagination, Card, message, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Buku } from '../types';

const initialDummyBuku: Buku[] = [
  { id: '1', judul: 'Laskar Pelangi', penulis: 'Andrea Hirata', tahun: 2005 },
  { id: '2', judul: 'Bumi Manusia', penulis: 'Pramoedya Ananta Toer', tahun: 1980 },
  { id: '3', judul: 'Pulang', penulis: 'Tere Liye', tahun: 2015 },
  { id: '4', judul: 'Laut Bercerita', penulis: 'Leila S. Chudori', tahun: 2017 },
  { id: '5', judul: 'Cantik Itu Luka', penulis: 'Eka Kurniawan', tahun: 2002 },
];

export default function BukuListPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  
  const [daftarBuku, setDaftarBuku] = useState<Buku[]>(initialDummyBuku);
  const [page, setPage] = useState(1);
  const [idBukuDihapus, setIdBukuDihapus] = useState<string | null>(null);
  const limit = 10;

  const handleLogout = () => {
    logout();
    navigate('/login');
    message.info('Anda telah keluar');
  };

  const tampilkanKonfirmasiHapus = (id: string) => {
    setIdBukuDihapus(id);
  };

  const handleHapus = () => {
    if (!idBukuDihapus) return;

    const bukuSetelahDihapus = daftarBuku.filter((buku) => buku.id !== idBukuDihapus);
    setDaftarBuku(bukuSetelahDihapus);
    
    message.success('Buku berhasil dihapus');
    setIdBukuDihapus(null);
  };

  const handleBatalHapus = () => {
    setIdBukuDihapus(null);
  };

  const columns: ColumnsType<Buku> = [
    { title: 'Judul', dataIndex: 'judul', key: 'judul' },
    { title: 'Penulis', dataIndex: 'penulis', key: 'penulis' },
    { title: 'Tahun', dataIndex: 'tahun', key: 'tahun', width: 100 },
    {
      title: 'Aksi',
      key: 'aksi',
      width: 150,
      render: (_, record) => (
        <div className="space-x-2">
          <Button 
            type="link" 
            onClick={() => navigate(`/buku/edit/${record.id}`)}
          >
            Edit
          </Button>
          <Button 
            type="link" 
            danger
            onClick={() => tampilkanKonfirmasiHapus(record.id)}
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Buku</h1>
        <div className="space-x-2">
          <Button type="primary" onClick={() => navigate('/buku/tambah')}>
            Tambah Buku
          </Button>
          <Button danger onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <Card>
        <Table 
          columns={columns} 
          dataSource={daftarBuku} 
          rowKey="id" 
          pagination={false}
        />
        
        <div className="flex justify-end mt-4">
          <Pagination
            current={page}
            total={daftarBuku.length}
            pageSize={limit}
            onChange={(newPage) => setPage(newPage)}
            showSizeChanger={false}
          />
        </div>
      </Card>

      <Modal
        title="Konfirmasi Hapus"
        open={idBukuDihapus !== null}
        onOk={handleHapus}
        onCancel={handleBatalHapus}
        okText="Ya, Hapus"
        cancelText="Batal"
        okButtonProps={{ danger: true }}
      >
        <p>Apakah Anda yakin ingin menghapus buku ini?</p>
        <p className="text-gray-500 text-sm">
          Tindakan ini tidak dapat dibatalkan.
        </p>
      </Modal>
    </div>
  );
}