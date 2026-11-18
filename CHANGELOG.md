# Änderungsprotokoll

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
