export default async function handler(req, res) {
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
        dueDate: new Date().toISOString().split('T')[0],
        customer: "cus_000167623554"
      })
    });

    const data = await response.json();

    return res.status(200).json({
      success: true,
      pix: {
        qrCodeImage: data.pix.qrCodeImage,
        payload: data.pix.payload,
        value: value
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
