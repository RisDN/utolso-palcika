
const startGomb = document.querySelector('.startGomb')
const jatekos1SzovegDoboz = document.querySelector('#jatekos1')
const jatekos2SzovegDoboz = document.querySelector('#jatekos2')
const meccsElozmenyekGomb = document.querySelector('.meccsElozmenyek')

// Változók
let jatekosok = {}
let palcikak = 0
let eppenKiLep
let osszLepesekSzama = 0
let lepesekSzama1 = 0
let lepesekSzama2 = 0
let idoTartamPerc = 0
let idoTartamMasodperc = 0
let folyamatban = false

startGomb.addEventListener('click', (e) => {
    if (jatekos1SzovegDoboz.value.length != 0) {
        if (jatekos2SzovegDoboz.value.length != 0) {

            if (jatekos1SzovegDoboz.value.includes(' ') != true) {
                if (jatekos2SzovegDoboz.value.includes(' ') != true) {

                    jatekosok = {
                        nev1: jatekos1SzovegDoboz.value.charAt(0).toUpperCase() + jatekos1SzovegDoboz.value.slice(1),
                        nev2: jatekos2SzovegDoboz.value.charAt(0).toUpperCase() + jatekos2SzovegDoboz.value.slice(1),

                        pont1: 0,
                        pont2: 0,

                    }
                    kiFogKezdeni()
                    eredmenyjelzoMegjelenites(jatekosok)
                    palcikaMennyisegGeneralas()

                } else { hiba(1) }
            } else { hiba(1) }

        } else { hiba(0) }
    } else { hiba(0) }
})



const bejelentkezoKepernyo = document.querySelector('.bejelentkezes')
const kerdesFelirat = document.querySelector('.kerdes')
const aJatekRolKepernyo = document.querySelector('.hogyan')
const jatekTer = document.querySelector('.palya')
const kiFogKezdeniGomb1 = document.querySelector('.jatekos1Kezd')
const kiFogKezdeniGomb2 = document.querySelector('.jatekos2Kezd')


function kiFogKezdeni() {
    szamlaloKijelzo.innerHTML = ''
    nyertesKepernyo.style.display = 'none'
    bejelentkezoKepernyo.style.display = 'none'
    kerdesFelirat.style.display = 'none'
    aJatekRolKepernyo.style.display = 'none'
    startGomb.style.display = 'none'
    jatekTer.style.display = 'block'
    meccsElozmenyekGomb.style.display = 'none'

    kiFogKezdeniGomb1.innerHTML = jatekosok.nev1
    kiFogKezdeniGomb2.innerHTML = jatekosok.nev2

    kiFogKezdeniGomb1.addEventListener('click', () => {
        jatekInditas(1)
    })
    kiFogKezdeniGomb2.addEventListener('click', () => {
        jatekInditas(2)
    })

}

const szamlaloKijelzo = document.querySelector('.szamlalo')

function idoTartamSzamlalas() {
    if (folyamatban == true) {
        szamlaloKijelzo.innerHTML = `<strong>${idoTartamPerc} perc </strong> <strong>${idoTartamMasodperc} másodperc`

        idoTartamMasodperc++
        if (idoTartamMasodperc == 59) {
            idoTartamMasodperc = 0
            idoTartamPerc++
        }
        //console.log(`${idoTartamPerc} perc ${idoTartamMasodperc}`)
    }
}

const szamlaloCiklus = window.setInterval(function() {
    idoTartamSzamlalas()
}, 1000);


const mennyisegSorsolasAblak = document.querySelector('.mennyisegSorsolas')
const kiFogKezdeniAblak = document.querySelector('.kiFogKezdeni')
const kiKovetkezikKijelzo = document.querySelector('.kiKovetkezikKijelzo')
const iranyitasok = document.querySelector('.iranyitas')
const elvesz1 = document.querySelector('#elveszek1')
const elvesz2 = document.querySelector('#elveszek2')




elvesz1.addEventListener('click', () => {
    elvesz(1)
})

elvesz2.addEventListener('click', () => {
    elvesz(2)
})

function jatekInditas(kiKezd) {
    folyamatban = true
    idoTartamSzamlalas()
    mennyisegSorsolasAblak.style.display = 'none'
    kiFogKezdeniAblak.style.display = 'none'
    iranyitasok.style.display = 'block'
    jelenlegiPalcikaKijelzo.innerHTML = `Jelenleg <b>${palcikak}</b> pálcika van a pályán`
    palcikakMegjelenitese(palcikak)
    if (kiKezd == 1) {
        kiKovetkezikKijelzo.innerHTML = `A játékot <strong>${jatekosok.nev1}</strong> kezdi`;
        eppenKiLep = 1
    }
    if (kiKezd == 2) {
        kiKovetkezikKijelzo.innerHTML = `A játékot <strong>${jatekosok.nev2}</strong> kezdi`;
        eppenKiLep = 2
    }

}



function forditas() {
    if (eppenKiLep == 1) {
        eppenKiLep = 2
        kiKovetkezikKijelzo.innerHTML = `<strong>${jatekosok.nev2}</strong> következik!`
    } else {
        eppenKiLep = 1
        kiKovetkezikKijelzo.innerHTML = `<strong>${jatekosok.nev1}</strong> következik!`
    }
}

const jelenlegiPalcikaKijelzo = document.querySelector('.jelenlegiPalcikaKijelzo')

function elvesz(mennyit) {
    osszLepesekSzama = osszLepesekSzama + 1
    //console.log('A(z)', eppenKiLep, '-es játékos elvett')
    if (eppenKiLep == 1) { lepesekSzama1 = lepesekSzama1 + 1 }
    if (eppenKiLep == 2) { lepesekSzama2 = lepesekSzama2 + 1 }
    palcikak = palcikak - mennyit
    jelenlegiPalcikaKijelzo.innerHTML = `Jelenleg <b>${palcikak}</b> pálcika van a pályán`
    if (palcikak <= 0) {
        jatekVege()
    } else {
        palcikakMegjelenitese(palcikak)
        forditas()
    }
}

const nyertesKepernyo = document.querySelector('.nyertesKepernyo')
const kiNyertKijelzo = document.querySelector('.kiNyertKijelzo')
const statisztikakDoboz = document.querySelector('.statisztikak')

function jatekVege() {
    let elozmeny
    folyamatban = false
    palcikakDoboza.innerHTML = ''
    iranyitasok.style.display = 'none'
    nyertesKepernyo.style.display = 'block'
    szamlaloKijelzo.style.display = 'none'

    let id = parseInt(localStorage.getItem('palcika-id'))

    if (eppenKiLep == 1) {
        kiNyertKijelzo.innerHTML = `A kört <strong>${jatekosok.nev1}</strong> nyerte! <i style="font-size: 30px;" class="fas fa-crown"></i>`
        jatekosok.pont1 = jatekosok.pont1 + 1
        eredmenyjelzoMegjelenites(jatekosok)
        elozmeny = {
            id: id,
            nyertes: jatekosok.nev1,
            vesztes: jatekosok.nev2,
            tartott: `${idoTartamPerc} perc ${idoTartamMasodperc} másodperc`,
            osszlepesek: osszLepesekSzama,
            nyertesLepesei: lepesekSzama1,
            vesztesLepesei: lepesekSzama2
        }
        let adat = JSON.parse(localStorage.getItem('palcika-adat'))
        adat.push(elozmeny)
        localStorage.setItem('palcika-adat', JSON.stringify(adat))
        localStorage.setItem('palcika-id', id+1)
    }
    if (eppenKiLep == 2) {
        kiNyertKijelzo.innerHTML = `A kört <strong>${jatekosok.nev2}</strong> nyerte! <i style="font-size: 30px;" class="fas fa-crown"></i>`
        jatekosok.pont2 = jatekosok.pont2 + 1
        eredmenyjelzoMegjelenites(jatekosok)
        elozmeny = {
            id: id,
            nyertes: jatekosok.nev2,
            vesztes: jatekosok.nev1,
            tartott: `${idoTartamPerc} perc ${idoTartamMasodperc} másodperc`,
            osszlepesek: osszLepesekSzama,
            nyertesLepesei: lepesekSzama2,
            vesztesLepesei: lepesekSzama1
        }
        let adat = JSON.parse(localStorage.getItem('palcika-adat'))
        adat.push(elozmeny)

        //console.log(adat, JSON.stringify(JSON.stringify(adat)))

        localStorage.setItem('palcika-adat', JSON.stringify(adat))
        localStorage.setItem('palcika-id', id+1)
    }

    statisztikakDoboz.innerHTML = `
        <li>Lépések száma: <strong>${osszLepesekSzama}</strong></li>
        <li>${jatekosok.nev1} lépéseinek száma: <strong>${lepesekSzama1}</strong></li>
        <li>${jatekosok.nev2} lépéseinek száma: <strong>${lepesekSzama2}</strong></li>
        <li>Időtartam: <strong>${idoTartamPerc}</strong> perc <strong>${idoTartamMasodperc}</strong> másodperc</li>
        `
}


function ujKor() {
    idoTartamPerc = 0
    idoTartamMasodperc = 0
    valtozokAlaphelyzetbe()
    kiFogKezdeni()
    eredmenyjelzoMegjelenites(jatekosok)
    palcikaMennyisegGeneralas()
    szamlaloKijelzo.style.display = 'block'
    mennyisegSorsolasAblak.style.display = 'block'
    kiFogKezdeniAblak.style.display = 'block'
}


function valtozokAlaphelyzetbe() {
    palcikak = 0
    osszLepesekSzama = 0
    lepesekSzama1 = 0
    lepesekSzama2 = 0
    idoTartamPerc = 0
    idoTartamMasodperc = 0
    folyamatban = false
}

const palcikakDoboza = document.querySelector('.palcikak')

function palcikakMegjelenitese(mennyiseg) {
    if(mennyiseg >= 13) {
        palcikakDoboza.innerHTML = ''
        for (let i = 0; i < 13; i++) {
            palcikakDoboza.innerHTML += `
            <div class="palcika">
                <img draggable="false" height="125" width="125" src="src/palcika.png">
            </div>
            `
        }
    } else {
        palcikakDoboza.innerHTML = ''
        for (let i = 0; i < mennyiseg; i++) {
            palcikakDoboza.innerHTML += `
            <div class="palcika">
                <img draggable="false" height="125" width="125" src="src/palcika.png">
            </div>
            `
        }
    }
}



const jatekosKijelzo1 = document.querySelector('.jatekos1')
const jatekosKijelzo2 = document.querySelector('.jatekos2')
const jatekosElvalaszto = document.querySelector('.jatekosElvalaszto')

function eredmenyjelzoMegjelenites(jatekosok) {
    jatekosKijelzo1.innerHTML = ` <strong>${jatekosok.pont1}</strong> ${jatekosok.nev1} `
    jatekosKijelzo2.innerHTML = ` ${jatekosok.nev2} <strong>${jatekosok.pont2}</strong> `
    jatekosElvalaszto.innerHTML = ' - '
}


const palcikaMennyisegKijelzo = document.querySelector('.mennyisegSorsolasKijelzo')

function palcikaMennyisegGeneralas() {
    palcikak = randomSzam(5, 15)
    palcikaMennyisegKijelzo.innerHTML = `<strong>${palcikak}</strong>`
}


function hiba(hibakod) {
    if (hibakod == 0) {
        hibaU('Kérlek adj meg kettő nevet a kezdéshez!')
    }
    if (hibakod == 1) {
        hibaU('A nevek nem tartalmazhatnak szóközt!')
    }
}

const hibaUzenet = document.getElementById('hiba-uzenet')
const hibaUzenetKijelzo = document.getElementById('hiba-uzenet-kijelzo')

function hibaU(uzenet) {
    hibaUzenetKijelzo.innerHTML = uzenet
    hibaUzenet.style.display = 'block'
    setTimeout(function() {
        hibaUzenet.style.display = 'none'
    }, 3000)
}

function randomSzam(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function kilepes() {
    window.close()
}

/*
document.onkeydown = gombLenyomas;
document.onkeypress = gombLenyomas
document.onkeyup = gombLenyomas;

var megynyomva = false;

function gombLenyomas(e){
    e = e || window.event;
    if( megynyomva ) return; 
     
    if (e.keyCode == 116) { //f5
        window.location.reload()
        megynyomva = true;
    }
}*/

const adat = JSON.parse(localStorage.getItem('palcika-adat'))


const nincsElozmeny = document.querySelector('.meccsElozmenyekNincs')



if(adat == null) { 
    let ures = []
    localStorage.setItem('palcika-adat', JSON.stringify(ures))

    let nulla = 1
    localStorage.setItem('palcika-id', nulla) 
}



const meccsElozmeenyekDoboz = document.querySelector('.modal-body')

function mentettElozmenyekBetoltes() {
    nincsElozmeny.style.display = 'none'
    let adat = JSON.parse(localStorage.getItem('palcika-adat'))
    adat.forEach(elem => {
        //console.log(elem)
        let ujElem = document.createElement('div')
        ujElem.className = 'elozmeny'
        ujElem.id = elem.id

        ujElem.innerHTML = 
        `
            <h6 style="text-align: left;">Mérkőzés #<b>${elem.id}</b> <span style="float: right;"><span class="nyertes"><i style="font-size: 15px; color: #D1B000;" class="fas fa-crown"></i> <b>${elem.nyertes}</b></span> vs <span class="vesztes"><b>${elem.vesztes}</b></span></span></h6>
            <h6 style="text-align: left;">Lépések: <strong>${elem.vesztesLepesei} + ${elem.nyertesLepesei} = ${elem.osszlepesek}</strong> <span style="float: right;">${elem.tartott}ig</h6>
        `
        meccsElozmeenyekDoboz.appendChild(ujElem)
    });
}

if(adat != '[]') {
    if(adat != null) {}
    mentettElozmenyekBetoltes()
}

function elozmenyekTorlese() {
    localStorage.removeItem('palcika-adat')
    localStorage.removeItem('palcika-id')
    window.location.reload()
}

const adatOssz = parseInt(localStorage.getItem('palcika-id'))

if(adatOssz == 1) {
    document.getElementById('nincs').style.display = 'block'
}