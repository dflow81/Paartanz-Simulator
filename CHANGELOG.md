# Änderungsprotokoll

## 2026-11-24: An der Wand entlang in Tanzrichtung

- Neue Einstellung unter „Raum und Kleidung“: **An der Wand entlang in Tanzrichtung** (Standard: an). In den fortschreitenden Tänzen (Langsamer und Wiener Walzer, Tango, Slowfox, Quickstep, Foxtrott, Marschfox, Tango Americano, Nordic Tango, Tangowalzer, Walzer-Musette, Polka, Two Step, Tango Argentino) beginnt das Paar an der langen Seite der Fläche und tanzt gegen den Uhrzeigersinn an der Wand entlang, an den Ecken links herum.
- **Start des Herrn** wählbar: mit Blick zur Wand (Standard), diagonal zur Wand oder in Tanzrichtung. Weitere Paare beginnen an den anderen Seiten.
- Engine: Die Raumlenkung bewertet dann Vorankommen in Tanzrichtung, eine Bahn etwa 1,7 m von der Wand und den Partnerabstand in der nächsten Figur (unter 20 cm wird gemieden).
- Ergebnis: 77 von 85 Folgen dieser Tänze laufen in Tanzrichtung um die Fläche, keine kommt der Wand näher als 60 cm oder den Partnern näher als 20 cm. Zwei Folgen laufen noch falsch herum (Tango – Beispielfolge 4, Übungsfolge Langsamer Walzer 3), sechs bewegen sich kaum (am Platz getanzte Figuren).

## 2026-11-24: Discofox Push & Pull, Körbchen mit Drehung

- Engine: Neues Schrittfeld `dd` legt die Schrittrichtung der Dame fest, ohne ihren Platz in der Haltung zu ändern (Import und geteilte Links übernehmen es).
- Neue Figur **Körbchen mit Drehung**: eindrehen, im Körbchen gemeinsam eine ganze Drehung rechts herum – der Herr geht vorwärts, die Dame rückwärts, das Paar dreht um seine Mitte –, ausdrehen. Nur diese drei Teile, ohne zusätzliche Grundschritte (12 Zählzeiten). Dazu **Körbchen mit zwei Drehungen** (18 Zählzeiten, Stufe Silber). Schematisch, Stufe Bronze, mit Beispielfolge.
- Neue Figuren **Push & Pull mit einer Hand** (Hand L–R) und **mit beiden Händen** (offene Haltung): auf 1-2-3 schiebt der Herr die Dame weg, auf 4-5-6 zieht er sie heran; mit Armführung Stopp und Zug. Schematisch, Stufe Bronze. Dazu die Beispielfolge „Discofox – Push & Pull mit einer und beiden Händen“.

## 2026-11-24: Standardfiguren mit Quelle, Reverse Pivot

**Neu**
- 36 Standardfiguren nach den Schritttabellen von BallroomGuide neu aufgebaut, nicht mehr schematisch, mit Fußarbeit: Langsamer Walzer (Open Telemark, Wing, Contra Check, Hover Corté, Double Reverse Spin, Outside Spin, Turning Lock, Drag Hesitation, Back Whisk, Reverse Corté, Weave aus der Promenade, Progressives Chassé nach rechts, Cross Hesitation, Fallaway Reverse and Slip Pivot), Quickstep (Fishtail, V6, Running Right Turn, Running Finish, Cross Swivel, Quick Open Reverse, Hover Corté), Slowfox (Open Impetus, Hover Feather, Natural Weave, Weave aus der Promenade, Open Telemark, Fallaway Reverse and Slip Pivot, Bounce Fallaway), Tango (Open Reverse Turn, Back Open Promenade, Outside Swivel, Natural Twist Turn, Natural Promenade Turn, Contra Check, Fallaway Four Step), Wiener Walzer (Reverse Fleckerl).
- Langsamer Walzer **Reverse Pivot** als Kombination mit den ersten drei Schritten der Linksdrehung (1 2 3 &). Offen bleiben nur Sweetheart und Follow My Leader.
- Engine: Figuren mit eigenen Damenschritten, die in der Promenade beginnen, stellen die Dame in die V-Stellung.
- 84 Figuren mit Quelle, 72 mit belegter Fußarbeit; 85 noch schematisch.

**Geändert**
- Quickstep-Kursfolgen Bronze, Silber, Gold und 14 Übungsfolgen neu zusammengestellt, weil sich Start- und Endfuß einiger Figuren nach der Quelle geändert haben; fünf neue Übungsfolgen.
- Pivots (halbe Drehung auf einem Schlag) in zwei Vierteln, damit das Paar um seine Mitte dreht; Quickstep Reverse Pivot rück außenseitlich (CBMP).
- Spanish Drag (Tango) endet geschlossen.

**Nicht übernommen**
- Six Quick Run, Tipsy nach links, Top Spin, Slowfox Natural Twist Turn (Quelldaten widersprüchlich), Tango Oversway (mit der Fersendrehung der Dame zu eng), Paso Spanish Lines (Dame müsste danach im Bogen um den Herrn gehen).

## 2026-11-23 (Nacht): Abstände, Quellenabgleich, Übungsfolgen, Arme

**Behoben**
- Engine: Bei der Raumlenkung drehte eine Dame mit eigenen Schritten um ihren eigenen Fuß statt mit dem Paar und driftete seitlich weg (z. B. Spanish Lines nach Grand Circle: 8 cm). Jetzt wird ihre Lage mit der Drehung des Herrn mitgeführt.
- Engine: Der Anfangsausgleich ging bei Platz-Schritten verloren (z. B. Stop and Go nach dem Grundschritt: 8 cm, jetzt 31 cm); er greift schon ab 6 cm Abweichung.
- Alle 551 Figuren mit je drei Anschlüssen geprüft: 11 zu nahe Paare behoben (Promenade mit Damendrehung, Lasso, Turkish Towel, Alemana, Sixteen, Fregolina u. a.). Gemessen am Körperschwerpunkt bleibt die Dame überall unter 3,6 m/s.
- Generator: Eine Startfigur, zu der keine Figur hinführt, blockierte die Schleifensuche (Samba).
- Rope Spinning: Die Dame lief durch den Herrn; jetzt steht er im Mittelpunkt ihres Bogens.

**Neu**
- 18 Lehrplanfiguren nach den Schritttabellen von BallroomGuide neu aufgebaut, nicht mehr schematisch, mit Fußarbeit: Jive Toe Heel Swivels, Link, Simple Spin, Miami Special, Rolling off the Arm, Spanish Arms; Samba Corta Jaca, Argentine Crosses, Maypole, Natural Roll; Paso Doble Separation, Twist Turn, Coup de Pique, Flamenco Taps; Rumba Three Threes, Rope Spinning, Fencing; Cha-Cha Rope Spinning (`figuren/quellen.js`). 35 Figuren haben jetzt belegte Fußarbeit (vorher 22).
- Paso Doble Twist Turn in der Kursfolge Silber; Rumba Gold beginnt Fencing nach der Quelle aus dem Fächer.
- Einsteigerfolgen für Samba, Paso Doble und Salsa; 42 Übungsfolgen, damit fast jede Figur in einer festen Folge vorkommt (185 Folgen).
- Armaktionen für Dile que no, Sácala, Exhíbela, American Spin, Rolling off the Arm, Miami Special, Flamenco Taps, Three Threes; Browsertest misst, ob Arme durch den Partner gehen.

- Langsamer Walzer **Fallaway Whisk** (Gold) nach Dance Central ergänzt, als schematisch gekennzeichnet, weil die Quellseite nur gekürzt vorlag.

**Offen**
- Drei Figuren der Abgleichliste bleiben offen: Reverse Pivot (Walzer), Sweetheart und Follow My Leader (Cha-Cha); für die beiden Cha-Cha-Figuren gibt es keine frei zugängliche Schritttafel (Laird-Technik nur als Buch).

## 2026-11-23 (Abend): Kurslücken geschlossen, Einwickeln

**Neu**
- Zehn feste Kursfolgen: Gold für Jive, Quickstep, Slowfox und Salsa (kubanischer Stil), Silber für Samba, Bronze/Silber/Gold für Paso Doble, Bronze/Silber für Wiener Walzer. Alle schleifbar, innerhalb ihrer Stufe und mit mindestens 18 cm Abstand beim Wiederholen.
- Ein- und Auswickeln als Armbewegung: Beim Wechsel in oder aus Körbchen, Hammerlock, Brezel, Schal und Schatten führt das gefasste Händepaar über den Kopf dessen, um den gewickelt wird (`wickelWeg()` in `js/szene.js`).

**Behoben**
- Double Reverse Spin (Langsamer Walzer): Drehung anders verteilt (75°/105°/30° statt 75°/75°/60°), zweimal hintereinander kommen sich die Partner nicht mehr näher als 24 cm (vorher 15 cm).

**Bekannt**
- Paso Doble Twist Turn kommt der Dame nach manchen Figuren zu nahe; er ist deshalb in keiner Kursfolge.

## 2026-11-23: Lehrplan vollständig, Armführung

**Neu**
- 73 Figuren der Abgleichliste ergänzt (`figuren/lehrplan.js`), damit sind alle Figuren umgesetzt außer vier bewusst offenen (mit Grund im Lückenbericht). Alle sind schematisch (Kennzeichen „s“):
  - Langsamer Walzer: Fallaway Reverse and Slip Pivot, Hinge Line, Curved Feather, Natural Fallaway; Wiener Walzer: Reverse Fleckerl
  - Slowfox: Fallaway Reverse and Slip Pivot, Extended Reverse Wave, Curved Three Step, Oversway, Hover Corté
  - Quickstep: Tipsy nach links, Fallaway Natural Turn, Scatter Chassés, Oversway; Tango: Same Foot Lunge, Throwaway Oversway
  - Cha-Cha-Cha und Rumba: Rope Spinning, Sliding Doors, Advanced Hip Twist, Hip Twist Spiral, Three Threes; nur Cha-Cha: Turkish Towel, Chase; nur Rumba: Opening Out from Reverse Top, Three Alemanas, Continuous Hip Twist
  - Samba (10), Jive (11), Paso Doble (11), Salsa (7), Discofox: Lasso, Seilwurf, Sliding Doors
- Armführung innerhalb einer Haltung: Linie (freier Arm gestreckt), Zug (Hand holt heran), Stopp (Hand hält dagegen) je Schritt; bei Drehungen unter dem Arm kreist die Hand über dem Kopf dessen, der dreht. Zugeordnet u. a. für New Yorker, Hand to Hand, Fencing, Hockeystick, Alemana, Hip Twists, Cross Body Lead, Enchufla, Stop and Go, Spanish Lines.
- Schritt-Editor: Auswahl „Armführung“; die Technik-Tabelle zeigt die Armaktion. Import und geteilte Links übernehmen sie.
- Tests: jede neue Figur ohne Zusammenstoß (mindestens 20 cm), Abgleichliste vollständig, Armführung, Abspielen mit Armführung im Browser.


## 2026-11-22 (Abend): Technik je Schritt vollständig, Prüfung im Editor

- Technikdaten: Heben (Rise) und Senken (Fall) getrennt, Ferse/Spitze/Ballen/ganzer Fuß einzeln. Die Regel für Heben und Senken folgt jetzt dem Höhenverlauf (Walzer: Heben am Ende von 1, weiter auf 2, Senken am Ende von 3; Slow-Quick-Tänze: S hebt am Ende, Q oben, letztes Q senkt).
- `technikFigur()`: vollständige Technik jeder Figur für Herr und Dame, mit Ausrichtung bei festem Anfang (lange Seite, Blick in Tanzrichtung).
- Technikkatalog je Tanz unter `docs/technik/`: jeder Schritt jeder Figur mit allen Feldern.
- Figuren-Editor: Die bearbeitete Figur wird sofort geprüft (Startfuß, Endfuß, Gewichtswechsel, Takt, Anschlüsse).

## 2026-11-22 (Nachmittag): Offline, Import, Arme und Figuren mit Quelle

**Neu**
- Offline: Die installierte App speichert beim ersten Start alle Dateien und läuft danach vollständig ohne Internet.
- Import und geteilte Links werden geprüft. Nur gültige Figuren und Folgen werden übernommen, Probleme werden angezeigt.
- Fünf neue Haltungen mit eigener Handführung: beide Arme hoch (Tunnel), Hammerlock, Schal, Brezel, Schulterfassung. Neue Figur: Discofox Schulterfasser.
- 17 Figuren mit Quelle (BallroomGuide):
  - Langsamer Walzer: Left Whisk, Open Impetus, Closed Wing, Turning Lock nach rechts
  - Slowfox: Natural Telemark, Hover Cross, Natural Zig-Zag
  - Quickstep: Tipsy, Rumba Cross
  - Tango: Promenade Link, The Chase, Reverse Outside Swivel
  - Cha-Cha-Cha und Rumba: Reverse Top und Curl, Rumba Closed Hip Twist
- Fußarbeit laut Quelle für fünf vorhandene Walzerfiguren. Insgesamt 22 Figuren mit belegter Technik.
- Feste Kursfolgen: Cha-Cha-Cha und Rumba Bronze und Gold, Tango Silber, Langsamer Walzer Gold.

**Geändert**
- Abstandsausgleich für alle Figuren mit eigenen Damenschritten, wenn die Dame zu nah steht.
- Fächer, Hockeystick und Alemana: Stufe Bronze statt Silber (wie in der Abgleichliste).
- West Coast Swing Right Side Pass: Die Dame hat eigene Schritte statt eines 1,3-m-Schritts.
- Lückenbericht nennt Gründe für bewusst offen gelassene Figuren.

## 2026-11-22: Folgenprüfung, Takt und belegte Figuren

**Behoben**
- Generator: Endfigur und „zurück in die Grundhaltung“ gelten gemeinsam. Eine unmögliche Kombination liefert eine Fehlermeldung statt einer Folge.
- Generator: Die erzwungene Endfigur hält die Wiederholungsregel ein. Start- und Endfigur über der Höchststufe werden abgelehnt; in der Oberfläche sind sie nicht wählbar.
- `folgePruefen([])` meldet eine leere Folge. Die Simulation nutzt dieselbe Figurenbibliothek wie die Metadaten (`flatten(src, figs)`). Eine fehlgeschlagene Simulation ist ein Fehler, kein grünes Ergebnis.
- Neue Schleifenprüfung (letzte → erste Figur). Sie gilt für erzeugte Folgen und wird im Editor und in der Ablaufliste angezeigt.
- Haltungsregeln ergänzt: Seitenposition nur in dieselbe Position; Promenade im Standardtanz nur in eine Promenaden-Figur. Der Wechsel in die Promenade ist als „vereinfacht“ markiert.
- Tango Argentino bekam fälschlich den Bewegungsstil des Tangos, Disco-Samba den des Discofox. Neu ist die Tabelle `TANZ_DATEN` mit Stil, Takt, Zählschema und Phrase je Tanz.
- Metronom: Die betonte Eins läuft über Figurenwechsel und Neubeginn durch. Beginnt eine Figur auf 2, endet das Einzählen auf der Eins davor.
- Tipple-Chassé: letzter Schritt war 2 statt 1 Schlag lang.
- „Seitschritte (Chassé nach links)“ führte nach rechts. Umbenannt und als Alias von „Chassés nach rechts“ gekennzeichnet; sechs Dubletten insgesamt als Alias gekennzeichnet. Zwei doppelte Namen eindeutig gemacht.
- Abgleichliste: Link und Whip zeigten auf dieselbe Figur. Jetzt gibt es einen kombinierten Eintrag, „Link (allein)“ steht als offen.
- Qualitätsprüfung: Pausen ohne Zählzeit sind erlaubt, Rhythmusvarianten werden ausgenommen. Ergebnis: 0 Fehler, 0 Warnungen.

**Neu**
- Sechs Figuren mit Quelle (BallroomGuide): Slowfox Basic Weave, Quickstep Natural Pivot Turn und Reverse Pivot, Tango-Rock links und rechts, Cha-Cha-Cha Closed Hip Twist. Fußarbeit und Sway beider Rollen sind hinterlegt.
- Feste Kursfolgen Bronze und Silber für Slowfox, Quickstep und Salsa (kubanischer Stil).
- Regressionstests (72 Tests) und erweiterter Starttest mit Abspielen, Schleife und Takt.

## 2026-11-18: Ausbau zum Lernsystem

**Neu**
- 57 Aufbaufiguren für Slowfox, Quickstep, Langsamen Walzer, Tango, Cha-Cha-Cha, Rumba und Salsa (`figuren/profi.js`), darunter Open Impetus, Feather Finish, Curved Feather, Hover Feather, Tumble Turn, Bounce Fallaway, Natural Weave, Fishtail, V6, Six Quick Run, Running Right Turn, Open Telemark, Wing, Contra Check, Hover Corté, Spanish Drag, Oversway, Throwaway Oversway, Same Foot Lunge und Chair
- Abgleichliste je Tanz mit den Stufen Bronze, Silber, Gold, Goldstar und Turnier (`figuren/syllabus.js`)
- Technikdaten je Schritt, optional einblendbar: Belastungsfuß, freier Fuß, Fußtechnik, Heben und Senken, CBM, CBMP, Sway, Ausrichtung (`js/technik.js`)
- Tanzlehrer-Ansicht mit Beschreibung, Technik, typischen Fehlern, Hinweisen für Herren und Damen und Unterrichtsmodus
- Profi-Lernmodus: Stopp nach jedem Schritt, Markierung von belastetem Fuß und nächstem Schritt, Ansage der Zählzeit
- Turniermodus: Tanzrichtung, Ausrichtung, Ecken und Raumaufteilung auf der Fläche
- Figuren-Qualitätsprüfung in der App
- Folgen-Generator: fertige Bronze-, Silber-, Gold- und Goldstarfolgen, berücksichtigt Technik und Tanzrichtung
- Kataloge unter `docs/`, Entwicklerdokumentation, dieses Protokoll

**Geändert**
- Kursstufen um Goldstar und Turnier erweitert
- `docs/tanzfiguren.md` heißt jetzt `docs/figurenkatalog.md`

## 2026-11-17: Kursstufen und Folgen-Generator

- Kursstufen, Filter nach Stufe, Typ und Haltung, Karte „Zur Figur“
- Übergangsprüfung und Folgen-Generator
- 21 Kursfiguren und 19 Kursfolgen, Testsuite unter `tests/`
