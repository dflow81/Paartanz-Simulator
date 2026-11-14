# 💃 Paartanz-Simulator

Ein 3D-Simulator im Browser zum Lernen und Üben von Paartänzen. Herr und Dame tanzen Figuren und ganze Tanzfolgen vor – mit Fußspur, Schrittdiagramm, Metronom und auf Wunsch zur eigenen Musik.

**▶ Direkt ausprobieren:** https://dflow81.github.io/Paartanz-Simulator/

## Was er kann

- **18 Tänze, über 110 Figuren:** Langsamer Walzer, Wiener Walzer, Tango, Slowfox, Quickstep, Foxtrott, Discofox, Blues, Rock'n'Roll, Polka, Cha-Cha-Cha, Rumba, Samba, Jive, Paso Doble, Salsa, Bachata, Merengue
- **Fertige Tanzfolgen** für jeden Tanz, dazu eigene Folgen und eigene Figuren im Editor
- **Realistische Bewegung:** Gewichtsverlagerung, Fußabrollen, Heben und Senken im Walzer, Hüftbewegung in Latein, Federn im Jive
- **Tanzhaltungen:** geschlossen, Promenade, offen, eine Hand, Arm hoch, Kreuzhand, Körbchen, Schattenposition
- **Die Dame tanzt eigene Schritte** bei Solodrehungen, Platzwechseln, New Yorker usw. – sonst gegengleich
- **Zum Üben:** Schritt vor und zurück, eine Figur in Schleife, Tempo von 20 bis 150 %, Klick in den Ablauf zum Springen
- **Ansichten:** Übersicht, von oben, hinter dem Herrn oder der Dame; Fußspur oder nummeriertes Schrittdiagramm
- **Nur Herr oder nur Dame zeigen** (der Partner wird durchsichtig) und **Spiegelbild-Ansicht** zum Mittanzen vor dem Bildschirm
- **Ton:** Metronom mit betonter „1“, Ansage der nächsten Figur, eigene Musikdatei (wird ans Tanztempo angepasst)
- **Tanzfläche** in drei Größen – das Paar tanzt automatisch in Kurven und bleibt im Raum
- **Export und Import** eigener Figuren und Folgen als Datei, z. B. zum Teilen mit dem Tanzpartner

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
