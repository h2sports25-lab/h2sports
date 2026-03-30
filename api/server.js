const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/criar-pagamento", async (req, res) => {
  try {
    const { value } = req.body;

    const response = await fetch("https://api.asaas.com/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access_token": "SUA_API_KEY_AQUI"
      },
      body: JSON.stringify({
        billingType: "PIX",
        value: value,
        dueDate: new Date().toISOString().split("T")[0],
        customer: "cus_000167623554"
      })
    });

    const data = await response.json();

    res.json({
      success: true,
      pix: {
        qrCodeImage: data.pix.qrCodeImage,
        payload: data.pix.payload,
        value: value
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando"));
