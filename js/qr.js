function generateQR() {
  const input = document.getElementById("qrInput").value;

  document.getElementById("qrcode").innerHTML = "";

  new QRCode(document.getElementById("qrcode"), {
    text: input,
    width: 200,
    height: 200
  });
}
