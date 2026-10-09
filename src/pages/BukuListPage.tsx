import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Table, Button, Pagination, Card, message, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useBukuList, useDeleteBuku } from '../hooks/useBuku';
import { getErrorMessage } from '../lib/errorMessage';
import type { Buku } from '../types';

export default function BukuListPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const [page, setPage] = useState(1);
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);
  const limit = 10;

  const { data, isLoading } = useBukuList(page, limit);
  const deleteBuku = useDeleteBuku();

  const handleLogout = () => {
    logout();
    navigate('/login');
    message.info('Anda telah keluar');
  };

  const handleConfirmDelete = async () => {
    if (!deletingBookId) return;

    try {
      const response = await deleteBuku.mutateAsync(deletingBookId);
      message.success(response.message);
    } catch (error) {
      message.error(getErrorMessage(error));
    } finally {
      setDeletingBookId(null);
    }
  };

  const columns: ColumnsType<Buku> = [
    { title: 'Judul', dataIndex: 'judul', key: 'judul' },
    { title: 'Penulis', dataIndex: 'penulis', key: 'penulis' },
    { title: 'Tahun', dataIndex: 'tahun', key: 'tahun', width: 100 },
    {
      title: 'Aksi',
      key: 'aksi',
      width: 95,
      fixed: 'end',
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
            onClick={() => setDeletingBookId(record.id)}
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
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
          dataSource={data?.data}
          rowKey="id"
          loading={isLoading}
          pagination={false}
          scroll={{x: 350}}
        />

        <div className="flex justify-end mt-4">
          <Pagination
            current={page}
            total={data?.meta?.totalData}
            pageSize={limit}
            onChange={(newPage) => setPage(newPage)}
            showSizeChanger={false}
          />
        </div>
      </Card>

      <Modal
        title="Konfirmasi Hapus"
        open={deletingBookId !== null}
        onOk={handleConfirmDelete}
        onCancel={() => setDeletingBookId(null)}
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
