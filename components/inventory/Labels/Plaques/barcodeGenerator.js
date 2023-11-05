const bwipjs = require("bwip-js");
const sharp = require("sharp");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const barcodeGenerator = (textToGenerate) => {
  return new Promise(async (resolve, reject) => {
    // Define the filename and path in the Supabase bucket
    const filename = `${textToGenerate}.png`;
    const bucketPath = `${filename}`;

    // Check if the file already exists in the Supabase bucket
    const { data: files, error } = await supabase.storage
      .from("barcodes")
      .list();

    if (error) {
      console.error(error);
      reject(error); // Reject the promise in case of an error
      return;
    }

    const fileExists = files.some((file) => file.name === filename);

    if (!fileExists) {
      try {
        // Generate barcode as SVG buffer
        const svgBuffer = await new Promise((resolve, reject) => {
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
                reject(err);
              } else {
                resolve(svgBuffer);
              }
            }
          );
        });

        // Convert SVG buffer to PNG buffer using sharp
        const pngBuffer = await sharp(svgBuffer).toBuffer();

        // Upload the PNG buffer to the Supabase bucket
        await supabase.storage.from("barcodes").upload(bucketPath, pngBuffer);
        console.log(`File uploaded to Supabase bucket: ${filename}`);

        resolve(); // Resolve the promise when the upload is successful
      } catch (uploadError) {
        console.error("Upload error:", uploadError);
        reject(uploadError); // Reject the promise in case of an upload error
      }
    } else {
      console.log(`File already exists in the Supabase bucket: ${filename}`);
      resolve(); // Resolve the promise if the file already exists
    }
  });
};

module.exports = barcodeGenerator;
