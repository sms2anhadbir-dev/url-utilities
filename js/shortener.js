function generateCode(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

function shortenURL() {
  const url = document.getElementById("urlInput").value;

  if (!url) {
    alert("Please enter a URL");
    return;
  }

  const code = generateCode();

  const links = JSON.parse(localStorage.getItem("ezlinks")) || {};

  links[code] = url;

  localStorage.setItem("ezlinks", JSON.stringify(links));

  const shortURL = `${window.location.origin}/go/?id=${code}`;

  document.getElementById("result").value = shortURL;
}

function copyLink() {
  const result = document.getElementById("result");

  result.select();

  navigator.clipboard.writeText(result.value);

  alert("Copied!");
}
