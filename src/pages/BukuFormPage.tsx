import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useBukuDetail, useMutateBuku } from '../hooks/useBuku';
import { getErrorMessage } from '../lib/errorMessage';
import { Button, Input, Card, message } from 'antd';

// Schema validasi menggunakan Zod
const bukuSchema = z.object({
  judul: z.string().min(3, 'Judul minimal 3 karakter'),
  penulis: z.string().min(3, 'Nama penulis minimal 3 karakter'),
  tahun: z.coerce
    .number()
    .min(1900, 'Tahun tidak valid')
    .max(new Date().getFullYear(), 'Tahun tidak boleh di masa depan'),
});

// z.coerce.number() di Zod v4: input bertipe unknown, output bertipe number
type BukuFormInput = z.input<typeof bukuSchema>;
type BukuFormValues = z.output<typeof bukuSchema>;

export default function BukuFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = id !== undefined;

  const mutateBuku = useMutateBuku();
  const { data: detail } = useBukuDetail(id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BukuFormInput, unknown, BukuFormValues>({
    resolver: zodResolver(bukuSchema),
    defaultValues: {
      tahun: new Date().getFullYear(),
      judul: '',
      penulis: '',
    },
  });

  // Mode edit: isi form dengan data buku yang diambil
  useEffect(() => {
    if (detail?.data) {
      const { judul, penulis, tahun } = detail.data;
      reset({ judul, penulis, tahun });
    }
  }, [detail, reset]);

  const onSubmit = async (data: BukuFormValues) => {
    try {
      const response = await mutateBuku.mutateAsync({ id, payload: data });
      message.success(response.message);
      navigate('/');
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card title={isEditMode ? 'Edit Buku' : 'Tambah Buku Baru'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Judul</label>
            <Controller
              name="judul"
              control={control}
              render={({ field }) => (
                <Input {...field} status={errors.judul ? 'error' : ''} />
              )}
            />
            {errors.judul && (
              <p className="text-red-500 text-sm mt-1">
                {errors.judul.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Penulis</label>
            <Controller
              name="penulis"
              control={control}
              render={({ field }) => (
                <Input {...field} status={errors.penulis ? 'error' : ''} />
              )}
            />
            {errors.penulis && (
              <p className="text-red-500 text-sm mt-1">
                {errors.penulis.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tahun Terbit
            </label>
            <Controller
              name="tahun"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  {...field}
                  value={field.value as number}
                  status={errors.tahun ? 'error' : ''}
                />
              )}
            />
            {errors.tahun && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tahun.message}
              </p>
            )}
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Simpan
            </Button>
            <Button onClick={() => navigate('/')}>Batal</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
