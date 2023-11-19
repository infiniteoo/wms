const ReactPDF = require("@react-pdf/renderer");
const React = require("react");
const styles = require("./pdfStyles");

const PDF = ({ data }) => {
  const pages = [];

  const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  data.forEach((item, index) => {
    for (let i = 0; i < item.numberOfPallets; i++) {
      const imageUrl = `https://xtvcfdhxsmjophktihxa.supabase.co/storage/v1/object/public/barcodes/`;

      pages.push(
        React.createElement(
          ReactPDF.Page,
          { key: `${index}_${i}`, size: "A4", style: styles.page },

          React.createElement(
            ReactPDF.View,
            { style: styles.container },

            React.createElement(
              ReactPDF.View,
              { style: styles.topContainer },

              React.createElement(ReactPDF.View, {
                style: styles.dairyContainer,
              })
            ),

            React.createElement(
              ReactPDF.View,
              { style: styles.middleHolder },

              React.createElement(
                ReactPDF.View,
                { style: styles.middleContainer },

                React.createElement(
                  ReactPDF.View,
                  { style: styles.newColumn },

                  React.createElement(
                    ReactPDF.Text,
                    { style: styles.customerText },
                    "FGF ITEM #: "
                  ),
                  React.createElement(
                    ReactPDF.Text,
                    { style: styles.customerName },

                    item.itemNumber
                  ),

                  React.createElement(ReactPDF.Image, {
                    style: styles.barcode,
                    src: {
                      uri: imageUrl + `${item.itemNumber}.png`,
                      headers: {
                        Authorization: `Bearer ${supabaseApiKey}`,
                      },
                    },
                  })
                )
              ),
              React.createElement(
                ReactPDF.View,
                { style: styles.middleContainer },
                React.createElement(
                  ReactPDF.View,
                  { style: styles.newColumn },

                  React.createElement(
                    ReactPDF.Text,
                    { style: styles.customerText },
                    "FGF Item Description: "
                  ),
                  React.createElement(
                    ReactPDF.Text,
                    { style: styles.customerName },

                    item.itemDescription
                  )
                )
              ),
              React.createElement(
                ReactPDF.View,
                { style: styles.middleContainer },

                React.createElement(
                  ReactPDF.View,
                  { style: styles.newColumn },

                  React.createElement(
                    ReactPDF.Text,
                    { style: styles.customerText },
                    "MFG / Supplier Batch #: "
                  ),
                  React.createElement(
                    ReactPDF.Text,
                    { style: styles.customerName },

                    item.supplierBatchNumber
                  ),

                  React.createElement(ReactPDF.Image, {
                    style: styles.barcode,
                    src: {
                      uri: imageUrl + `${item.supplierBatchNumber}.png`,
                      headers: {
                        Authorization: `Bearer ${supabaseApiKey}`,
                      },
                    },
                  })
                )
              ),
              React.createElement(
                ReactPDF.View,
                { style: styles.middleContainer },

                React.createElement(
                  ReactPDF.View,
                  { style: styles.newColumn },

                  React.createElement(
                    ReactPDF.Text,
                    { style: styles.customerText },
                    "MFG / Production Date: "
                  ),
                  React.createElement(
                    ReactPDF.Text,
                    { style: styles.customerName },

                    item.productionDate
                  ),

                  React.createElement(ReactPDF.Image, {
                    style: styles.barcode,
                    src: {
                      uri: imageUrl + `${item.productionDate}.png`,
                      headers: {
                        Authorization: `Bearer ${supabaseApiKey}`,
                      },
                    },
                  })
                )
              ),
              React.createElement(
                ReactPDF.View,
                { style: styles.middleContainer },

                React.createElement(
                  ReactPDF.View,
                  { style: styles.newColumn },

                  React.createElement(
                    ReactPDF.Text,
                    { style: styles.customerText },
                    "Expiry Date: "
                  ),
                  React.createElement(
                    ReactPDF.Text,
                    { style: styles.customerName },

                    item.expirationDate
                  ),

                  React.createElement(ReactPDF.Image, {
                    style: styles.barcode,
                    src: {
                      uri: imageUrl + `${item.expirationDate}.png`,
                      headers: {
                        Authorization: `Bearer ${supabaseApiKey}`,
                      },
                    },
                  }),
                  React.createElement(
                    ReactPDF.Text,
                    { style: styles.customerText },
                    "Quantity: "
                  ),
                  React.createElement(
                    ReactPDF.Text,
                    { style: styles.customerName },

                    item.quantity
                  ),
                  React.createElement(
                    ReactPDF.Text,
                    { style: styles.customerText },
                    "Unit of Measure: "
                  ),
                  React.createElement(
                    ReactPDF.Text,
                    { style: styles.customerName },

                    item.unitOfMeasure
                  )
                )
              )
            ),

            React.createElement(
              ReactPDF.View,
              { style: styles.bottomContainer },

              React.createElement(
                ReactPDF.Text,
                { style: styles.paragraph },
                "Pallet " + (i + 1) + " of " + item.numberOfPallets
              )
            )
          )
        )
      );
    }
  });
  return React.createElement(ReactPDF.Document, null, pages);
};

module.exports = async function renderPDF(data) {
  const stream = await ReactPDF.renderToStream(
    React.createElement(PDF, { data })
  );
  return stream;
};
