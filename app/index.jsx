import { Link } from "expo-router";
import { Text, View, Button, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useEffect } from "react";

export default function Index() {
  const [barCode, setBarCode] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (barCode) {
      fetchBookScanbarcode(barCode);
    }
  }, [barCode]);

  async function fetchBookScanbarcode(barCode) {
    try {
      const response = await fetch(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${barCode}&jscmd=details&format=json`
      );
      const data = await response.json();
      setBook(data[`ISBN:${barCode}`]?.details || null);
      console.log(book);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  }

  const renderPermissionMessage = () => (
    <View style={styles.container}>
      <Text style={styles.message}>
        We need your permission to show the camera
      </Text>
      <Button onPress={requestPermission} title="grant permission" />
    </View>
  );

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return renderPermissionMessage();
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={(barcode) => {
          setBarCode(barcode.data);
          setBook(null);
        }}
      ></CameraView>
      <Button
        onPress={() => {
          setIsActive(!isActive);
          setBarCode(null);
          setBook(null);
          console.log(barCode.data);
        }}
        title={isActive ? "reset" : "scan"}
      />
      <Text>{barCode}</Text>
      {book && (
        <View>
          <Text>{book.title}</Text>
          <Text>{book.authors?.map((author) => author.name).join(", ")}</Text>
          <Text>{book.publish_date}</Text>
        </View>
      )}
      <Link
        href={{
          pathname: "/bookDetails",
          params: { bookId: barCode },
        }}
      >
        <Text>Book Details</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
  },
  camera: {
    width: 300,
    height: 300,
  },
});
