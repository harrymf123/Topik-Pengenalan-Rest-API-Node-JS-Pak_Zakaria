const express = require("express") // memanggil library express js
const bodyParser = require("body-parser") // memanggil library body-parser
const cors = require("cors") // memanggil library cors

const app = express(); // eksekusi module express

// penggunaan body-parser untuk ekstrak data request berformat JSON
app.use(bodyParser.json())

// penggunaan body-parser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({extended: true}))

// penggunaan cors agar end point dapat diakses oleh cross platform
app.use(cors())

app.post("/decimal", (req,res) => {
    let x = req.body.angka;
    x = parseInt(x);
    if(isNaN(x)||req.body.angka == "")
    {
        let response = {
            alert: "Masukkan nilai decimal"
        }
        res.json(response)
    }

    let bin = x.toString(2);
    let hex = x.toString(16).toUpperCase();
    let okt = x.toString(8);

    let response = {
        biner: bin,
        hexadecimal: hex,
        octal: okt
    }

    res.json({
        'decimal': x,
        'result' : response
    })
})


app.post("/biner", (req,res) => {
    let x = req.body.angka;
    x = parseInt(x, 2);
    if(isNaN(x)||req.body.angka == "")
    {
        let response = {
            alert: "Masukkan nilai biner"
        }
        res.json(response)
    }

    let dec = x;
    let bin = x.toString(2);
    let hex = x.toString(16).toUpperCase();
    let okt = x.toString(8);

    let response = {
        decimal: dec,
        hexadecimal: hex,
        octal: okt
    }

    res.json({
        'biner': bin,
        'result' : response
    })
})


app.post("/hexadecimal", (req,res) => {
    let x = req.body.angka;
    x = parseInt(x, 16);
    if(isNaN(x)||req.body.angka == "")
    {
        let response = {
            alert: "Masukkan nilai hexadecimal"
        }
        res.json(response)
    }

    let dec = x;
    let bin = x.toString(2);
    let hex = x.toString(16).toUpperCase();
    let okt = x.toString(8);

    let response = {
        decimal: dec,
        biner: bin,
        octal: okt
    }

    res.json({
        'hexadecimal': hex,
        'result' : response
    })
})


app.post("/octal", (req,res) => {
    let x = req.body.angka;
    x = parseInt(x, 8);
    if(isNaN(x)||req.body.angka == "")
    {
        let response = {
            alert: "Masukkan nilai octal"
        }
        res.json(response)
    }

    let dec = x;
    let bin = x.toString(2);
    let hex = x.toString(16).toUpperCase();
    let okt = x.toString(8);

    let response = {
        decimal: dec,
        biner: bin,
        hexadecimal: hex
    }

    res.json({
        'octal': okt,
        'result' : response
    })
})



// menjalankan server pada port 8000
app.listen(8000, () => {
    console.log("Server run on port 8000");
})