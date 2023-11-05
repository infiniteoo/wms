const ReactPDF = require("@react-pdf/renderer");
const React = require("react");
const axios = require("axios");
const fs = require("fs");
const styles = require("./pdfStyles");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://xtvcfdhxsmjophktihxa.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headers = {
  authorization: `Bearer ${supabaseApiKey}`,
  "Content-Type": "application/json",
};

// Function to download an image and save it locally
const downloadImage = async (url, filename) => {
  const response = await axios.get(url, {
    headers,
    responseType: "arraybuffer",
  });

  fs.writeFileSync(filename, Buffer.from(response.data));
};

const PDF = async ({ data }) => {
  const pages = [];

  await Promise.all(
    data.map(async (item) => {
      for (let i = 0; i < item.numberOfPallets; i++) {
        const barcodeImageFilename = `${item.itemNumber}_${i}.png`;
        const imageUrl = `https://xtvcfdhxsmjophktihxa.supabase.co/storage/v1/object/public/${item.itemNumber}.png`;

        await downloadImage(imageUrl, barcodeImageFilename);

        pages.push(
          React.createElement(
            ReactPDF.Page,
            { size: "A4", style: styles.page },
            React.createElement(
              ReactPDF.View,
              { style: styles.container },
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
                      src: "https://xtvcfdhxsmjophktihxa.supabase.co/storage/v1/object/sign/barcodes/102523.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYXJjb2Rlcy8xMDI1MjMucG5nIiwiaWF0IjoxNjk5MTQ1NDE2LCJleHAiOjE3MzA2ODE0MTZ9.bJ-Q11nbu3dpLJu3TGJM_5kygjJCUau6cUIeqMCMRAw&t=2023-11-05T00%3A50%3A16.286Z", // Use the downloaded image
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
                      src: "https://xtvcfdhxsmjophktihxa.supabase.co/storage/v1/object/sign/barcodes/102523.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYXJjb2Rlcy8xMDI1MjMucG5nIiwiaWF0IjoxNjk5MTQ1NDE2LCJleHAiOjE3MzA2ODE0MTZ9.bJ-Q11nbu3dpLJu3TGJM_5kygjJCUau6cUIeqMCMRAw&t=2023-11-05T00%3A50%3A16.286Z", // Use the downloaded image
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
                      src: "https://xtvcfdhxsmjophktihxa.supabase.co/storage/v1/object/sign/barcodes/102523.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYXJjb2Rlcy8xMDI1MjMucG5nIiwiaWF0IjoxNjk5MTQ1NDE2LCJleHAiOjE3MzA2ODE0MTZ9.bJ-Q11nbu3dpLJu3TGJM_5kygjJCUau6cUIeqMCMRAw&t=2023-11-05T00%3A50%3A16.286Z", // Use the downloaded image
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
                      "BBD/ Expiry Date: "
                    ),
                    React.createElement(
                      ReactPDF.Text,
                      { style: styles.customerName },
                      item.expirationDate
                    ),
                    React.createElement(ReactPDF.Image, {
                      style: styles.barcode,
                      src: "https://xtvcfdhxsmjophktihxa.supabase.co/storage/v1/object/sign/barcodes/102523.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYXJjb2Rlcy8xMDI1MjMucG5nIiwiaWF0IjoxNjk5MTQ1NDE2LCJleHAiOjE3MzA2ODE0MTZ9.bJ-Q11nbu3dpLJu3TGJM_5kygjJCUau6cUIeqMCMRAw&t=2023-11-05T00%3A50%3A16.286Z", // Use the downloaded image
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
    })
  );

  return React.createElement(ReactPDF.Document, null, pages);
};

module.exports = async function renderPDF(data) {
  const stream = await ReactPDF.renderToStream(
    React.createElement(PDF, { data })
  );
  return stream;
};
