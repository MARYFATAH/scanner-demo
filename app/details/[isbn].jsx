import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function BookDetails() {
  const { isbn } = useLocalSearchParams();
  const [data, setData] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`
      );
      const data = await response.json();
      setData(data[`ISBN:${isbn}`]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [isbn]);

  if (JSON.stringify(data) === "{}") {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Book is not found!</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Details</Text>
      <Text style={styles.detailText}>ISBN: {isbn}</Text>
      <Text style={styles.detailText}>Name: {data.details.title}</Text>
      <Text style={styles.detailText}>
        Author: {data.details.authors[0].name}
      </Text>
      <Text style={styles.detailText}>
        Publisher: {data.details.publishers[0]}
      </Text>
      <Text style={styles.detailText}>
        Publish Date: {data.details.publish_date[0]}
      </Text>
      <Text style={styles.detailText}>
        Number of pages: {data.details.number_of_pages}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginVertical: 5,
  },
});
