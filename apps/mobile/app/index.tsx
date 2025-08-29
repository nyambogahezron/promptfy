import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function Index() {
  const isAuthenticated = true;
  // const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href="/(home)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
