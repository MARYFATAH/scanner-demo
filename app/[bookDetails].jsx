import { View, Text } from "react-native";
import { useSearchParams } from "expo-router";
import { useEffect } from "react";

export default function BookDetails() {
  const params = useSearchParams();
  return (
    <View>
      <Text>Book Details</Text>
      <Text>{params.id}</Text>
      <Text>{params.title}</Text>
    </View>
  );
}
