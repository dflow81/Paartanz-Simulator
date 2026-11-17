# 💃 Paartanz-Simulator

Ein 3D-Simulator im Browser zum Lernen und Üben von Paartänzen. Herr und Dame tanzen Figuren und ganze Tanzfolgen vor – mit Fußspur, Schrittdiagramm, Metronom und auf Wunsch zur eigenen Musik.

**▶ Direkt ausprobieren:** https://dflow81.github.io/Paartanz-Simulator/

## Was er kann

- **31 Tänze, 376 Figuren und 99 Beispielfolgen:** Langsamer Walzer, Wiener Walzer, Tango, Slowfox, Quickstep, Foxtrott, Discofox, Blues, Rock'n'Roll, Polka, Cha-Cha-Cha, Rumba, Samba, Jive, Paso Doble, Salsa, Bachata, Merengue, Boogie-Woogie, Tango Argentino, West Coast Swing Dazu die übrigen Tänze des Welttanzprogramms: Walzer-Musette, Tangowalzer, Disco-Samba, Two Step, Bugg, Cumbia, Tango Americano, Nordic Tango, Mambo und Marschfox.
- **Fertige Tanzfolgen** für jeden Tanz, dazu eigene Folgen und eigene Figuren im Editor
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
2. Im Tab **Abspielen** eine Tanzfolge oder einzelne Figur wählen.
3. Mit der Maus drehen und zoomen. Ton (Metronom, Ansage, Musik) startet nach dem ersten Klick auf die Seite.

**Eigene Figuren** legst du im Tab **Figuren** Schritt für Schritt an: Fuß, Richtung, Schrittlänge, Drehung, Dauer in Schlägen, Zählung und Haltung. Vorgegebene Figuren lassen sich als Kopie bearbeiten. **Eigene Tanzfolgen** baust du im Tab **Tanzfolgen** – ⚠ zeigt an, wo eine Figur mit dem falschen Fuß beginnt.

Eigene Figuren und Folgen werden im Browser gespeichert (nicht auf GitHub). Mit **Exportieren** sicherst du sie als Datei.

## Lokal starten

Repository herunterladen und `tanzsimulator.html` (oder `index.html`) im Browser öffnen. Es wird kein Server und kein Internet benötigt.

## Aufbau

| Datei / Ordner | Inhalt |
|---|---|
| `tanzsimulator.html`, `tanzsimulator.css` | Menü und Aussehen |
| `js/basis.js` | Schrittrichtungen, Haltungen, Hilfsfunktionen für die Figuren |
| `figuren/*.js` | die Figuren je Tanzgruppe und die Beispielfolgen |
| `js/engine.js` | Schritt-Engine: Fußpositionen, Gewicht, Drehungen, Raumbegrenzung |
| `js/szene.js` | 3D-Szene, Tänzer, Arme und Haltungen, Schrittdiagramm |
| `js/app.js` | Wiedergabe, Editoren, Musik und Ansagen |
| `js/editor.js` | grafischer Figuren-Editor (Schrittplan) |
| `lib/` | three.js r160 (MIT-Lizenz) für die 3D-Darstellung, als normale Skripte verpackt |

Neue Figuren lassen sich auch direkt in `figuren/*.js` ergänzen, z. B.:

```js
tanz('Foxtrott',120,{
  b_f_beispiel:['Meine Figur',[S('L','vor',40,2,'S'),S('R','vor',40,2,'S'),S('L','seit',25,1,'Q'),S('R','schliessen',0,1,'Q')]],
});
```

`S(Fuß, Richtung, cm, Schläge, Zählung, Drehung°, Haltung)` – Drehung positiv = links, negativ = rechts.

## Hinweis

Die Figuren sind vereinfachte Tanzschul-Versionen und können von dem abweichen, was in deiner Tanzschule unterrichtet wird. Korrekturen und Ergänzungen sind willkommen.
