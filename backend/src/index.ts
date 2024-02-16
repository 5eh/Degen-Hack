import express from "express";
import pinataSDK from "@pinata/sdk";
import fs from "fs";
const cors = require("cors");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" });
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 8080; // default port to listen
let pinata: any;
if (process.env.NODE_ENV === "production") {
  pinata = new pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_SECRET_KEY
  );
} else {
  const PinataKeys = require("./PinataKeys").default;
  pinata = new pinataSDK(PinataKeys.apiKey, PinataKeys.apiSecret);
}

const corsOptions = {
  origin: ["http://localhost:5173"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

// defines a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello developers!");
});

// handles minting
app.post("/mint", upload.single("image"), async (req, res) => {
  const multerReq = req as any;
  if (!multerReq.file) {
    return res.status(500).json({ status: false, msg: "no file provided" });
  }

  const fileName = multerReq.file.filename;

  try {
    // Test Pinata authentication
    await pinata.testAuthentication();

    // Create a readable stream for the file
    const readableStreamForFile = fs.createReadStream(`./uploads/${fileName}`);
    const options = {
      pinataMetadata: {
        name: req.body.title.replace(/\s/g, "-"),
        keyvalues: {
          description: req.body.description,
        },
      },
    };

    // Pin file to IPFS
    const pinnedFile = await pinata.pinFileToIPFS(
      readableStreamForFile,
      options
    );
    if (!pinnedFile.IpfsHash || pinnedFile.PinSize <= 0) {
      throw new Error("File was not pinned");
    }

    // Remove file from server
    fs.unlinkSync(`./uploads/${fileName}`);

    // Create and pin metadata
    const metadata = {
      // ...metadata fields...
    };

    const pinnedMetadata = await pinata.pinJSONToIPFS(metadata, {
      pinataMetadata: {
        name: "TUT-metadata",
      },
    });

    if (!pinnedMetadata.IpfsHash || pinnedMetadata.PinSize <= 0) {
      throw new Error("Metadata were not pinned");
    }

    // Send success response
    res.status(200).json({
      status: true,
      msg: {
        imageHash: pinnedFile.IpfsHash,
        metadataHash: pinnedMetadata.IpfsHash,
      },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: false, msg: "An error occurred", error: err.message });
  }
});


// starts the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
