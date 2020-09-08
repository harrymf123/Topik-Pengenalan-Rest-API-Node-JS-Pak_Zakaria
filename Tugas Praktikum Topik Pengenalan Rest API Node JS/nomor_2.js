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

app.get("/convert/celcius/:nilai", (req,res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let nilai = parseInt(req.params.nilai)

    let reamur = (4/5 * nilai)
    let fahrenheit = ((9/5 * nilai) + 32)
    let kelvin = (nilai + 273)

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        reamur : reamur,
        fahrenheit : fahrenheit,
        kelvin : kelvin
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json({
        'celcius' : nilai,
        'result'  : response
    })
})

app.get("/convert/reamur/:nilai", (req,res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let nilai = parseInt(req.params.nilai)

    let celcius = (5/4 * nilai)
    let fahrenheit = ((9/4 * nilai) + 32)
    let kelvin = (celcius + 273)

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        celcius : celcius,
        fahrenheit : fahrenheit,
        kelvin : kelvin
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json({
        'reamur' : nilai,
        'result'  : response
    })
})

app.get("/convert/kelvin/:nilai", (req,res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let nilai = parseInt(req.params.nilai)

    let celcius = (nilai - 273)
    let reamur = (4/5 * celcius)
    let fahrenheit = ((9/5 * celcius) + 32)

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        celcius : celcius,
        fahrenheit : fahrenheit,
        reamur : reamur
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json({
        'kelvin' : nilai,
        'result'  : response
    })
})

app.get("/convert/fahrenheit/:nilai", (req,res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let nilai = parseInt(req.params.nilai)

    let celcius = (5/9 * (nilai - 32))
    let reamur = (4/9 * (nilai - 32))
    let kelvin = (celcius + 273)

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        celcius : celcius,
        reamur : reamur,
        kelvin : kelvin
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json({
        'fahrenheit' : nilai,
        'result'  : response
    })
})

// menjalankan server pada port 8000
app.listen(8000, () => {
    console.log("Server run on port 8000");
})