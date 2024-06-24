document
  .getElementById("converter-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const amount = e.target.amount.value;
    const currency = e.target.currency.value;
    const messageElement = document.getElementById("message");

    messageElement.innerText = "";

    if (amount === "" || amount <= 0) {
      messageElement.innerText = "Please enter an amount greater than zero.";
      return;
    }

    try {
      const response = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (!data || !data.rates || !data.rates[0] || !data.rates[0].mid) {
        throw new Error("Invalid data received from API");
      }

      const rate = data.rates[0].mid;
      const result = amount * rate;
      document.getElementById("result").innerText = `${result.toFixed(2)} PLN`;
    } catch (error) {
      messageElement.innerText =
        "There was a problem with the conversion: " + error.message;
    }
  });
