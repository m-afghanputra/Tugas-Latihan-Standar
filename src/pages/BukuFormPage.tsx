import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutateBuku } from '../hooks/useBuku';
import { Button, Input, Card, message } from 'antd';

// Schema validasi ketat menggunakan Zod
const bukuSchema = z.object({
  judul: z.string().min(3, 'Judul minimal 3 karakter'),
  penulis: z.string().min(3, 'Nama penulis minimal 3 karakter'),
  tahun: z.coerce.number()
    .min(1900, 'Tahun tidak valid')
    .max(new Date().getFullYear(), 'Tahun tidak boleh di masa depan'),
});

// Tipe untuk form values
type BukuFormValues = z.infer<typeof bukuSchema>;

export default function BukuFormPage() {
  const navigate = useNavigate();
  const mutateBuku = useMutateBuku();

  // Gunakan useForm TANPA generic type, biarkan zodResolver yang handle
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(bukuSchema),
    defaultValues: {
      tahun: new Date().getFullYear(),
      judul: '',
      penulis: '',
    }
  });

  // Fungsi submit - gunakan type annotation langsung di parameter
  const onSubmit = async (data: any) => {
    try {
      const typedData = data as BukuFormValues;
      await mutateBuku.mutateAsync(typedData);
      message.success('Buku berhasil ditambahkan');
      navigate('/');
    } catch (error) {
      console.error(error);
      message.error('Gagal menambahkan buku');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card title="Tambah Buku Baru">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Judul</label>
            <Input 
              {...register('judul')} 
              status={errors.judul ? 'error' : ''} 
            />
            {errors.judul && (
              <p className="text-red-500 text-sm mt-1">{String(errors.judul.message)}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Penulis</label>
            <Input 
              {...register('penulis')} 
              status={errors.penulis ? 'error' : ''} 
            />
            {errors.penulis && (
              <p className="text-red-500 text-sm mt-1">{String(errors.penulis.message)}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tahun Terbit</label>
            <Input 
              type="number" 
              {...register('tahun')} 
              status={errors.tahun ? 'error' : ''} 
            />
            {errors.tahun && (
              <p className="text-red-500 text-sm mt-1">{String(errors.tahun.message)}</p>
            )}
          </div>

          <div className="flex space-x-2 pt-4">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isSubmitting}
            >
              Simpan
            </Button>
            <Button onClick={() => navigate('/')}>
              Batal
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}