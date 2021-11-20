const USD_CODE = 840;
const EUR_CODE = 978;
const GPB_CODE = 826;
const PLN_CODE = 985;

let EUR_RATE = 0;
let USD_RATE = 0;
let GPB_RATE = 0;
let PLN_RATE = 0;
function getCurrency() {
    fetch(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${new Date().toLocaleDateString('ru').replaceAll('/', '.')}`)
        .then((response) => {
        if (!response.ok) {
            setTimeout(getCurrency, 5000);
            throw new Error('error');
        }
        return response.json();
    })
        .then((data) => {
            document.getElementById('loading').style.display = 'none';
            EUR_RATE = data.exchangeRate.find((e) => e.currency === 'EUR')?.saleRate;
            USD_RATE = data.exchangeRate.find((e) => e.currency === 'USD')?.saleRate;
            GPB_RATE = data.exchangeRate.find((e) => e.currency === 'GBP')?.saleRate;
            PLN_RATE = data.exchangeRate.find((e) => e.currency === 'PLN')?.saleRate;

            document.getElementById('usd').innerHTML = USD_RATE
            document.getElementById('eur').innerHTML = EUR_RATE
            document.getElementById('pln').innerHTML = PLN_RATE
            document.getElementById('gpb').innerHTML = GPB_RATE
        })
        .catch(() => {});
}

// function getCurrency() {
//     fetch('https://api.monobank.ua/bank/currency')  .then((response) => {
//         if (!response.ok) {
//             setTimeout(getCurrency, 5000);
//             throw new Error('error');
//         }
//         return response.json();
//     })
//         .then((data) => {
//             document.getElementById('loading').style.display = 'none';
//             EUR_RATE = data.find((e) => e.currencyCodeA === EUR_CODE)?.rateSell;
//             USD_RATE = data.find((e) => e.currencyCodeA === USD_CODE)?.rateSell;
//             GPB_RATE = data.find((e) => e.currencyCodeA === GPB_CODE)?.rateCross;
//             PLN_RATE = data.find((e) => e.currencyCodeA === PLN_CODE)?.rateSell;
//
//             document.getElementById('usd').innerHTML = USD_RATE
//             document.getElementById('eur').innerHTML = EUR_RATE
//             document.getElementById('pln').innerHTML = PLN_RATE
//             document.getElementById('gpb').innerHTML = GPB_RATE
//         })
//         .catch(() => {});
// }
getCurrency()

function calculatePriceFor(type, cost) {
    switch (type) {
        case 'usd' : {
            const costInUAH = +USD_RATE * cost;
            const reward = costInUAH * 0.1 >= 20 ? costInUAH * 0.1 : 20;
            document.getElementById('res-usd').innerHTML = (costInUAH + reward).toFixed();
            break;
        }
        case 'pln' : {
            const costInUAH = +PLN_RATE * cost;
            const reward = costInUAH * 0.1 >= 20 ? costInUAH * 0.1 : 20;
            document.getElementById('res-pln').innerHTML = (costInUAH + reward).toFixed();
            break;
        }
        case 'gpb' : {
            const costInUAH = +GPB_RATE * cost;
            const reward = costInUAH * 0.1 >= 20 ? costInUAH * 0.1 : 20;
            document.getElementById('res-gpb').innerHTML = (costInUAH + reward).toFixed();
            break;
        }
        case 'eur' : {
            const costInUAH = EUR_RATE * cost;
            const reward = costInUAH * 0.1 >= 20 ? costInUAH * 0.1 : 20;
            document.getElementById('res-eur').innerHTML = (costInUAH + reward).toFixed();
            break;
        }

    }
}