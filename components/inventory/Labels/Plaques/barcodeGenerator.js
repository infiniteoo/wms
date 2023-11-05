const bwipjs = require("bwip-js");
const sharp = require("sharp");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const barcodeGenerator = async (textToGenerate) => {
  // Define the filename and path in the Supabase bucket
  const filename = `${textToGenerate}.png`;
  const bucketPath = `${filename}`;

  // Check if the file already exists in the Supabase bucket
  const { data: files, error } = await supabase.storage.from("barcodes").list();

  if (error) {
    console.error(error);

    return;
  }

  const fileExists = files.some((file) => file.name === filename);

  if (!fileExists) {
    try {
      // Generate barcode as SVG buffer

      bwipjs.toBuffer(
        {
          bcid: "code128",
          text: textToGenerate,
          scale: 3,
          height: 10,
          includetext: false,
          textxalign: "center",
        },
        async (err, svgBuffer) => {
          if (err) {
            console.error(err);
            return;
          } else {
            // Convert SVG buffer to PNG buffer using sharp
            const pngBuffer = await sharp(svgBuffer).toBuffer();

            // Upload the PNG buffer to the Supabase bucket
            await supabase.storage
              .from("barcodes")
              .upload(bucketPath, pngBuffer);
            console.log(`File uploaded to Supabase bucket: ${filename}`);
          }
        }
      );
    } catch (uploadError) {
      console.error("Upload error:", uploadError);
    }
  } else {
    console.log(`File already exists in the Supabase bucket: ${filename}`);
  }
};

module.exports = barcodeGenerator;
