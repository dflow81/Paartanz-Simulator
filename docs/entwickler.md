# Entwicklerdokumentation

Der Simulator ist eine statische Webseite ohne Build-Schritt. Alle Skripte sind normale `<script>`-Dateien und teilen sich einen globalen Namensraum. Die Ladereihenfolge steht in `tanzsimulator.html`.

## Ladereihenfolge und Aufgaben

| Datei | Aufgabe | braucht Fenster |
|---|---|---|
| `js/basis.js` | Richtungen, Haltungen, `S()`, `tanz()`, `folge()` | nein |
| `figuren/*.js` | Figuren und Folgen | nein |
| `figuren/info.js` | Kursstufe, Typ, Beschreibung je Figur (`INFO`) | nein |
| `figuren/belegt.js` | Figuren mit Quelle (`QUELLEN`) und belegter Fußarbeit (`TECHNIK_DATEN`) | nein |
| `figuren/lehrplan.js` | Lehrplan-Ergänzung: 73 schematische Figuren der Abgleichliste mit Stufe und Beschreibung (`LEHRPLAN_NEU`) | nein |
| `figuren/quellen.js` | Mit Quelle abgeglichene Figuren (BallroomGuide): ersetzen die schematischen Fassungen, mit Fußarbeit in `TECHNIK_DATEN` (`QUELLE_GEPRUEFT`) | nein |
| `figuren/arme.js` | Armaktionen je Schritt (Feld `arm`), per Regel und gezielt | nein |
| `figuren/syllabus.js` | Abgleichliste je Tanz und Stufe (`SYLLABUS`) | nein |
| `js/speicher.js` | eigene Figuren und Folgen im Browser | nein (`localStorage`) |
| `js/engine.js` | Schrittsimulation von Herr und Dame, Raumlenkung | nein |
| `js/figurdaten.js` | `figMeta`, `uebergang`, `schleifePruefen`, `folgePruefen`, `folgeErzeugen`, `folgeFuerStufe` | nein |
| `js/technik.js` | `technikVon`, `ausrichtung`, `lehrerDaten`, `qualitaetFigur`, `qualitaetAlle` | nein |
| `js/szene.js` | 3D-Szene und Tänzer | ja |
| `js/app.js` | Wiedergabe, Menüs, Editoren, Musik | ja |
| `js/lernen.js` | Lernmodus in fünf Stufen | ja |
| `js/profi.js` | Technikanzeige, Tanzlehrer, Profi-Lernmodus, Turniermodus, Qualitätsprüfung | ja |

## Datenmodell

Eine Figur ist `{name, dance, bpm, steps, dame?}`. Ein Schritt entsteht mit `S(Fuß, Richtung, cm, Schläge, Zählung, Drehung°, Haltung)`. Drehung positiv heißt links. Fehlt `dame`, tanzt die Dame gegengleich und die Engine berechnet ihre Position aus dem Herrn.

Zusätzliche Schrittfelder:
- `tip`: Führungshinweis
- `df`: besondere Fußarbeit der gegengleichen Dame, z. B. `'ferse'`

Zusätzliches Figurenfeld:
- `ganz`: Die Dame gleicht ihren Anfangsabstand schon in der ersten Figurenhälfte aus.

Alles Ableitbare wird nicht gespeichert, sondern von `figMeta()` berechnet: Füße, Haltungen, Drehung, Schläge, Rhythmus, Schwierigkeit.

`INFO[id] = [Stufe, Typ, Beschreibung, Hinweis]`. Stufen: 1 Einsteiger, 2 Bronze, 3 Silber, 4 Gold, 5 Goldstar, 6 Turnier, 7 Freies Tanzen. Hinweis `v` = Armführung vereinfacht, `s` = Schrittfolge schematisch.

`SYLLABUS[Tanz][Stufe]` enthält Einträge `'Name=kurzeId'` (umgesetzt, ohne Präfix `b_`) oder `'Name'` (fehlt noch). Trägt man eine neue Figur dort ein, verschwindet sie aus dem Lückenbericht und bekommt die Stufe, sofern `INFO` keine festlegt.

## Tanzdaten: Stil, Takt, Zählschema, Phrase

`TANZ_DATEN` in `js/engine.js` ist die einzige Quelle für Bewegungsstil, Takt (Schläge pro Takt), Zählschema und Phrase (Schläge, in deren Vielfachen eine Figur aufgehen soll) je Tanz. Engine (Metronom), Metadaten (`taktOf`) und Qualitätsprüfung (`phraseVon`) lesen daraus. Tanznamen, die dort fehlen (eigene Figuren), werden über den Namen eingeordnet; „Argentin…“ wird vor der allgemeinen Tango-Regel geprüft.

Weitere Tabellen in `figuren/info.js`:
- `ALIAS[id] = [zielId, Erklärung, 'v'?]` für Figuren mit denselben Schritten wie eine andere Figur. Beide IDs bleiben gültig.
- `RHYTHMUS_VARIANTE[id]` für bewusst abweichende Figurenlängen; die Qualitätsprüfung meldet sie nicht als Fehler.

Pausen (`halt`) dürfen ohne Zählzeit stehen. Ein Schritt ohne Zählzeit gilt als Datenfehler.

## Takt in der Wiedergabe

Die betonte Eins wird ab dem Anfang der Folge durchgezählt (`taktZaehl` in `js/app.js`), über Figurenwechsel und den Neubeginn hinweg (`taktBasis`). Beginnt die erste Figur nicht auf 1 (Cha-Cha auf 2), zählt das Einzählen bis zur Eins davor (`einzaehl`).

## Regeln der Übergangsprüfung

`uebergang(A,B)` verlangt denselben Tanz, den freien Fuß für Herr und Dame und eine passende Haltung. Feste Haltungsregeln:
- Fächer schließt nur an Fächer an.
- Aus einer Seitenposition (Körbchen, Schatten) geht es nur in dieselbe Position.
- In den fünf Standardtänzen folgt auf eine Figur, die in der Promenade endet, eine Figur, die in der Promenade beginnt.

Alle anderen Haltungswechsel sind erlaubt und werden als Hinweis gemeldet. Beginnt eine Standardfigur in der Promenade, obwohl die vorige nicht dort endet, ist der Wechsel als „vereinfacht“ markiert.

`schleifePruefen(items)` prüft den Übergang von der letzten zur ersten Figur. `folgePruefen(items, {schleife:true})` nimmt ihn in die Fehlerliste auf. Der Folgen-Generator erzeugt nur schleifbare Folgen. Alle Vorgaben (Start, Ende, Höchststufe, Wiederholung, Grundhaltung, Schleife) gelten gemeinsam. Unmögliche Kombinationen liefern eine Fehlermeldung und keine Folge.

## Technikableitung

`technikVon(steps, sty)` arbeitet mit Regeln:
- Fußtechnik aus Richtung und Tanzstil
- Heben und Senken aus der Zählzeit (`RISE` in der Engine)
- CBM bei Vor- oder Rückschritten mit mindestens 30° Drehung in Standardtänzen
- CBMP bei gekreuzten und außenseitlichen Schritten
- Sway zur Innenseite der Drehung in Schwungtänzen

Die Ergebnisse sind Näherungen. Für Figuren mit Quelle stehen Fußarbeit und Sway beider Rollen in `TECHNIK_DATEN` (`figuren/belegt.js`) und ersetzen die abgeleiteten Werte.

## Prüfen und Dokumentation erzeugen

```
node tests/test.js     # Daten, Übergänge, Generator, Technik, Qualität
node tests/start.mjs   # Seite in Chromium ohne Fenster bedienen, Folgen abspielen, Takt und Schleife prüfen
node tests/doku.js     # Kataloge unter docs/ neu erzeugen
```

Vor jedem Hochladen die `?v=`-Nummer in `tanzsimulator.html` erhöhen.

## Offline-Speicher

`sw.js` speichert beim Installieren und bei jedem Laden der Seite mit Internet alle Dateien, die `tanzsimulator.html` einbindet (`dateienAus`), dazu Manifest und Icons. Ältere `?v=`-Fassungen werden aufgeräumt. Die Seite selbst wird immer zuerst frisch geholt.

## Import und geteilte Links

`importPruefen(daten)` in `js/figurdaten.js` übernimmt nur gültige eigene Figuren und Folgen:
- Schritte mit gültigem Fuß, gültiger Richtung, Dauer, Länge, Drehung und Haltung
- gleiche Länge von Herr und Dame
- Folgen nur mit bekannten Figuren

Vorgegebene Figuren können nicht überschrieben werden, und Werte werden begrenzt. Geteilte Links laufen durch dieselbe Prüfung.

## Abstandsausgleich

Steht die Dame am Anfang einer Figur mit eigenen Schritten mehr als 15 cm näher als in der Anfangshaltung üblich, gleicht sie den Abstand in der ersten Figurenhälfte aus (`simBlock` in `js/engine.js`). Mit `F.ganz` wird immer ausgeglichen, auch seitlich.

## Haltungen und Arme

Jede Haltung in `HOLDS` (`js/basis.js`) hat eine Geometrie in `holdGeo` (`js/engine.js`) und Handziele in `haltungsHaende` (`js/szene.js`). Für eine neue Haltung braucht man alle drei Einträge, dazu einen Führungshinweis in `HOLD_TIP`, eine Haltungsart in `HALT_ART` (`js/figurdaten.js`) und die gefassten Hände in `GEFASST`.

**Armführung innerhalb einer Haltung:** Ein Schritt kann das Feld `arm` tragen (`ARME` in `js/basis.js`): `aus` = Linie (freier Arm seitlich gestreckt), `zug` = die gefasste Hand holt die Dame heran, `stopp` = die gefasste Hand hält dagegen. `armFuehrung()` in `js/szene.js` verschiebt die Handziele über den Schritt (Ein- und Ausblenden). In der Haltung „Arm hoch“ steht die Hand über dem Kopf dessen, der sich gerade dreht, und kreist mit seiner Drehung. Beim Ein- und Auswickeln (Haltungswechsel in oder aus `WICKEL`: Körbchen, Hammerlock, Brezel, Schal, Schatten) führt `wickelWeg()` jedes weit wandernde Händepaar in einem Bogen über den Kopf dessen, um den gewickelt wird; andere Wechsel nehmen einen kleinen Bogen. Die Zuordnung zu Figuren steht in `figuren/arme.js`; im Schritt-Editor gibt es dafür die Auswahl „Armführung“.

## Raumlenkung und Abstandsausgleich bei eigenen Damenschritten

Lenkt die Engine das Paar vom Rand weg (Zusatzdrehung `extra` je Schritt des Herrn), tanzt eine Dame mit eigenen Schritten diese im Schatten ohne Lenkung; ihre Lage relativ zum Herrn wird dann mit seiner Zusatzdrehung mitgedreht (`mit()` in `simBlock`). Beginnt eine solche Figur in der Promenade, steht die Dame in der V-Stellung (Blick ¼ links vom Herrn), damit „vor und über Kreuz“ aus der Quelle richtig läuft. Der Anfangsausgleich verteilt den Gesamtversatz auf die ersten echten Schritte (mit `F.ganz` auf die ersten zwei); Platz-Schritte holen nur den Rückstand zum anderen Fuß auf (`shift.platz`, dabei keine Fußwarnung).

**Schrittrichtung der Dame (`dd`):** Bei gegengleich geführter Dame bestimmt sonst die Haltung ihre Schrittrichtung (gespiegelt, in Körbchen und Schatten gleich wie der Herr). Mit `dd` am Schritt des Herrn wird nur die Richtung der Dame festgelegt; ihr Platz folgt weiter der Haltung (Beispiel: Körbchen mit Drehung, Herr vor, Dame rück).

## An der Wand entlang (Tanzrichtung)

`WAND` in `js/engine.js` (`an`, `start`: `W`/`DW`/`LOD`, Gewichte `kv`, `kb`, `ko`). Für Tänze in `FORTSCHREITEND` startet das Paar mit `startWand(i)` an der langen Seite (weitere Paare an den Seiten C und B). In `simulate()` bewertet die Raumlenkung dann statt der Nähe zur Mitte das Vorankommen entlang `lodVon(p)` (Tanzrichtung der nächsten Wand), den Abstand zur Bahn `BAHN()` und den kleinsten Partnerabstand in der nächsten Figur. Die App schaltet das über `#wandOn`/`#wandStart` ein (gespeichert unter `tanzsim_wand`); die Node-Tests rechnen ohne, außer dem eigenen Test dafür.

## Offene Folgeaufgaben

- Figurgenaue Technikdaten: Belegt sind 72 Figuren (`TECHNIK_DATEN`), alle übrigen Technikangaben sind abgeleitet.
- 54 Figuren sind in `figuren/quellen.js` mit der Quelle abgeglichen (18 Latein, 36 Standard). Noch schematisch: 85 Figuren, darunter Windmill, Curly Whip, Chugging, Stalking Walks, Catapult (Jive), Plait, Rolling off the Arm, Three Step Turn, Contra Bota Fogos, Samba Locks, Criss Cross Voltas (Samba), Sixteen, Grand Circle, La Passe, Spanish Lines, Fregolina, Syncopated Separation (Paso), Sliding Doors, Three Alemanas, Continuous Hip Twist, Opening Out from Reverse Top (Rumba), Turkish Towel, Chase, Hip Twist Spiral (Cha-Cha). Gründe: Die Quelltabellen sind dort in sich widersprüchlich (Drehungen von Herr und Dame passen nicht zusammen, derselbe Fuß zweimal), oder die Figur beginnt in Promenade, Tandem oder Kontra-Stellung, die die Engine bei eigenen Damenschritten nicht als Anfangsstellung kennt.
- Engine: Beim Wechsel aus Seit- oder Hinterstellung (Spanish Lines, Catapult, La Passe) geht die gegengleiche Dame geradlinig statt im Bogen um den Herrn herum; diese Figuren bleiben deshalb schematisch.
- Weitere Figuren der Abgleichliste: siehe `docs/figurenluecken.md` (mit Gründen bei bewusst offen gelassenen Figuren).
