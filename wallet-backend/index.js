import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import express, { json } from 'express';
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());


app.post("/generate-wallet", (req, res) => {
  try {
    const { mnemonic, index } = req.body;

    const seed = mnemonicToSeedSync(mnemonic);

    const path = `m/44'/501'/${index}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    const keypair = Keypair.fromSeed(derivedSeed.slice(0, 32));

    res.json({
      publicKey: keypair.publicKey.toBase58(),
      privateKey: bs58.encode(keypair.secretKey),
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
