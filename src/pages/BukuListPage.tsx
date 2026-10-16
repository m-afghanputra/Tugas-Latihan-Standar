import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button, Pagination, Card, message, Modal } from 'antd';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
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

  const columns= useMemo<GridColDef<Buku>[]> (() => [
    { headerName: 'Judul', field: 'judul', flex: 1, minWidth: 150 },
    { headerName: 'Penulis', field: 'penulis', flex: 1, minWidth: 150 },
    { headerName: 'Tahun', field: 'tahun', width: 100 },
    {
      headerName: 'Aksi',
      field: 'aksi',
      width: 160,
      renderCell: (params) => (
        <div className="space-x-2">
          <Button
            type="link"
            onClick={() => navigate(`/buku/edit/${params.row.id}`)}
          >
            Edit
          </Button>
          <Button 
            type="link"
            danger
            onClick={() => setDeletingBookId(params.row.id)}
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ],
  [navigate]
)

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
        <DataGrid
          columns={columns}
          rows={data?.data ?? []} 
          loading={isLoading}
          hideFooter
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
