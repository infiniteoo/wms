const ReactPDF = require("@react-pdf/renderer");

const styles = ReactPDF.StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    border: 4, // Add border
    borderColor: "red",
    borderStyle: "dotted",
    borderRadius: 5,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    display: "flex",
  },
  dairyContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "left",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  middleHolder: {
    justifyContent: "space-evenly",
    marginTop: 15,
  },
  emptySpace: {
    height: "5%",
  },
  middleContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingRight: 20,

    /* ... newColumn and newRow styles ... */
  },

  paragraph: {
    fontSize: 24,
    color: "grey",
  },

  customerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
    textAlign: "left",
    justifyContent: "start",
    textTransform: "uppercase",
    marginTop: 10,
  },
  customerName: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
    marginBottom: 3,
    marginLeft: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  newColumn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    marginLeft: 20, // Adjust this value as needed
    display: "flex", // Add this property to enable flex layout
    justifyContent: "space-between", // Space out evenly
  },
  newRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    marginLeft: 20, // Adjust this value as needed
    display: "flex", // Add this property to enable flex layout
    justifyContent: "space-between", // Space out evenly
  },
  dairyImage: {
    height: "100rem",
  },
  barcode: {
    height: "50px",
  },
  dairyText: {
    fontSize: 18,
    color: "grey",
    textAlign: "center",
    justifyContent: "start",
  },
  image: {
    width: "20%",
    height: "auto",
  },
  topTextContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  topText: {
    fontSize: 24,
    color: "black",
    marginBottom: 5,
    marginLeft: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  divider: {
    height: 2,
    backgroundColor: "gray",
    marginBottom: 20,
    marginTop: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
    marginRight: 5,
    width: "30%",
  },
  value: {
    fontSize: 14,
    width: "70%",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  bottomText: {
    fontSize: 14,
  },
});

module.exports = styles;
