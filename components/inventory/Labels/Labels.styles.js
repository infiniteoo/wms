import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "black",
  },
  column: {
    width: "100%",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  logo: {
    width: 120,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    textAlign: "center",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
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
  labelGeneratorsBox: {
    width: "100%",
  },
});
