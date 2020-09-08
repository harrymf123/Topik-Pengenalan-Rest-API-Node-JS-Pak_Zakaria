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

app.post("/bmi", (req,res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let beratBadan = parseInt(req.body.berat_badan_kg)
    let tinggiBadanCM = parseInt(req.body.tinggi_badan_cm)
    let tinggiBadanM = parseInt(req.body.tinggi_badan_m)
    let tinggiBadan = 0
    
    if(tinggiBadanCM){
        tinggiBadan = tinggiBadanCM / 100
    }else if(tinggiBadanM){
        tinggiBadan = tinggiBadanM
    }

    let hitungBMI = (beratBadan / (tinggiBadan**2))
    console.log(hitungBMI)

    let status = ""

    if(hitungBMI < 18.5){
        console.log("BMI            = Kurang dari 18.5")
        console.log("Status         = Kekurangan berat badan")
        status = "Kekurangan berat badan"
    }else if(hitungBMI >= 18.5 && hitungBMI <= 24.9){
        console.log("BMI            = 18.5 - 24.9")
        console.log("Status         = Normal(Ideal)")
        status = "Normal(Ideal)"
    }else if(hitungBMI >= 25.0 && hitungBMI <= 29.9){
        console.log("BMI            = 25.0 - 29.9")
        console.log("Status         = Kelebihan berat badan")
        status = "Kelebihan berat badan"
    }else{
        console.log("BMI            = 30.0 atau lebih")
        console.log("Status         = Kegemukan(Obesitas)")
        status = "Kegemukan(Obesitas)"
    }

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        bmi : hitungBMI,
        statusBeratBadan : status
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json({
        'beratBadan' : beratBadan + " kg",
        'tinggiBadan' : tinggiBadan + " m",
        'result'  : response
    })
})

// menjalankan server pada port 8000
app.listen(8000, () => {
    console.log("Server run on port 8000");
})