# CRUD Reactissa käyttäen react-route-dom -kirjastoa

## Listaa käyttäjät (Read Users):

- Komponentissa `UserBS`.jsx useEffect-hook lataa käyttäjät osoitteesta: http://localhost:8080/users.

```javascript
const response = await fetch("http://localhost:8080/users");
const data = await response.json();
setUsers(data.users);
setLoading(false); // Aseta lataus epätodeksi, kun tiedot on haettu
```

- Vastaus saapuu JSON-muodossa, ja se tallennetaan vakioon data.
- Tämä tallennetaan users-taulukkoon, joka koostuu käyttäjäobjekteista, käyttäen setUsers-hookia.
- Latauksen ollessa käynnissä (loading: true) näytetään latausviesti, virheen sattuessa näytetään virheviesti.

## Poista käyttäjä (Delete User):

- Käyttäjät listataan käyttäen map-metodia, joka näyttää jokaisen käyttäjän MongoDB:n luoman '\_id'.
- Kun "Delete" -nappia painetaan, suoritetaan deleteUser-funktio, jonka argumenttina on poistettavan käyttäjän '\_id'.

```javascript
const response = await fetch(`http://localhost:8080/users/${userId}`, {
  method: "DELETE",
});
if (response.ok) {
  // Poista poistettu käyttäjä tilasta
  setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
} else {
  console.error("Käyttäjän poistaminen epäonnistui");
}
```

## Päivitä käyttäjä (Edit User):

- `UsersBS`-komponentissa "Update"-napin painamisen yhteydessä käynnistetään sivuefekti editUser(user), jonka argumenttina on kyseinen käyttäjäobjekti.
- editUser-funktio asettaa selectedUser-staten ja ohjaa käyttäjän CreateUsersBS-sivulle.

```javascript
setSelectedUser(user);
navigate("/CreateUsersBS", { state: { selectedUser: user } });
```

- `CreateUsersBS`-komponentissa käytetään useLocation-hookia, jolla vastaanotetaan selectedUser-state.
- useEffect-hookissa asetetaan userData-tilan arvot valitun käyttäjän tietoihin.

```javascript
setUserData({
  name: selectedUser.name,
  email: selectedUser.email,
  password: selectedUser.password,
});
```

- handleSubmit-funktion ehtolause muuttuu käyttäjän päivittämiseksi, jos selectedUser on käytössä, muuten luodaan uusi käyttäjä.

## Käyttäjän muokkaus (PUT) tai luonti (POST):

- Kun käyttäjä painaa "Edit User" -nappia, handleSubmit-funktio estää lomakkeen lähettämisen oletuksena ja käsittelee seuraavat vaiheet:
- Tekee PUT-pyynnön päivittääkseen käyttäjän tiedot serverillä.
- Jos pyyntö onnistuu (vastaus ok), käyttäjä on päivitetty onnistuneesti ja käyttäjä ohjataan takaisin käyttäjien listaussivulle (/UsersBS).
- Muussa tapauksessa näytetään virheviesti.

```javascript
koodia;
```

## Luo käyttäjä (Create User):

- Jos selectedUser-tilaa ei ole, se tarkoittaa, että käyttäjä on luomassa uutta käyttäjää.
- Käyttäjä täyttää lomakkeen ja painaa "Create User" -nappia.
- handleChange-funktio päivittää userData-tilan käyttäjän syöttämien tietojen mukaisesti.
- handleSubmit-funktio estää lomakkeen lähettämisen oletuksena ja käsittelee seuraavat vaiheet:
- Tekee POST-pyynnön luodakseen uuden käyttäjän serverillä.
- Jos pyyntö onnistuu (vastaus ok), käyttäjä on luotu onnistuneesti ja käyttäjä ohjataan takaisin - käyttäjien listaussivulle (/UsersBS).
- Muussa tapauksessa näytetään virheviesti.
