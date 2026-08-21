const express = require('express');
const app = express();

const conversion_rate = {
    "usd": 1460,
    "eur": 1300,
    "gbp": 200
}

app.get('/convert', (req, res) => {
    const {amount, currency} = req.query;

    if (amount === undefined || currency === undefined){
        return res.status(400).json({
            error: "The amount can't be undefined"
        })
    }
    const parsedAmount = parseFloat(amount);
    const loweredCurrency = currency.toLocaleLowerCase();

    if (isNaN(parsedAmount) || !conversion_rate[loweredCurrency] ){
        res.status(400).json({
            error: 'The amount has to be number or the currency one of usd, eur, gbp'
        })
    }
    const rate = conversion_rate[loweredCurrency];
    const conversedAmount = parsedAmount * rate;

    return res.status(200).json( {
        "input": { "amount": amount, "currency": loweredCurrency },
        "convertedAmount": conversedAmount,
        "unit": "RWF"
})
    
})

app.listen(3000);