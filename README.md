# Ravintola Scrambler
Ravintola Scrambler on web-sovellus, joka tarjoaa käyttäjilleen mahdollisuuden tarkastella eri ravintoloiden ruokalistoja. Sovellus on toteutettu JavaScriptillä, ja se käyttää CSS-tyylittelyä ulkoasunsa määrittämiseen. Tietojen hakuun käytetään REST API -rajapintaa. Sovellus vaatii Metropolian VPN:yhteyttä.
## Käyttöohjeet
**Kirjautuminen ja rekisteröityminen**: Sovelluksen yläpalkista löytyy painikkeet "Kirjaudu" ja "Rekisteröidy". Kirjautuminen onnistuu syöttämällä käyttäjätunnus ja salasana avautuvaan ikkunaan. Rekisteröityminen vaatii käyttäjätunnuksen, sähköpostiosoitteen ja salasanan syöttämisen.  
**Ravintolahaku**: Sovelluksen keskellä on "Hae ravintolaa nimellä" -painike. Painiketta painamalla avautuu hakutoiminto, johon voit syöttää haluamasi ravintolan nimen.  
**Ravintolan tiedot**: Hakutuloksista ravintolaa klikkaamalla avautuu ravintolan tiedot, mukaan lukien päivän ja viikon menut.  
**Suosikkiravintolan tallennus**: Ravintolan tietoikkunassa on "Suosikki" -painike, jota klikkaamalla kyseinen ravintola tallentuu suosikiksi. Suosikkiravintolan tiedot näkyvät käyttäjän profiilissa.  
**Profiili**: Yläpalkista löytyy "Profiili" -painike, josta pääsee tarkastelemaan omia tietojaan. Profiilissa näkyy myös tallennettu suosikkiravintola.  
## Toimintaperiaate
Sovellus hakee ravintoloiden tiedot REST API -rajapinnan kautta. Tiedot haetaan ja käsitellään JavaScriptillä. Käyttäjän toimintojen, kuten kirjautumisen, rekisteröitymisen ja suosikkiravintolan tallennuksen, tiedot tallennetaan selaimen local storageen.  Ravintolan tietojen näyttäminen perustuu Leaflet-kirjaston avulla toteutettuun karttaan, jossa ravintolat näkyvät merkkeinä. Merkkiä klikkaamalla avautuvat kyseisen ravintolan tiedot.  CSS-tyylittelyllä määritellään sovelluksen ulkoasu. Responsiivisuus on toteutettu CSS:n media queryjen avulla, jolloin sovelluksen ulkoasu mukautuu eri näyttökokojen mukaan.
