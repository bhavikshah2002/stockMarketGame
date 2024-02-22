import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useAsyncStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const fetch = async () => {
      const val = await AsyncStorage.getItem(key);
      if (!val) return;

      setValue(JSON.parse(val));
    };

    fetch();
  }, [key]);

  useEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
