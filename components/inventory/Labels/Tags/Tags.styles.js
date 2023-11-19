import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  column: {
    width: "100%",
    padding: 5,
    backgroundColor: "#f0f0f0",
  },
  logo: {
    width: 80,
    height: 40,
    marginBottom: 7,
  },
  title: {
    fontSize: 20,
    textAlign: "right",
    marginBottom: 5,
  },
  lpn: {
    fontSize: 18,
    textAlign: "left",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "col",
    justifyContent: "space-between",
  },
  box: {
    backgroundColor: "lightgray",
    padding: 10,
    marginBottom: 20,
    fontSize: 14,
    marginTop: 10,
  },
});
