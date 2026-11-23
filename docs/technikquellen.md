# Technikquellen für die Figuren des Paartanz-Simulators

Stand 23. November 2026 (Zahlen nach dem Quellenabgleich aktualisiert). Die [Figurenmatrix als CSV](technikquellen-figuren.csv) enthält alle **553 eingebauten Figuren aus 31 Tänzen** mit Figuren-ID, Quellenlink, Fundstelle und Belegstatus. Bei 302 Figuren gibt es eine Fundstelle auf Figurenebene, einen Lehrplaneintrag oder eine verwandte Variante. Für 251 Figuren fehlt ein solcher Einzelbeleg. Eine Fundstelle ist der Einstieg in den Abgleich von Zählung, Fußarbeit und Führung beider Rollen.

| Belegstatus in der CSV | Figuren | Aussage |
|---|---:|---|
| Quelle im Repo erfasst | 84 | Die Figur ist in [`figuren/belegt.js`](../figuren/belegt.js) oder [`figuren/quellen.js`](../figuren/quellen.js) mit Quelle verlinkt. Für 72 davon sind Fußarbeitswerte aus der Quelle hinterlegt. |
| Figurenindex mit Medien | 154 | DanceNote hat einen passenden Namenseintrag mit Medienhinweis. Die konkrete Variante und die verfügbaren Technikfelder sind je Figur zu prüfen. |
| Figurenindex mit Namenseintrag | 7 | Der Index nennt die Figur. Die Technik muss gesondert belegt werden. |
| Figurenreferenz | 12 | Die Fundstelle beschreibt oder demonstriert die benannte Figur. Der Vergleich mit den Simulatorschritten ist offen. |
| Figur im Lehrplan | 13 | Der Lehrplan nennt den Schritt oder die Figurenfamilie. |
| Variante oder Teilfigur | 32 | Der Link liefert Vergleichsmaterial für einen Teilablauf oder eine verwandte Ausführung. |
| Nur Tanzreferenz | 241 | Es gibt einen Ansatz für den Tanz, die einzelne Figur braucht einen eigenen Beleg. |
| Technikquelle offen | 10 | Für Marschfox liegt ein Kursbeleg zur Einordnung vor. Eine eigenständige Technikreferenz für die konkreten Schrittfolgen fehlt. |

## Offene Figuren

Der **Fallaway Whisk** ist inzwischen nach Dance Central umgesetzt (als schematisch gekennzeichnet, weil die Seite nur gekürzt vorlag). Der **Reverse Pivot** ist als Kombination mit den ersten drei Schritten der Linksdrehung umgesetzt (1 2 3 &). Offen bleiben Sweetheart und Follow My Leader. DanceNote lehnt automatische Abrufe ab (HTTP 403); die dortigen Einträge lassen sich nur im Browser prüfen.


| Tanz und Figur | Was sich belegen lässt | Was vor der Umsetzung geklärt werden muss |
|---|---|---|
| Langsamer Walzer · **Reverse Pivot** | Die NDCA gibt für diese Walzerfigur `&` an. Die Lehrbeschreibung erklärt einen Halbschlag, der vom Ende der vorhergehenden Figur abgeht. [NDCA, International Style Waltz](https://www.ndca.org/pdf/2025%20July%20-%205%20-%20NDCA%20APPROVED%20JULY%202025.pdf) · [BallroomDancers, Reverse Pivot für Slow Waltz](https://www.ballroomdancers.com/dances/info.asp?sid=143) | Wie der Simulator den Pivot als Anschluss an eine konkrete Vorgängerfigur samt Zählung `3&` abbildet. Der bereits vorhandene Quickstep-Pivot hat ein eigenes Timing. |
| Langsamer Walzer · **Fallaway Whisk** | ISTD führt ihn als zusätzliche Walzerfigur, die NDCA nennt `1–2–3`. Dance Central bietet einen Ablauf pro Rolle mit Fußarbeit, Ausrichtung und Anschlüssen. [ISTD, Additional Figures](https://www.istd.org/documents/modern-ballroom-syllabus-outline-september-2021/modern-ballroom-syllabus-september-21.pdf#page=41) · [NDCA, International Style Waltz](https://www.ndca.org/pdf/2025%20July%20-%205%20-%20NDCA%20APPROVED%20JULY%202025.pdf) · [Dance Central, Fallaway Whisk](https://www.dancecentral.info/ballroom/international-style/waltz/fallaway-whisk) | Die gewählte Variante anhand der Techniktafel prüfen, insbesondere den Drehverlauf der Folgenden, die Fallaway-Position und den Anschluss. |
| Cha-Cha-Cha · **Sweetheart** | DTV führt die Figur als WDSF Nr. 42 mit Laird-Zuordnung. Die NDCA dokumentiert sechs Takte sowie Start in offener Position und Ende im Fächer. [DTV, WDSF-Laird-Abgleich](https://www.tanzsport.de/de/service/downloads-und-formulare/sportwelt/lehre?cid=22636&file=files%2Ftanzsport%2Fdownloads%2Fsportwelt%2Flehre%2Flehre-ausbildung%2Fwr-tr-figurenkatalog-wdsf-istd.pdf) · [NDCA, Gold International Cha Cha](https://www.ndca.org/pdf/2025%20July%20-%205%20-%20NDCA%20APPROVED%20JULY%202025.pdf#page=38) | Belastung und freier Fuß der Folgenden in Schritt 26 und 27 gemäß einer gewählten Techniktafel klären. Ein Fußkontakt allein belegt keinen Gewichtswechsel. |
| Cha-Cha-Cha · **Follow My Leader** | DTV führt die Figur als WDSF Nr. 43 mit Laird-Zuordnung. Die NDCA dokumentiert sechs Takte, wechselnde Tandempositionen und das Ende offen. DanceNote listet Videos und weist aus, dass die Schritttafel noch fehlt. [DTV, WDSF-Laird-Abgleich](https://www.tanzsport.de/de/service/downloads-und-formulare/sportwelt/lehre?cid=22636&file=files%2Ftanzsport%2Fdownloads%2Fsportwelt%2Flehre%2Flehre-ausbildung%2Fwr-tr-figurenkatalog-wdsf-istd.pdf) · [NDCA, Gold International Cha Cha](https://www.ndca.org/pdf/2025%20July%20-%205%20-%20NDCA%20APPROVED%20JULY%202025.pdf#page=38) · [DanceNote, Follow My Leader](https://dancenote.net/mixfigure_one.php?figure_name=c_followMyLeader&lang=en) | Die widersprüchliche Belastungsfolge der Folgenden und den Zeitpunkt der Tandemwechsel mit einer Techniktafel und einer passenden Demonstration abgleichen. |

Für Sweetheart und Follow My Leader ist die [Laird-Technik ab Ausgabe 2022 beim IDTA-Verlag](https://shop.idta.co.uk/product/laird-technique-of-latin-dancing-new-2022-edition/) ein konkreter Bezugspunkt. Die Verlagsseite weist das Lehrbuch nach. Sie bietet keinen öffentlichen Zugriff auf die betroffenen Tafeln.

## Standard und Latein

Die zehn [WDSF-Technikbücher](https://www.worlddancesport.org/WDSF/Academy/Technique-Books) sind nach Tanz gegliedert und kostenpflichtig. Auf der Verlagsseite sind auch Korrekturen zu älteren Ausgaben aufgeführt. Die [ISTD-Prüfungsübersichten](https://www.istd.org/examinations/dancesport-syllabus-outlines/), der [IDTA-Lehrplan mit den Howard- und Laird-Referenzen](https://idta.co.uk/fellowship/) und der [NDCA-Figurenkatalog von Juli 2025](https://www.ndca.org/pdf/2025%20July%20-%205%20-%20NDCA%20APPROVED%20JULY%202025.pdf) ergänzen Namen, Zuordnungen und teils Zählung oder Haltung. Ausgaben und Verbandsvarianten bei der Übernahme mitführen.

| Tanz | Öffentlicher Figurenindex mit Fundstellennamen aus der CSV |
|---|---|
| Langsamer Walzer | [DanceNote](https://dancenote.net/mixfigures.php?dance=waltz&lang=en) |
| Wiener Walzer | [DanceNote](https://dancenote.net/mixfigures.php?dance=viennese&lang=en) |
| Tango | [DanceNote](https://dancenote.net/mixfigures.php?dance=tango&lang=en) |
| Slowfox | [DanceNote](https://dancenote.net/mixfigures.php?dance=foxtrot&lang=en) |
| Quickstep | [DanceNote](https://dancenote.net/mixfigures.php?dance=quickstep&lang=en) |
| Cha-Cha-Cha | [DanceNote](https://dancenote.net/mixfigures.php?dance=chacha&lang=en) |
| Rumba | [DanceNote](https://dancenote.net/mixfigures.php?dance=rumba&lang=en) |
| Samba | [DanceNote](https://dancenote.net/mixfigures.php?dance=samba&lang=en) |
| Jive | [DanceNote](https://dancenote.net/mixfigures.php?dance=jive&lang=en) |
| Paso Doble | [DanceNote](https://dancenote.net/mixfigures.php?dance=pasodoble&lang=en) |

## Gesellschafts- und weitere Tänze

| Tanz | Was die Quelle abdeckt |
|---|---|
| Foxtrott | Gesellschafts-Foxtrott mit Grundschritt beider Rollen. [Danceorama Bern](https://www.danceorama.ch/foxtrott.html) |
| Discofox | Vereinsbeschreibungen für Grundschritte, Figuren und Fassungen. Das Tanzsportabzeichen ergänzt Bewertungsmerkmale. [TSA Sauerland](https://www.tsasauerland.de/discofox-figuren/) · [DTV, DTSA Discofox](https://www.tanzsport.de/files/tanzsport/downloads/sportentwicklung/dtsa/dtsa_verleihungsbedingungen_anlage_discofox.pdf) |
| Blues | Gesellschafts-Blues, Grundschritt für beide Rollen und eine separate Lehrdemo mit Damendrehung. [Danceorama Bern](https://www.danceorama.ch/blues.html) · [DeinHochzeitstanz.com](https://www.deinhochzeitstanz.com/tanzschritte-blues/) |
| Rock’n’Roll | Turniertechnik und Grundschritt mit Kick-Ball-Change. Die Gesellschaftsversionen erfordern einen eigenen Vergleich. [WRRC, Scoring the Dance](https://www.wrrc.org/documents/rr/TR_0004_10_Scoring_the_dance.pdf) |
| Polka | Historische Rechtsdrehung mit Fußarbeit und Zählung sowie Hinweise zur Umkehrung. [Library of Dance](https://www.libraryofdance.org/dances/the-polka/) |
| Salsa | Casino- und Rueda-Videos für Enchufla, Dile que no, Setenta und weitere Figuren. Lineare Salsa hat eigene Referenzen, etwa für Cross Body Lead. [Rueda.Casino](https://rueda.casino/online-videos/videos-available/) · [X Dance, Cross Body Lead](https://xdance.tv/episodes/salsa-04-cbl/) |
| Bachata | Kursstufen zu Grundschritten, Drehungen, Fassungen und Sensual-Techniken. [TU Berlin Hochschulsport](https://www.tu-sport.de/fileadmin/content/01_sportprogramm/12_Tanz/Levelbeschreibungen_Bachata_engl.pdf) |
| Merengue | Stilreferenz und Lehrdemonstrationen zu Schritt- und Drehvarianten. [Library of Dance](https://www.libraryofdance.org/dances/merengue/dhs/) |
| Boogie-Woogie | Verbandsseminar zur Technik des Turnier-Boogie. [WRRC](https://wrrc.dance/boogie-woogie-dancers-seminar_2022/) |
| Tango Argentino | Salon-Syllabus mit Vorwärts- und Rückwärts-Ochos, Molinetes und Cunita in Kombination. [Canadian DanceSport Federation](https://www.canadiandancesportfederation.ca/sites/default/files/documents/argentine_tango_salon_syllabus_pdf.pdf) |
| West Coast Swing | Newcomer-Unterlagen mit Figuren, Schritttabellen und Videoreferenzen. [UCWDC](https://www.ucwdc.org/wp-content/uploads/2023/01/UCWDC-West-Coast-IV_III_II_Final.pdf) |
| Walzer-Musette | Französische Pivot-Technik mit Rechts- und Linksdrehung. Das WTP-Karree braucht einen eigenen Beleg. [Le Coin des Danseurs](https://coindesdanseurs.fr/musette/contenu-mu/valse-musette/) |
| Tangowalzer | Tango-Vals-Figurenliste als Vergleich zur WTP-Variante des Simulators. [Canadian DanceSport Federation](https://www.canadiandancesportfederation.ca/sites/default/files/documents/argentine_tango_vals_step_list_beginner_intermediate_pdf.pdf) |
| Disco-Samba | Unterrichtsvideo mit Grundschritt und Damendrehung ab 00:30. [Tanzschule Schwebach](https://www.youtube.com/watch?v=VyGVU89Uqb8&t=30s) |
| Two Step | Country Two-Step Newcomer mit Schritttabellen. Startfuß und Zählweise der Simulatorvariante vor Übernahme vergleichen. [UCWDC](https://ucwdc.org/wp-content/uploads/2023/02/UCWDC-Newcomer-IV_III_II-All-Dances-Final.pdf) |
| Bugg | Schwedisches Verbandsreglement mit Technikprinzipien für den Tanz. [Svenska Danssportförbundet](https://www.danssport.se/media/5tfdgmxw/reglemente-brr-2025-09-01rev.pdf) |
| Cumbia | Paarunterricht zu Grundschritt, Seitenschritt, Open Break und Drehvarianten. Die regionale Fassung ist Teil des Abgleichs. [Baila Facilito](https://bailafacilito.com/curso/cumbia/) |
| Tango Americano | American Smooth Tango mit Figuren, Zählung und Wettkampfregeln. [USA Dance, Appendix B](https://cdn.ymaws.com/usadance.org/resource/resmgr/dancesport/documents/rule_book/2026/appendix_b_syllabus_guideboo.pdf) |
| Nordic Tango | Finnischer Wanha Tango als Vergleichsvariante, mit Haltung, Schrittvarianten und Zählung. [Wanha Tango](https://wanhatango.fi/wanha-tango-kuviot/) |
| Mambo | Offizieller Figurenplan mit eigener Mambo-Sektion. [ISTD, Alternative Rhythms](https://www.istd.org/documents/alternative-rhythms-syllabus-outline-september-2024/alternative-rhythms-syllabus-september-2024.pdf) |
| Marschfox | Kursprogramme führen Marschfox gemeinsam mit Foxtrott und als eigene Unterrichtseinheit. Ein eigenständiger Schrittablauf bleibt offen. [Tanzschule Wiesrecker](https://ts-wiesrecker.de/new/index.php/welttanz-programm) · [Tanzschule Nuzinger](https://www.nuzinger.de/files/Tanzprogramm_ab_September_2020.pdf) |
