# Analyse der Figurenbibliothek

Diese Datei wird mit `node tests/doku.js` aus den Figurendaten erzeugt. Bitte nicht von Hand bearbeiten.

## Bestand

- **31 Tänze**, **454 Figuren**, **118 Beispiel- und Kursfolgen**
- Vollständige Zuordnung jeder Figur (Tanz, Startfuß, Endfuß, Haltung, Schwierigkeit): [figurenkatalog.md](figurenkatalog.md)

| Tanz | Figuren | Stufe festgelegt | Stufe geschätzt |
|---|---|---|---|
| Langsamer Walzer | 43 | 43 | 0 |
| Wiener Walzer | 11 | 7 | 4 |
| Tango | 28 | 28 | 0 |
| Slowfox | 25 | 20 | 5 |
| Quickstep | 21 | 19 | 2 |
| Cha-Cha-Cha | 26 | 26 | 0 |
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

### Gleicher Name im selben Tanz (2)

- Jive: „Grundschritt in offener Haltung“ – `b_j_offen`, `b_j_offen2`
- Boogie-Woogie: „Grundschritt mit Rechtsdrehung“ – `b_bw_dreh`, `b_bw_rechts`

### Gleiche Schritte im selben Tanz (6)

- Rumba: „Seit-Wiegeschritt (Cucaracha)“ (`b_r_cuca`) = „Seitschritte (Cucaracha-Schritt seitlich, links und rechts)“ (`b_r_seitl`)
- Rumba: „Gehschritte vor und rück“ (`b_r_geh`) = „Vorwärts-Gehschritte“ (`b_r_vorgeh`)
- Paso Doble: „Chassés nach rechts“ (`b_pd_chasse`) = „Seitschritte (Chassé nach links)“ (`b_pd_seit`)
- Discofox: „Damensolo links (Drehung unter dem Arm)“ (`b_d_solol`) = „Damendrehung links (Unterarmdrehung)“ (`b_d_drehl2`)
- Blues: „Vor – Tap, Rück – Tap“ (`b_bl_vor`) = „Vorwärts und rückwärts (Schritt, Tap)“ (`b_bl_vorr`)
- Bachata: „Grundschritt am Platz“ (`b_b_platz`) = „Wellenbewegung am Platz (Sensual)“ (`b_b_sensual`)

Dubletten wurden nicht gelöscht, weil gespeicherte eigene Folgen auf diese Figuren verweisen können.

## Unvollständige Figuren

- Figuren ohne Schritte, Startfuß oder Endfuß: **0** (wird von `node tests/test.js` geprüft)
- Figuren ohne festgelegte Kursstufe (Stufe wird geschätzt): **205** von 454

## Inkonsistente Figuren (Figuren-Qualitätsprüfung)

454 Figuren geprüft: **0 Fehler, 13 Warnungen**.

- Discofox – Seitschritte links und rechts (`b_d_seit`): 8 Schläge passen nicht auf Dreiergruppen
- Tango Argentino – Cunita (Wiegeschritt mit Drehung) (`b_ta_cunita`): Mindestens ein Schritt hat keine Zählzeit
- Tango Argentino – Cambio de peso (Gewichtswechsel am Platz) (`b_ta_cambio`): Mindestens ein Schritt hat keine Zählzeit
- Tango Argentino – Seitschritt mit Pause (`b_ta_pausa`): Mindestens ein Schritt hat keine Zählzeit
- Disco-Samba – Grundschritt (vor und rück) (`b_ds_gs`): 4 Schläge passen nicht auf Dreiergruppen
- Disco-Samba – Grundschritt seitlich (`b_ds_seit`): 4 Schläge passen nicht auf Dreiergruppen
- Disco-Samba – Wischer (links und rechts) (`b_ds_wisch`): 4 Schläge passen nicht auf Dreiergruppen
- Disco-Samba – Grundschritt mit Linksdrehung (`b_ds_dreh`): 4 Schläge passen nicht auf Dreiergruppen
- Disco-Samba – Damendrehung rechts im Wischer (`b_ds_solo`): 4 Schläge passen nicht auf Dreiergruppen
- Quickstep – Tipple-Chassé rechts (`b_q_tipple`): 9 Schläge passen nicht auf halbe Takte
- Disco-Samba – Grundschritt am Platz (`b_ds_platz`): 4 Schläge passen nicht auf Dreiergruppen
- Disco-Samba – Fortschreitend vorwärts (`b_ds_vor`): 4 Schläge passen nicht auf Dreiergruppen
- Disco-Samba – Grundschritt in offener Haltung (`b_ds_offen`): 4 Schläge passen nicht auf Dreiergruppen
