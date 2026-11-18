# Entwicklerdokumentation

Der Simulator ist eine statische Webseite ohne Build-Schritt. Alle Skripte sind normale `<script>`-Dateien und teilen sich einen globalen Namensraum. Die Ladereihenfolge steht in `tanzsimulator.html`.

## Ladereihenfolge und Aufgaben

| Datei | Aufgabe | braucht Fenster |
|---|---|---|
| `js/basis.js` | Richtungen, Haltungen, `S()`, `tanz()`, `folge()` | nein |
| `figuren/*.js` | Figuren und Folgen | nein |
| `figuren/info.js` | Kursstufe, Typ, Beschreibung je Figur (`INFO`) | nein |
| `figuren/syllabus.js` | Abgleichliste je Tanz und Stufe (`SYLLABUS`) | nein |
| `js/speicher.js` | eigene Figuren und Folgen im Browser | nein (`localStorage`) |
| `js/engine.js` | Schrittsimulation von Herr und Dame, Raumlenkung | nein |
| `js/figurdaten.js` | `figMeta`, `uebergang`, `folgePruefen`, `folgeErzeugen`, `folgeFuerStufe` | nein |
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

## Regeln der Übergangsprüfung

`uebergang(A,B)` verlangt denselben Tanz, den freien Fuß für Herr und Dame und eine passende Haltung. Haltungswechsel sind erlaubt und werden als Hinweis gemeldet. Fächer-Haltungen müssen exakt anschließen.

## Technikableitung

`technikVon(steps, sty)` arbeitet mit Regeln:
- Fußtechnik aus Richtung und Tanzstil
- Heben und Senken aus der Zählzeit (`RISE` in der Engine)
- CBM bei Vor- oder Rückschritten mit mindestens 30° Drehung in Standardtänzen
- CBMP bei gekreuzten und außenseitlichen Schritten
- Sway zur Innenseite der Drehung in Schwungtänzen

Die Ergebnisse sind Näherungen. Für einzelne Figuren genauere Werte einzutragen, wäre der nächste Ausbauschritt.

## Prüfen und Dokumentation erzeugen

```
node tests/test.js     # Daten, Übergänge, Generator, Technik, Qualität
node tests/start.mjs   # Seite in Chromium ohne Fenster bedienen
node tests/doku.js     # Kataloge unter docs/ neu erzeugen
```

Vor jedem Hochladen die `?v=`-Nummer in `tanzsimulator.html` erhöhen.
