import { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import Loading from "./loading";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/signup");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={{ flex: 1 }}>
      <Loading />
    </View>
  );
}

