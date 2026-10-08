import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button, Input, Card, message } from 'antd';
import { authService } from '../services/authService';
import { getErrorMessage } from '../lib/errorMessage';

// Validasi skema menggunakan Zod
const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await authService.login(values);
      if (!response.data) throw new Error('Response login tidak berisi data');

      login(response.data.token, response.data.user);
      message.success(response.message);
      navigate('/');
    } catch (error) {
      message.error(getErrorMessage(error));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card title="Login" className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field dengan Controller */}
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Email"
                  {...field}
                  status={errors.email ? 'error' : ''}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password field pake controller */}
          <div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  placeholder="Password"
                  {...field}
                  status={errors.password ? 'error' : ''}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className="w-full"
          >
            Masuk
          </Button>
        </form>
      </Card>
    </div>
  );
}
