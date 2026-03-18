window.addEventListener('load', function() {
    const pruefButton = document.getElementById('pruefbut');
    
    if (pruefButton) {
        pruefButton.addEventListener('click', function() {
            setTimeout(zeigeLoesungen, 100);
        });
    }
});

function zeigeLoesungen() {
    const farbeKorrekt = "#c8e6c9";
    const farbeFalsch = "#ffcdd2";

    // Zuordnung (Canvas) 
    if (typeof window.anz_linke !== 'undefined' && typeof window.linienstarts !== 'undefined') {
        const zeilen = document.querySelectorAll('#fragetabelle tr');
        console.log("--- Richtige Lösungen ---");
        for (let i = 0; i < window.anz_linke; i++) {
            let tr = zeilen[i + 1];
            if (!tr) continue;
            let linkeZelle = tr.querySelector('td');
            
            let zugeordnet = null;
            let rechtesElement = null;
            
            for (let j = 0; j < window.anz_linien; j++) {
                if (window.linienstarts[j] == i) { 
                    zugeordnet = window.linienende[j];
                    rechtesElement = document.getElementById("r" + zugeordnet);
                    break; 
                }
            }
            
            let istKorrekt = (rechtesElement && window.loesungen[i] && rechtesElement.textContent.trim() === window.loesungen[i].trim());
            
            if (linkeZelle) {
                if (istKorrekt) {
                    linkeZelle.style.backgroundColor = farbeKorrekt;
                    linkeZelle.title = "";
                    linkeZelle.style.cursor = "default";
                } else {
                    linkeZelle.style.backgroundColor = farbeFalsch;
                    if (window.loesungen[i]) {
                        linkeZelle.title = window.loesungen[i].trim();
                        linkeZelle.style.cursor = "help";
                    } else {
                        linkeZelle.title = "";
                        linkeZelle.style.cursor = "default";
                    }
                }

                if (window.loesungen[i]) {
                    console.log(linkeZelle.textContent.trim() + " --> " + window.loesungen[i].trim());
                }
            }
        }
        return;
    }

    // SINGLE CHOICE (Radio-Buttons) 
    if (typeof window.loesungsnr !== 'undefined') {
        const radios = document.querySelectorAll("input[type='radio']");
        console.log("--- Richtige Lösungen ---");
        radios.forEach((radio, i) => {
            let row = radio.closest('tr');
            if (row) {
                if (i === window.loesungsnr) {
                    row.style.backgroundColor = farbeKorrekt;
                    row.title = "Das ist die richtige Antwort";
                    row.style.cursor = "default";
                    console.log("Richtig: " + row.textContent.trim().replace(/\s+/g, ' '));
                } else if (radio.checked) {
                    row.style.backgroundColor = farbeFalsch;
                    row.title = "Falsche Auswahl";
                    row.style.cursor = "not-allowed";
                } else {
                    row.style.backgroundColor = "";
                    row.title = "";
                    row.style.cursor = "default";
                }
            }
        });
        return;
    }

    // MULTIPLE CHOICE (Checkboxes)
    if (typeof window.anz_alternativen !== 'undefined' && window.loesungen) {
        console.log("--- Richtige Lösungen ---");
        for (let i = 0; i < window.anz_alternativen; i++) {
            let cb = document.getElementById("moeg" + (i + 1));
            if (cb) {
                let row = cb.closest('tr');
                let isKorrekt = (window.loesungen[i] === "X");
                
                if (isKorrekt) {
                    row.style.backgroundColor = farbeKorrekt;
                    row.title = "Muss angekreuzt sein";
                    row.style.cursor = "default";
                    console.log("Ankreuzen: " + row.textContent.trim().replace(/\s+/g, ' '));
                } else if (cb.checked) {
                    row.style.backgroundColor = farbeFalsch;
                    row.title = "Darf nicht angekreuzt sein";
                    row.style.cursor = "not-allowed";
                } else {
                    row.style.backgroundColor = "";
                    row.title = "";
                    row.style.cursor = "default";
                }
            }
        }
        return;
    }

    // LÜCKENTEXT (Textfelder & Dropdowns)
    if (typeof window.anz_lueckentexte !== 'undefined' && window.loesungen) {
        function levDist(s, t) {
            if (!s.length) return t.length;
            if (!t.length) return s.length;
            const arr = [];
            for (let i = 0; i <= t.length; i++) { arr[i] = [i]; }
            for (let j = 0; j <= s.length; j++) { arr[0][j] = j; }
            for (let i = 1; i <= t.length; i++) {
                for (let j = 1; j <= s.length; j++) {
                    arr[i][j] = Math.min(arr[i-1][j]+1, arr[i][j-1]+1, arr[i-1][j-1] + (s[j-1]===t[i-1]?0:1));
                }
            }
            return arr[t.length][s.length];
        }

        let maxFehler = window.maxtippfehler || 0;
        console.log("--- Richtige Lösungen ---");

        for (let i = 0; i < window.anz_lueckentexte; i++) {
            let elem = document.getElementById("eingabe" + (i + 1));
            if (elem) {
                let val = elem.value.trim();
                let teile = window.loesungen[i].split("|");
                let istKorrekt = false;

                for (let j = 0; j < teile.length; j++) {
                    if (elem.tagName.toLowerCase() === "select") {
                        if (val === teile[j].trim()) istKorrekt = true;
                    } else {
                        if (levDist(val, teile[j].trim()) <= maxFehler) istKorrekt = true;
                    }
                }
                
                if (!istKorrekt) {
                    elem.title = window.loesungen[i].replace(/\|/g, " ODER ");
                    elem.style.backgroundColor = farbeFalsch;
                    elem.style.cursor = "help";
                } else {
                    elem.title = "";
                    elem.style.backgroundColor = farbeKorrekt;
                    elem.style.cursor = "default";
                }
            }
            console.log("Lücke " + (i + 1) + ": " + window.loesungen[i].replace(/\|/g, " ODER "));
        }
        return;
    }

    // DRAG & DROP (Paare zuordnen)
    if (typeof window.anz_paare !== 'undefined' && window.loesungen) {
        console.log("--- Richtige Lösungen ---");
        for (let i = 0; i < window.anz_paare; i++) {
            let box = document.getElementById("m" + i);
            if (box) {
                let val = box.textContent.trim().replace(/\n|\r/g, "");
                let istKorrekt = (val === window.loesungen[i].trim());
                
                if (!istKorrekt) {
                    box.title = window.loesungen[i].trim();
                    box.style.backgroundColor = farbeFalsch;
                    box.style.cursor = "help";
                } else {
                    box.title = "";
                    box.style.backgroundColor = farbeKorrekt;
                    box.style.cursor = "default";
                }
                
                let linkeZelle = box.previousElementSibling;
                let linkerText;
                if(linkeZelle) {
                    linkerText = linkeZelle.textContent.trim();
                } else {
                    linkerText = "Feld " + (i + 1);
                }
                console.log(linkerText + " --> " + window.loesungen[i].trim());
            }
        }
        return;
    }

    // DRAG & DROP (Sortierung einer Liste)
    if (typeof window.anz_texte !== 'undefined' && window.loesungen) {
        console.log("--- Richtige Lösungen ---");
        for (let i = 0; i < window.anz_texte; i++) {
            let elem = document.getElementById("s" + (i + 1));
            if (elem) {
                let val = elem.textContent.trim().replace(/\n|\r/g, "");
                let korrekteLoesung = window.loesungen[i].trim();
                let istKorrekt = (val === korrekteLoesung);   
                           
                if (!istKorrekt) {
                    elem.title = "An diese Position gehört: " + korrekteLoesung;
                    elem.style.backgroundColor = farbeFalsch; 
                    elem.style.cursor = "help";
                } else {
                    elem.title = "";
                    elem.style.backgroundColor = farbeKorrekt; 
                    elem.style.cursor = "default";
                }
            }
            console.log("Position " + (i + 1) + ": " + window.loesungen[i].trim());
        }
        return;
    }
}