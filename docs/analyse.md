# Analyse der Figurenbibliothek

Diese Datei wird mit `node tests/doku.js` aus den Figurendaten erzeugt. Bitte nicht von Hand bearbeiten.

## Bestand

- **31 Tänze**, **552 Figuren**, **185 Beispiel- und Kursfolgen**
- Vollständige Zuordnung jeder Figur (Tanz, Startfuß, Endfuß, Haltung, Schwierigkeit): [figurenkatalog.md](figurenkatalog.md)

| Tanz | Figuren | Stufe festgelegt | Stufe geschätzt |
|---|---|---|---|
| Langsamer Walzer | 52 | 52 | 0 |
| Wiener Walzer | 12 | 8 | 4 |
| Tango | 35 | 35 | 0 |
| Slowfox | 34 | 29 | 5 |
| Quickstep | 29 | 27 | 2 |
| Cha-Cha-Cha | 36 | 36 | 0 |
| Rumba | 34 | 34 | 0 |
| Samba | 24 | 24 | 0 |
| Jive | 28 | 28 | 0 |
| Paso Doble | 24 | 19 | 5 |
| Foxtrott | 17 | 0 | 17 |
| Discofox | 35 | 35 | 0 |
| Blues | 10 | 0 | 10 |
| Rock'n'Roll | 7 | 0 | 7 |
| Polka | 9 | 0 | 9 |
| Salsa | 25 | 20 | 5 |
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

- Langsamer Walzer – Vorwärts-Wechsel mit links: http://dance.djurredeboer.nl/standard/waltz/closed_change_LF.html
- Langsamer Walzer – Vorwärts-Wechsel mit rechts: http://dance.djurredeboer.nl/standard/waltz/closed_change_RF.html
- Langsamer Walzer – Rechtsdrehung (6 Schritte): http://dance.djurredeboer.nl/standard/waltz/natural_turn.html
- Langsamer Walzer – Linksdrehung (6 Schritte): http://dance.djurredeboer.nl/standard/waltz/reverse_turn.html
- Langsamer Walzer – Rechtskreisel (Spin Turn): http://dance.djurredeboer.nl/standard/waltz/spin_turn.html
- Rumba – Fencing: http://dance.djurredeboer.nl/latin/rumba/fencing.html
- Slowfox – Basic Weave: http://dance.djurredeboer.nl/standard/foxtrot/basic_weave.html
- Quickstep – Natural Pivot Turn: http://dance.djurredeboer.nl/standard/quickstep/pivot_turn.html
- Quickstep – Reverse Pivot: http://dance.djurredeboer.nl/standard/quickstep/reverse_pivot.html
- Tango – Rock zurück (linker Fuß): http://dance.djurredeboer.nl/standard/tango/rock_LF.html
- Tango – Rock zurück (rechter Fuß, in CBMP): http://dance.djurredeboer.nl/standard/tango/rock_RF.html
- Cha-Cha-Cha – Closed Hip Twist (in den Fächer): http://dance.djurredeboer.nl/latin/cha_cha/closed_hip.html (Darstellung schematisch)
- Langsamer Walzer – Left Whisk: http://dance.djurredeboer.nl/standard/waltz/left_whisk.html (Darstellung schematisch)
- Langsamer Walzer – Open Impetus: http://dance.djurredeboer.nl/standard/waltz/open_impetus.html
- Langsamer Walzer – Closed Wing: http://dance.djurredeboer.nl/standard/waltz/closed_wing.html
- Langsamer Walzer – Turning Lock nach rechts: http://dance.djurredeboer.nl/standard/waltz/turning_lock_right.html
- Slowfox – Natural Telemark: http://dance.djurredeboer.nl/standard/foxtrot/natural_telemark.html
- Slowfox – Hover Cross: http://dance.djurredeboer.nl/standard/foxtrot/hover_cross.html
- Slowfox – Natural Zig-Zag aus der Promenade: http://dance.djurredeboer.nl/standard/foxtrot/zig_zag.html (Darstellung schematisch)
- Quickstep – Tipsy nach rechts: http://dance.djurredeboer.nl/standard/quickstep/tipsy_to_R.html
- Quickstep – Rumba Cross: http://dance.djurredeboer.nl/standard/quickstep/rumba_cross.html
- Tango – Promenade Link: http://dance.djurredeboer.nl/standard/tango/promenade_link.html
- Tango – The Chase: http://dance.djurredeboer.nl/standard/tango/chase.html
- Tango – Reverse Outside Swivel: http://dance.djurredeboer.nl/standard/tango/reverse_outside_swivel.html
- Cha-Cha-Cha – Reverse Top (aus dem Grundschritt): http://dance.djurredeboer.nl/latin/cha_cha/reverse_top.html (Darstellung schematisch)
- Cha-Cha-Cha – Curl (in den Fächer): http://dance.djurredeboer.nl/latin/cha_cha/curl.html (Darstellung schematisch)
- Rumba – Reverse Top (aus dem Grundschritt): http://dance.djurredeboer.nl/latin/rumba/reverse_top.html (Darstellung schematisch)
- Rumba – Curl (in den Fächer): http://dance.djurredeboer.nl/latin/rumba/curl.html (Darstellung schematisch)
- Rumba – Closed Hip Twist (in den Fächer): http://dance.djurredeboer.nl/latin/rumba/closed_hip.html (Darstellung schematisch)
- Cha-Cha-Cha – Rope Spinning: http://dance.djurredeboer.nl/latin/cha_cha/rope_spinning.html
- Rumba – Rope Spinning: http://dance.djurredeboer.nl/latin/rumba/rope_spinning.html
- Rumba – Three Threes (drei Damendrehungen): http://dance.djurredeboer.nl/latin/rumba/three_threes.html
- Samba – Corta Jaca: http://dance.djurredeboer.nl/latin/samba/corta_jaca.html
- Samba – Argentine Crosses: http://dance.djurredeboer.nl/latin/samba/argentine_crosses.html
- Samba – Maypole: http://dance.djurredeboer.nl/latin/samba/maypole.html
- Samba – Natural Roll (Rechtsrollen): http://dance.djurredeboer.nl/latin/samba/natural_roll.html
- Jive – Link (aus der offenen Haltung zurück in die geschlossene): http://dance.djurredeboer.nl/latin/jive/link.html
- Jive – Spanish Arms: http://dance.djurredeboer.nl/latin/jive/spanish_arms.html
- Jive – Rolling off the Arm: http://dance.djurredeboer.nl/latin/jive/rolling_off_arm.html
- Jive – Toe Heel Swivels: http://dance.djurredeboer.nl/latin/jive/toe_heel.html
- Jive – Simple Spin (Dame dreht ganz rechts): http://dance.djurredeboer.nl/latin/jive/simple_spin.html
- Jive – Miami Special: http://dance.djurredeboer.nl/latin/jive/miami_special.html
- Paso Doble – Separation: http://dance.djurredeboer.nl/latin/paso/separation.html
- Paso Doble – Twist Turn: http://dance.djurredeboer.nl/latin/paso/twist_turn.html
- Paso Doble – Coup de Pique: http://dance.djurredeboer.nl/latin/paso/coup_de_pique.html
- Paso Doble – Flamenco Taps: http://dance.djurredeboer.nl/latin/paso/flamenco_taps.html
- Langsamer Walzer – Fallaway Whisk: https://www.dancecentral.info/ballroom/international-style/waltz/fallaway-whisk (Darstellung schematisch)

## Unvollständige Figuren

- Figuren ohne Schritte, Startfuß oder Endfuß: **0** (wird von `node tests/test.js` geprüft)
- Figuren ohne festgelegte Kursstufe (Stufe wird geschätzt): **205** von 552

## Inkonsistente Figuren (Figuren-Qualitätsprüfung)

552 Figuren geprüft: **0 Fehler, 0 Warnungen**.

Keine Auffälligkeiten.
