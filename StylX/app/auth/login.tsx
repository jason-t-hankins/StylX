import { LoginScreen } from '../../screens/LoginScreen';
import { useNavigation } from 'expo-router';

export default function LoginPage() {
  const navigation = useNavigation() as any;
  return <LoginScreen navigation={navigation} />;
}
