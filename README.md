# Kirchbergnet Extended

Eine Browser-Erweiterung für die Lernplattform **training.kirchbergnet.de**. Sie wertet Aufgaben direkt nach dem Klick auf "Antwort prüfen" aus, markiert die Felder farblich und zeigt, wo die Fehler liegen und was die richtige Lösung gewesen wäre.

## Unterstützte Aufgabentypen

Die Erweiterung erkennt die Aufgabenformate der Plattform automatisch:
1. Zuordnung (Canvas)
2. Single Choice (Radio-Buttons)
3. Multiple Choice (Checkboxes)
4. Lückentexte (Textfelder & Dropdowns)
5. Drag & Drop (Paare zuordnen)
6. Drag & Drop (Listen sortieren)

---

## Installationsanleitung (Chrome & Edge)

Da diese Erweiterung nicht im offiziellen Web Store gelistet ist, muss diese als "entpackte Erweiterung" über den Entwicklermodus installiert werden:

1. **Dateien herunterladen:** Lade den Ordner mit der Erweiterung (enthält `manifest.json` und `content.js`) herunter und entpacke ihn.
2. **Extentions-Seite öffnen:**
   * In Google Chrome: Gib `chrome://extensions` in die Adresszeile ein.
   * In Microsoft Edge: Gib `edge://extensions` in die Adresszeile ein.
3. **Entwicklermodus aktivieren:** Schalte oben rechts (oder unten links bei Edge) den Schalter für **"Entwicklermodus"** (Developer mode) ein.
4. **Erweiterung laden:** Klicke nun oben links auf den Button **"Entpackte Erweiterung laden"** (Load unpacked).
5. **Ordner auswählen:** Wähle den zuvor entpackten Ordner (den Ordner, in dem die `manifest.json` liegt) aus und bestätige.
