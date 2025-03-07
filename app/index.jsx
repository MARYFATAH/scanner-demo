import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { CameraView } from "expo-camera";
import { useState } from "react";

export default function Index() {
  const [isbn, setIsbn] = useState("1238978990");
  const [scannedCode, setScannedCode] = useState(null);

  const handleScannedResult = ({ data }) => {
    if (data !== scannedCode) {
      setScannedCode(data);
      setIsbn(data); // Update ISBN state
      console.debug("Scanned code: " + data);
    } else {
      console.debug("Already scanned code: " + data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan a Book</Text>
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ["ean13"],
        }}
        onBarcodeScanned={({ data }) => {
          handleScannedResult({ data }); // Pass an object with a data property
        }}
        style={styles.camera}
      />
      <Link
        href={{
          pathname: `/details/${scannedCode}`,
        }}
        style={styles.link}
      >
        <Text style={styles.linkText}>Book Details</Text>
        <Text style={styles.isbnText}>ISBN: {isbn}</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  camera: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1e90ff",
    borderRadius: 5,
  },
  linkText: {
    color: "#fff",
    fontSize: 18,
  },
  isbnText: {
    fontSize: 16,
    marginTop: 10,
    color: "#555",
  },
});
