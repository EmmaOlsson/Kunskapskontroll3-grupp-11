# Kunskapskontroll3-grupp-11
Gruppmedlemmar:
- Jonathan Mårtensson Glad
- Emma Olsson
- Mamoun Alchalabi


<!-- Ansvarsområden -->


Gemensamt skapade vi index.html och grunddesignen för spelet i style.css
Vi delade upp ansvarsområdena enligt nedan, men har under arbetets gång hjälpts åt när det dykt upp problem.

Gruppmedlemmarna huvudsakliga ansvarsområden:

Jonathan:
- DOM-manipulation
- Huvudansvar för CSS och HTML

Emma:
- API
- Assynkronisk programmering
- ReadMe-filen

Mamoun:
- Spelets logik

<!-- Memory Game -->

- Innan spelet startar behöver användaren välja om memorykorten ska bestå av bilder på katter, hästar eller hundar.

- När användaren valt kategori sker följande:
    - Kategoriknapparna försvinner och ersätts av knappen för att starta ett nytt spel. 
    - Memorykorten läggs ut med bilderna vända nedåt.

- Användaren kan nu klicka på ett kort och en bild visas och användaren behöver trycka på ett kort till för att hitta en matchande bild.
    - Om två olika bilder visas, kommer dessa att att vändas tillbaka efter en sekund och antal försök (tries) kommer att öka med ett.
    - Om två lika kort visas kommer bilderna som matchar inte att vändas tillbaka. Antal försök (tries) kommer att öka med ett och antal poäng (score) kommer att öka med ett.

- Spelet är slut när användaren har hittat 24 matchande bilder och dessa är vända uppåt. 
- Användaren får då upp en alert om hur många försök (tries) spelet klarades på.

- Användaren har möjlighet att starta om spelet när som helst genom att klicka på 'New Game'-knappen. De olika kategorialternativen kommer då upp igen.

