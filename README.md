# 💃 Paartanz-Simulator

Ein 3D-Simulator im Browser zum Lernen und Üben von Paartänzen. Herr und Dame tanzen Figuren und ganze Tanzfolgen vor – mit Fußspur, Schrittdiagramm, Metronom und auf Wunsch zur eigenen Musik.

**▶ Direkt ausprobieren:** https://dflow81.github.io/Paartanz-Simulator/

## Was er kann

- **31 Tänze, 551 Figuren und 185 Beispiel- und Kursfolgen:** Langsamer Walzer, Wiener Walzer, Tango, Slowfox, Quickstep, Foxtrott, Discofox, Blues, Rock'n'Roll, Polka, Cha-Cha-Cha, Rumba, Samba, Jive, Paso Doble, Salsa, Bachata, Merengue, Boogie-Woogie, Tango Argentino, West Coast Swing Dazu die übrigen Tänze des Welttanzprogramms: Walzer-Musette, Tangowalzer, Disco-Samba, Two Step, Bugg, Cumbia, Tango Americano, Nordic Tango, Mambo und Marschfox.
- **Fertige Tanzfolgen** für jeden Tanz, dazu eigene Folgen und eigene Figuren im Editor
- **Kursstufen** (Einsteiger/WTP 1, Bronze, Silber, Gold, Goldstar, Turnier, Freies Tanzen) und **Filter** nach Stufe, Figurentyp und Haltung – orientiert an üblichen Tanzschulkursen, keine offizielle Zuordnung
- **Karte „Zur Figur“:** Stufe, Schwierigkeit, Zählzeiten, Start- und Endfuß, Haltung, Beschreibung und passende Anschlussfiguren
- **Folgen-Generator:** erstellt gültige Folgen nach Tanz, Kursstufe, Länge, Start- und Endfigur, auf Wunsch mit Rückkehr in die Grundhaltung – nur mit Übergängen, bei denen Fuß und Haltung passen
- **Technikdaten je Schritt** (einblendbar, für jede Figur und beide Rollen): Belastungsfuß, freier Fuß, Fußtechnik mit Ferse/Spitze/Ballen/ganzer Fuß, Heben (Rise), Senken (Fall), CBM, CBMP, Ausrichtung (Alignment), Sway – bei 22 Figuren laut Quelle, sonst aus den Schritten abgeleitet. Vollständig zum Nachlesen im [Technikkatalog](docs/technikkatalog.md)
- **Tanzlehrer-Ansicht:** Beschreibung, Technik, typische Fehler, Hinweise für Herren und Damen, Unterrichtsmodus
- **Profi-Lernmodus:** Stopp nach jedem Schritt, belasteter Fuß und nächster Schritt am Boden markiert, Zählzeit wird angesagt
- **Turniermodus:** Tanzrichtung, Ausrichtung, Ecken und Raumaufteilung auf der Fläche
- **Figuren-Qualitätsprüfung:** meldet Fehler bei Startfuß, Endfuß, Gewichtswechsel, Takt und Anschlüssen – für alle Figuren auf Knopfdruck und für die gerade bearbeitete Figur direkt im Editor
- **Realistische Bewegung:** Gewichtsverlagerung, Fußabrollen, Heben und Senken im Walzer, Hüftbewegung in Latein, Federn im Jive
- **Tanzhaltungen:** geschlossen, Promenade, offen, eine Hand, Arm hoch, Kreuzhand, Körbchen, Schattenposition, Fächer
- **Die Dame tanzt eigene Schritte** bei Solodrehungen, Platzwechseln, New Yorker usw. – sonst gegengleich
- **Zum Üben:** Schritt vor und zurück, eine Figur in Schleife, Tempo von 20 bis 150 %, Klick in den Ablauf zum Springen
- **Ansichten:** Übersicht, von oben, hinter dem Herrn oder der Dame; Fußspur oder nummeriertes Schrittdiagramm
- **Nur Herr oder nur Dame zeigen** (der Partner wird durchsichtig) und **Spiegelbild-Ansicht** zum Mittanzen vor dem Bildschirm
- **Ton:** Metronom mit betonter „1“, Ansage der nächsten Figur, eigene Musikdatei – Tempo und Takt werden automatisch erkannt, das Paar tanzt zur Musik
- **Tanzfläche** in drei Größen – das Paar tanzt automatisch in Kurven und bleibt im Raum
- **Grafischer Figuren-Editor:** Schritte im Schrittplan von oben mit der Maus setzen und ziehen
- **Führungshinweise** beim Tanzen („Herr hebt die linke Hand – die Dame dreht darunter"), auch eigene je Schritt
- **Tempo-Trainer:** eine Figur in Schleife, jede Runde etwas schneller
- **Teilen per Link:** Eine Tanzfolge steckt in der Adresse – der Tanzpartner öffnet sie einfach im Browser
- **Export und Import** eigener Figuren und Folgen als Datei
- **Übungsmusik:** ein einfacher Rhythmus passend zum Tanz, ganz ohne eigene Musikdatei; bei eigener Musik schlägt der Simulator Tänze vor, die zum Tempo passen
- **Spotify / Apple Music:** über den Kopfhörer-Knopf unten rechts lässt sich ein Player einblenden. Mit Spotify Premium und einer eigenen (kostenlosen) Spotify-App: anmelden, Lieder und Playlists suchen und direkt abspielen. Ohne das: Link einfügen. Das Tanztempo wird durch Mittippen an die Musik angepasst
- **Einzählen und Mitzählen:** „fünf, sechs, sieben, acht" vor dem Start, auf Wunsch werden die Zählzeiten mitgesprochen
- **Schritte erklärt:** zu jeder Figur die Schritte von Herr und Dame als Liste, auch zum Vorlesen
- **Zeitlupe für einzelne Figuren** der Folge (🐢 im Ablauf)
- **Schrittplan zum Ausdrucken:** jede Figur von oben mit nummerierten Füßen und Schrittliste
- **Aussehen:** Farbe von Anzug und Kleid, drei Räume (heller Übungsraum, Tanzschul-Saal mit Holzboden und Leuchtröhren, Ballsaal mit Scheinwerfer, Kronleuchter und Spiegelwand), bis zu drei Paare auf der Fläche

## Bedienung

1. Oben unter **Tanz** den Tanz wählen – alle Listen zeigen dann nur noch diesen Tanz.
2. Im Tab **Abspielen** eine Tanzfolge oder einzelne Figur wählen. Mit **Filter** lassen sich die Figuren auf eine Kursstufe, einen Figurentyp oder eine Haltung begrenzen. 🎲 erstellt eine passende Folge, die Einstellungen dazu stehen im Tab **Tanzfolgen** unter „Folge automatisch erstellen“.
3. Mit der Maus drehen und zoomen. Ton (Metronom, Ansage, Musik) startet nach dem ersten Klick auf die Seite.

**Eigene Figuren** legst du im Tab **Figuren** Schritt für Schritt an: Fuß, Richtung, Schrittlänge, Drehung, Dauer in Schlägen, Zählung und Haltung. Vorgegebene Figuren lassen sich als Kopie bearbeiten. **Eigene Tanzfolgen** baust du im Tab **Tanzfolgen** – ⚠ zeigt an, wo eine Figur mit dem falschen Fuß beginnt.

Eigene Figuren und Folgen werden im Browser gespeichert (nicht auf GitHub). Mit **Exportieren** sicherst du sie als Datei. Beim **Importieren** und beim Öffnen eines **geteilten Links** wird alles geprüft: Nur gültige Figuren und Folgen werden übernommen, Probleme werden angezeigt.

**Als App installiert** (auf GitHub Pages über „Installieren“ im Browser) speichert der Simulator beim ersten Start alle Dateien und läuft danach vollständig ohne Internet.

## Lokal starten

Repository herunterladen und `tanzsimulator.html` (oder `index.html`) im Browser öffnen. Es wird kein Server und kein Internet benötigt.

## Aufbau

| Datei / Ordner | Inhalt |
|---|---|
| `tanzsimulator.html`, `tanzsimulator.css` | Menü und Aussehen |
| `js/basis.js` | Schrittrichtungen, Haltungen, Hilfsfunktionen für die Figuren |
| `figuren/*.js` | die Figuren je Tanzgruppe und die Beispielfolgen |
| `figuren/info.js` | Kursstufe, Figurentyp und Beschreibung je Figur |
| `js/engine.js` | Schritt-Engine: Fußpositionen, Gewicht, Drehungen, Raumbegrenzung |
| `js/figurdaten.js` | Figuren-Metadaten, Übergangsprüfung und Folgen-Generator |
| `figuren/syllabus.js` | Abgleichliste der Figuren je Stufe |
| `figuren/lehrplan.js`, `figuren/quellen.js`, `figuren/arme.js` | Lehrplan-Ergänzung (73 Figuren), davon 18 mit Quelle abgeglichen, und Armführung je Schritt |
| `figuren/belegt.js` | Figuren mit überprüfbarer Quelle (Schrittdiagramme) und ihre Fußarbeit |
| `js/technik.js`, `js/profi.js` | Technikdaten, Tanzlehrer, Profi-Lernmodus, Turniermodus, Qualitätsprüfung |
| `tests/` | Tests (`node tests/test.js`, `node tests/start.mjs`) und Erzeugung der Kataloge (`node tests/doku.js`) |
| `docs/` | [Figurenkatalog](docs/figurenkatalog.md), [Tanzkatalog](docs/tanzkatalog.md), [Technikkatalog](docs/technikkatalog.md), [Analyse](docs/analyse.md), [Figurenlücken](docs/figurenluecken.md), [Entwicklerdokumentation](docs/entwickler.md) |
| `CHANGELOG.md` | Änderungsprotokoll |
| `js/szene.js` | 3D-Szene, Tänzer, Arme und Haltungen, Schrittdiagramm |
| `js/app.js` | Wiedergabe, Editoren, Musik und Ansagen |
| `js/editor.js` | grafischer Figuren-Editor (Schrittplan) |
| `lib/` | three.js r160 (MIT-Lizenz) für die 3D-Darstellung, als normale Skripte verpackt |

## Figuren-Daten, Übergänge und Folgen-Generator

**Was eine Figur weiß.** Eine Figur besteht nur aus ihren Schritten. Alles andere berechnet `figMeta()` in `js/figurdaten.js` daraus: Start- und Endfuß von Herr und Dame, Haltung am Anfang und Ende, Drehung, Schläge, Takte, Rhythmus und Schwierigkeitsgrad (1–5). So können diese Angaben nie von den Schritten abweichen. Was sich nicht berechnen lässt (Kursstufe, Figurentyp, Beschreibung), steht in `figuren/info.js`. Fehlt dort ein Eintrag, wird die Stufe geschätzt und in der App als „geschätzt“ angezeigt.

**Übergangsprüfung** (`uebergang()`). Figur B darf auf Figur A folgen, wenn
- beide zum selben Tanz gehören,
- Herr und Dame B mit dem Fuß beginnen, der am Ende von A frei ist (Ausnahme: B beginnt mit einer Gewichtsverlagerung am Platz),
- die Haltung gleich ist oder ein üblicher Haltungswechsel vorliegt (z. B. geschlossen → Promenade, eine Hand → geschlossen). Ein Haltungswechsel wird als Hinweis gemeldet.
- In den Fächer und aus dem Fächer geht es nur mit Figuren, die dort enden bzw. beginnen.

Die Richtung im Raum ist kein Hindernis: Alle Figuren sind relativ zur Blickrichtung beschrieben, und die Engine lenkt das Paar so, dass es auf der Fläche bleibt. `folgePruefen()` tanzt eine ganze Folge zusätzlich durch. Dabei werden Fußfehler und das Verlassen der Tanzfläche erkannt.

**Folgen-Generator** (`folgeErzeugen()`). Er reiht nur zulässige Übergänge aneinander und bevorzugt Anschlüsse in derselben Haltung. Zwei Grundschritt-Varianten hintereinander und häufig benutzte Figuren werden seltener gewählt. Wenn nötig, geht er Schritte zurück, damit Start- und Endfigur und am Ende die Grundhaltung erreicht werden (höchstens drei Figuren mehr als gewünscht). Danach prüft `folgePruefen()` die ganze Folge. Fehler, Warnungen (z. B. Figur über der gewählten Stufe, Rand der Tanzfläche) und Hinweise (Haltungswechsel) werden angezeigt. Automatisch erstellte Folgen stehen nach dem Speichern in einer eigenen Gruppe.

**Tests.** `node tests/test.js` prüft alle Figuren: gültige Schritte, Start- und Endfuß, Stufen und Fußfehler. Außerdem prüft es gültige und ungültige Übergänge, alle Beispiel- und Kursfolgen und den Generator (nur ein Tanz, Stufe, Grundhaltung, Start- und Endfigur, keine Fußfehler). Dazu kommt, dass alle Skripte der Seite vorhanden und fehlerfrei übersetzbar sind; einen eigenen Build-Schritt gibt es nicht. `node tests/start.mjs` öffnet die Seite in Chromium ohne Fenster und probiert Filter, Figurenkarte und Generator aus.

### Neue Figuren hinzufügen

1. Die Figur in eine Datei unter `figuren/` schreiben:

```js
tanz('Foxtrott',120,{
  b_f_beispiel:['Meine Figur',[S('L','vor',40,2,'S'),S('R','vor',40,2,'S'),S('L','seit',25,1,'Q'),S('R','schliessen',0,1,'Q')]],
});
```

   `S(Fuß, Richtung, cm, Schläge, Zählung, Drehung°, Haltung)`: Drehung positiv = links, negativ = rechts. Ein dritter Eintrag mit Schritten für die Dame macht ihre Schritte unabhängig (Solodrehungen, Platzwechsel). Ohne ihn tanzt sie gegengleich.
2. In `figuren/info.js` Kursstufe, Typ und Beschreibung eintragen, z. B. `set({f_beispiel:2},{f_beispiel:'Kurze Beschreibung'})`.
3. `node tests/test.js` ausführen. Die Tests melden falsche Füße, fehlende Angaben und ungültige Folgen.
4. `node tests/doku.js` ausführen. Das aktualisiert die Kataloge unter `docs/`.
5. Die `?v=`-Nummer in `tanzsimulator.html` hochsetzen, damit Browser die neue Version laden.

## Hinweis

Die Figuren sind vereinfachte Tanzschul-Versionen und können von dem abweichen, was in deiner Tanzschule unterrichtet wird. Korrekturen und Ergänzungen sind willkommen.

**Kursstufen, Kursfolgen und die Abgleichliste** orientieren sich am Aufbau üblicher Tanzschulkurse und an allgemein bekannten Figurennamen. Sie sind keine offiziellen Lehrpläne von ADTV, DTV, ISTD oder WDSF. Die Aufbaufiguren sind schematisch beschrieben, die Technikdaten aus den Schritten abgeleitet; beides ersetzt kein Technikbuch und keinen Tanzlehrer. Figuren ohne Eintrag bekommen eine aus dem Schwierigkeitsgrad geschätzte Stufe.

**Bekannte Einschränkungen**
- Arme und Hände folgen der Haltung. Für Tunnel, Hammerlock, Schal, Brezel und Schulterfassung gibt es eigene Haltungen mit passender Handführung. Innerhalb einer Haltung gibt es Armaktionen (Linie, Zug, Stopp), und bei Drehungen unter dem Arm kreist die Hand über dem Kopf; das Ein- und Auswickeln selbst wird weich überblendet, aber nicht einzeln choreografiert. He Goes – She Goes ist weiterhin als „vereinfacht“ markiert.
- Noch fehlende Figuren stehen priorisiert in [docs/figurenluecken.md](docs/figurenluecken.md). Die Tango-„Kehre“ fehlt, weil der Begriff nicht eindeutig ist. „Wrap“ entspricht im Discofox dem Körbchen.
- Figuren mit eigenen Schritten der Dame setzen einen üblichen Anfangsabstand voraus. Bei Unterarmdrehungen und Körbchen-Figuren kommen sich die Partner teils sehr nah (unter 25 cm Körpermitte zu Körpermitte).
- Wechselfiguren (z. B. Vorwärts-Wechsel) beginnen und enden auf demselben Fuß. Allein in Schleife abgespielt, zeigen sie deshalb ⚠.
