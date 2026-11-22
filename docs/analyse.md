# Analyse der Figurenbibliothek

Diese Datei wird mit `node tests/doku.js` aus den Figurendaten erzeugt. Bitte nicht von Hand bearbeiten.

## Bestand

- **31 Tänze**, **460 Figuren**, **124 Beispiel- und Kursfolgen**
- Vollständige Zuordnung jeder Figur (Tanz, Startfuß, Endfuß, Haltung, Schwierigkeit): [figurenkatalog.md](figurenkatalog.md)

| Tanz | Figuren | Stufe festgelegt | Stufe geschätzt |
|---|---|---|---|
| Langsamer Walzer | 43 | 43 | 0 |
| Wiener Walzer | 11 | 7 | 4 |
| Tango | 30 | 30 | 0 |
| Slowfox | 26 | 21 | 5 |
| Quickstep | 23 | 21 | 2 |
| Cha-Cha-Cha | 27 | 27 | 0 |
| Rumba | 23 | 23 | 0 |
| Samba | 14 | 14 | 0 |
| Jive | 17 | 17 | 0 |
| Paso Doble | 13 | 8 | 5 |
| Foxtrott | 17 | 0 | 17 |
| Discofox | 31 | 31 | 0 |
| Blues | 10 | 0 | 10 |
| Rock'n'Roll | 7 | 0 | 7 |
| Polka | 9 | 0 | 9 |
| Salsa | 18 | 13 | 5 |
| Bachata | 12 | 0 | 12 |
| Merengue | 12 | 0 | 12 |
| Boogie-Woogie | 10 | 0 | 10 |
| Tango Argentino | 12 | 0 | 12 |
| West Coast Swing | 7 | 0 | 7 |
| Walzer-Musette | 10 | 0 | 10 |
| Tangowalzer | 9 | 0 | 9 |
| Disco-Samba | 8 | 0 | 8 |
| Two Step | 9 | 0 | 9 |
| Bugg | 9 | 0 | 9 |
| Cumbia | 8 | 0 | 8 |
| Tango Americano | 8 | 0 | 8 |
| Nordic Tango | 9 | 0 | 9 |
| Mambo | 8 | 0 | 8 |
| Marschfox | 10 | 0 | 10 |

## Dubletten

### Gleicher Name im selben Tanz (0)

Keine.

### Gleiche Schritte im selben Tanz (6)

- Rumba: „Seit-Wiegeschritt (Cucaracha)“ (`b_r_cuca`) = „Seitschritte (Cucaracha-Schritt seitlich, links und rechts)“ (`b_r_seitl`) – als Alias gekennzeichnet: gleiche Schritte wie die Cucaracha
- Rumba: „Gehschritte vor und rück“ (`b_r_geh`) = „Vorwärts-Gehschritte“ (`b_r_vorgeh`) – als Alias gekennzeichnet: gleiche Schritte wie „Gehschritte vor und rück“
- Paso Doble: „Chassés nach rechts“ (`b_pd_chasse`) = „Seitschritte (Chassé nach rechts)“ (`b_pd_seit`) – als Alias gekennzeichnet: gleiche Schritte wie „Chassés nach rechts“
- Discofox: „Damensolo links (Drehung unter dem Arm)“ (`b_d_solol`) = „Damendrehung links (Unterarmdrehung)“ (`b_d_drehl2`) – als Alias gekennzeichnet: gleiche Schritte wie „Damensolo links“
- Blues: „Vor – Tap, Rück – Tap“ (`b_bl_vor`) = „Vorwärts und rückwärts (Schritt, Tap)“ (`b_bl_vorr`) – als Alias gekennzeichnet: gleiche Schritte wie „Vor – Tap, Rück – Tap“
- Bachata: „Grundschritt am Platz“ (`b_b_platz`) = „Wellenbewegung am Platz (Sensual)“ (`b_b_sensual`) – als Alias gekennzeichnet: die Füße tanzen den Grundschritt am Platz; die Wellenbewegung des Oberkörpers wird nicht dargestellt

Dubletten wurden nicht gelöscht, weil gespeicherte eigene Folgen auf diese Figuren verweisen können. Sie sind als Alias gekennzeichnet (`ALIAS` in `figuren/info.js`) und im Figurenkatalog so markiert.

### Zulässige Rhythmusvarianten

- Discofox – Seitschritte links und rechts: Seitschritte im Vierer-Rhythmus (seit, ran, seit, Tap) statt der Dreiergruppe „Schritt, Schritt, Tap“

### Figuren mit überprüfbarer Quelle

- Slowfox – Basic Weave: http://dance.djurredeboer.nl/standard/foxtrot/basic_weave.html
- Quickstep – Natural Pivot Turn: http://dance.djurredeboer.nl/standard/quickstep/pivot_turn.html
- Quickstep – Reverse Pivot: http://dance.djurredeboer.nl/standard/quickstep/reverse_pivot.html
- Tango – Rock zurück (linker Fuß): http://dance.djurredeboer.nl/standard/tango/rock_LF.html
- Tango – Rock zurück (rechter Fuß, in CBMP): http://dance.djurredeboer.nl/standard/tango/rock_RF.html
- Cha-Cha-Cha – Closed Hip Twist (in den Fächer): http://dance.djurredeboer.nl/latin/cha_cha/closed_hip.html (Darstellung schematisch)

## Unvollständige Figuren

- Figuren ohne Schritte, Startfuß oder Endfuß: **0** (wird von `node tests/test.js` geprüft)
- Figuren ohne festgelegte Kursstufe (Stufe wird geschätzt): **205** von 460

## Inkonsistente Figuren (Figuren-Qualitätsprüfung)

460 Figuren geprüft: **0 Fehler, 0 Warnungen**.

Keine Auffälligkeiten.
