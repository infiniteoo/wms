const bwipjs = require("bwip-js");
const sharp = require("sharp");
const fs = require("fs");

const barcodeGenerator = (textToGenerate) => {
  bwipjs.toBuffer(
    {
      bcid: "code128",
      text: textToGenerate,
      scale: 3,
      height: 10,
      includetext: false,
      textxalign: "center",
    },
    (err, svgBuffer) => {
      if (err) {
        console.error(err);
        return;
      }

      // Convert SVG buffer to PNG buffer using sharp
      sharp(svgBuffer)
        .toBuffer()
        .then((pngBuffer) => {
          // check to see if file exists first, if not, then write it to file
          if (
            !fs.existsSync("../generatedBarcodes/" + textToGenerate + ".png")
          ) {
            fs.writeFile(
              "../generatedBarcodes/" + textToGenerate + ".png",
              pngBuffer,
              (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              }
            );
          }

          // Save the PNG buffer to a file
        })
        .catch((error) => {
          console.error(error);
        });
    }
  );
};

module.exports = barcodeGenerator;
