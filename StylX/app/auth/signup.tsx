import { SignupScreen } from '../../screens/SignupScreen';
import { useNavigation } from 'expo-router';

export default function SignupPage() {
  const navigation = useNavigation() as any;
  return <SignupScreen navigation={navigation} />;
}
