/**

Author: Akintade Britto;
Year: 2018;
Description: A Vanilla-js library to convert amount in one currency to another.

*/
if ('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js')
  .then(function(reg) {
    // Message for successful sw registration
    console.log('Successful! Currency Converter SW has been registered.');
  }).catch(function(error) {
    // Message for failed sw registration
    console.log(`UNSUCCESSFUL! Currency Converter SW registration failed. ${error}`);
  });
}

        let currencies_url;

        currencies_url = "https://free.currencyconverterapi.com/api/v5/currencies";

        fetch(currencies_url)
        .then(res => res.json())
        .then(JSONdata => JSobj = JSONdata)
        .then(() => {
            // console.log(JSobj);
            const results = JSobj.results;
            let resultsKeys = Object.keys(results).sort();
            // let resultsValues = Object.values(results);
            let dropdownText = "";
            for (item of resultsKeys){
                dropdownText += `<option value="${results[item].id}">${results[item].id} (${results[item].currencyName})</option>`;
            }
            document.getElementById("fromThisCurrencyId").innerHTML = `<option value=""></option>${dropdownText}`;
            document.getElementById("toThatCurrencyId").innerHTML = `<option value=""></option>${dropdownText}`;
            // console.log(dropdownText);
        });


        function convertCurrency() {
          let amountEntered;
          let fromInput;
          let toInput;
          let query;
          let conversionDetails;
          let conversion_url;
          let conversionRate;
          let convertedValue;
          amountEntered = document.getElementById("amountInThisCurrency").value;
          fromCurrency = encodeURIComponent(document.getElementById("fromThisCurrencyId").value);
          toCurrency = encodeURIComponent(document.getElementById("toThatCurrencyId").value);
          if (amountEntered == "") {
        alert("Enter an amount");
        document.getElementById("amountInThisCurrency").focus();
        return false;
      } else if (fromCurrency == "") {
        alert("Choose a Currency to convert from");
        document.getElementById("fromThisCurrencyId").focus();
        return false;
      } else if (toCurrency == "") {
        alert("Select a Currency to convert to");
        document.getElementById("toThatCurrencyId").focus();
        return false;
      }
          amount = Math.abs(amountEntered);
          query = `${fromCurrency}_${toCurrency}`;
          conversion_url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}`;

          fetch(conversion_url)
          .then(res => res.json())
          .then(data => conversionDetails = data)
          .then(() => {
            conversionRate = conversionDetails.results[query].val;
            convertedValue = (amount * conversionRate).toFixed(2);
            document.getElementById('conversionResult').innerHTML = ` = <b>${convertedValue}</b>`
            // console.log(convertedValue);
          })
          .catch(() => {
            convertedValue = 'Something is not right! Check your Connection and try again.';
            // document.getElementById("conversionResultField").value = convertedValue;
            document.getElementById('conversionResult').innerHTML = ` <span class="text-warning">${convertedValue}</span>`
            });
        }
