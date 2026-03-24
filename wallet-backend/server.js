import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import express from "express";
import cors from "cors";

const app = express();

// ✅ CORS (you can restrict later)
app.use(cors());
app.use(express.json());

// ✅ Health check route (important for Railway)
app.get("/", (req, res) => {
  res.send("Wallet API is running 🚀");
});

app.post("/generate-wallet", (req, res) => {
  try {
    const { mnemonic, index } = req.body;

    if (!mnemonic || index === undefined) {
      return res.status(400).json({ error: "Missing mnemonic or index" });
    }

    const seed = mnemonicToSeedSync(mnemonic);

    const path = `m/44'/501'/${index}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    const keypair = Keypair.fromSeed(derivedSeed.slice(0, 32));

    return res.json({
      publicKey: keypair.publicKey.toBase58(),
      privateKey: bs58.encode(keypair.secretKey),
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Wallet generation failed",
    });
  }
});

// ✅ IMPORTANT: Railway port fix
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
