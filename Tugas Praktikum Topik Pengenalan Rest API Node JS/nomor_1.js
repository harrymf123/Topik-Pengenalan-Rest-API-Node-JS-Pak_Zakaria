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

class Lingkaran {
    constructor(r,p){
        this.jari_jari = r
        this.phi = p
    }

    luasLingkaran = () => {
        return (this.phi * (this.jari_jari**2))
    }

    kelilingLingkaran = () => {
        return (2 * this.phi * this.jari_jari)
    }
}

class Tabung extends Lingkaran {
    constructor(r,p,t){
        super(r,p)
        this.tinggi = t
    }

    volumeTabung = () => {
        return (this.luasLingkaran() * this.tinggi)
    }

    luasPermukaanTabung = () => {
        return (this.phi * this.jari_jari * (this.jari_jari + (2 * this.tinggi)))
    }

    luasSelimutTabung = () => {
        return (this.kelilingLingkaran() * this.tinggi)
    }
}

class Kerucut extends Lingkaran {
    constructor(r,p,t){
        super(r,p)
        this.tinggi = t
        this.garis_pelukis = Math.sqrt((this.jari_jari**2) + (this.tinggi**2))
    }

    volumeKerucut = () => {
        return (1/3 * this.luasLingkaran() * this.tinggi)
    }

    luasPermukaanKerucut = () => {
        return (this.luasLingkaran() + this.luasSelimutKerucut())
    }

    luasSelimutKerucut = () => {
        return (this.phi * this.jari_jari * this.garis_pelukis)
    }
}

class Bola extends Lingkaran {
    constructor(r,p){
        super(r,p)
    }

    volumeBola = () => {
        return (4/3 * this.phi * (this.jari_jari**3))
    }

    luasPermukaanBola = () => {
        return (4 * this.luasLingkaran())
    }
}

class Balok{
    constructor(p,l,t){
        this.panjang = p
        this.lebar = l
        this.tinggi = t
    }

    volumeBalok = () => {
        return (this.panjang*this.lebar*this.tinggi)
    }
    
    luasPermukaanBalok = () => {
        return (2*((this.panjang*this.lebar) + (this.panjang*this.tinggi) + (this.tinggi * this.lebar)))
    }
}

let phi = 3.14;

// end-point "/bujur_sangkar" dengan method POST
app.post("/tabung", (req,res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let r = Number(req.body.jariJari) // mengambil nilai jari-jari dari body
    let t = Number(req.body.tinggi) // mengamil nilai tinggi dari body

    let tabung = new Tabung(r,phi,t)

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        jari_jari: r,
        tinggi: t,
        volumeTabung: tabung.volumeTabung()+" cm2",
        luasPermukaanTabung: tabung.luasPermukaanTabung() + " cm2"
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
})

// end-point "/bujur_sangkar" dengan method POST
app.post("/kerucut", (req,res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let r = Number(req.body.jariJari) // mengambil nilai jari-jari dari body
    let t = Number(req.body.tinggi) // mengamil nilai tinggi dari body

    let kerucut = new Kerucut(r,phi,t)

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        jari_jari: r,
        tinggi: t,
        volumeKerucut: kerucut.volumeKerucut()+" cm2",
        luasPermukaanKerucut: kerucut.luasPermukaanKerucut() + " cm2"
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
})

// end-point "/bujur_sangkar" dengan method POST
app.post("/bola", (req,res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let r = Number(req.body.jariJari) // mengambil nilai jari-jari dari body
    let t = Number(req.body.tinggi) // mengamil nilai tinggi dari body

    let bola = new Bola(r,phi,t)

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        jari_jari: r,
        tinggi: t,
        volumeBola: bola.volumeBola()+" cm2",
        luasPermukaanBola: bola.luasPermukaanBola() + " cm2"
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
})

// end-point "/bujur_sangkar" dengan method POST
app.post("/balok", (req,res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let p = Number(req.body.panjang)
    let l = Number(req.body.lebar) // mengambil nilai jari-jari dari body
    let t = Number(req.body.tinggi) // mengamil nilai tinggi dari body

    let balok = new Balok(p,l,t)

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        panjang: p,
        lebar: l,
        tinggi: t,
        volumeBalok: balok.volumeBalok()+" cm2",
        luasPermukaanBalok: balok.luasPermukaanBalok() + " cm2"
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
})

// menjalankan server pada port 8000
app.listen(8000, () => {
    console.log("Server run on port 8000");
})