const bwipjs = require("bwip-js");
const sharp = require("sharp");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Initialize the Supabase client

const barcodeGenerator = async (textToGenerate) => {
  // Generate barcode as SVG buffer
  const svgBuffer = await new Promise((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: "code128", // Barcode type (e.g., 'code128', 'qrcode', etc.)
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

  // Define the filename and path in the Supabase bucket
  const filename = `${textToGenerate}.png`;
  const bucketPath = `${filename}`;

  // Check if the file already exists in the Supabase bucket
  const { data, error } = await supabase.storage.from("barcodes").list();
  if (error) {
    console.error(error);
    return;
  }

  const fileExists = data.some((file) => file.name === filename);

  if (!fileExists) {
    // Upload the PNG buffer to the Supabase bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("barcodes")
      .upload(bucketPath, pngBuffer);

    if (uploadError) {
      console.error(uploadError);
      return;
    }

    console.log(`File uploaded to Supabase bucket: ${filename}`);
  } else {
    console.log(`File already exists in the Supabase bucket: ${filename}`);
  }

  // Generate and return the URL of the saved image
  const imageUrl = supabase.storage.from("barcodes").getPublicUrl(bucketPath);

  return imageUrl;
};

module.exports = barcodeGenerator;
