# goCRUD - Fullstack Web Application

Tämä projekti demonstroi, miten käyttää Go-kieltä ja Gin-webkehystä luomaan yhteys MongoDB-tietokantaan eri reiteillä käyttäjien lisäämiseksi/lukemiseksi/päivittämiseksi/poistamiseksi. Lisäksi projekti sisältää React-frontendin Bootstrap-tyylittelyllä, joka tekee fullstack-sovelluksesta visuaalisesti houkuttelevamman.

## Tietokantayhteys

Projekti hyödyntää Go-kieltä ja Gin-webkehystä luodakseen tehokkaan tietokantayhteyden MongoDB-tietokantaan. Käyttämällä eri reittejä voit suorittaa seuraavat toiminnot:

- **Pääsivu:** Pääsivu sovellukseen.
  ![alt text](https://github.com/MikaValjakka/goCRUDMONGO/blob/master/readmeImages/mainPage.png)
- **Hae käyttäjät/Päivitä käyttäjä/Poista käyttäjä** Hae kaikki käyttäjätiedot tietokannasta.
   ![alt text](https://github.com/MikaValjakka/goCRUDMONGO/blob/master/readmeImages/UserPage.png)
- **Luo käyttäjä:** Luo uusi käyttäjä.
![alt text](https://github.com/MikaValjakka/goCRUDMONGO/blob/master/readmeImages/createUserPage.png)


## Frontend

Projekti sisältää React-frontendin, joka on tyylitelty Bootstrapin avulla. Tämä tekee sovelluksesta visuaalisesti houkuttelevan ja helposti käytettävän.

## Projektin Tarkoitus

Tämän projektin tarkoitus on näyttää motivaatiota Go-kielen nopeaan oppimiseen (projekti valmistettiin noin 4 päivässä) ja sen käyttöön perusweb-sovelluksen CRUD-toiminnallisuuksien toteuttamiseen.

---

Lisätietoja Go-kielestä, Gin-webkehystä ja MongoDB:stä löydät niiden virallisilta verkkosivuilta:

- [Go-kieli](https://golang.org/)
- [Gin-webkehys](https://gin-gonic.com/)
- [MongoDB](https://www.mongodb.com/)

Voit myös kloonata tämän projektin ja tutkia koodia oppiaksesi lisää!
## Docker-asennus

Jos haluat käyttää tätä projektia Dockerin avulla, voit noutaa ja suorittaa sen seuraavilla komennoilla:

```bash
docker pull mikavee/portfoliorepo:gocrud
docker run -p 8080:8080 mikavee/portfoliorepo:gocrud
