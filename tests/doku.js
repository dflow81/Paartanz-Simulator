/* Erzeugt docs/tanzfiguren.md aus den Figurendaten (Tabelle aller Figuren mit Stufe, Rhythmus, Füßen und Anschlüssen).
   Aufruf:  node tests/doku.js      – nach jeder Änderung an den Figuren neu ausführen. */
const fs=require('fs'), path=require('path');
const {ROOT,ladeAlles,lauf}=require('./lade.js');
const c=ladeAlles();
const neu=new Set([...fs.readFileSync(path.join(ROOT,'figuren/kurs.js'),'utf8').matchAll(/^\s*(b_\w+):\[/gm)].map(m=>m[1]));
c.NEU=[...neu];
const daten=lauf(c,`(()=>{ const neu=new Set(NEU), out=[];
  for(const d of DANCES){ const ids=Object.keys(BUILTIN).filter(k=>BUILTIN[k].dance===d);
    for(const k of ids){ const F=BUILTIN[k], m=figMeta(F,k), an=anschluesse(k);
      out.push({tanz:d,id:k,name:F.name,stufe:m.stufe,fest:m.stufeFest,schwer:m.schwer,art:ARTEN[m.art],rhythmus:m.rhythmus,schlaege:m.schlaege,
        herr:m.herr,dame:m.dame,halt:HOLDS[m.haltStart][0]+(m.haltEnde!==m.haltStart?' → '+HOLDS[m.haltEnde][0]:''),
        an:an.slice(0,3).map(x=>BUILTIN[x].name.replace(/\\s*\\(.*?\\)/g,'')),anzahl:an.length,neu:neu.has(k),v:m.vereinfacht}); } }
  return {figs:out,stufen:STUFEN,seqs:Object.entries(DEFAULT_SEQS).filter(([k])=>/^k_/.test(k)).map(([k,s])=>({id:k,name:s.name,items:s.items.map(i=>BUILTIN[i.fig].name.replace(/\\s*\\(.*?\\)/g,'')+(i.rep>1?' ×'+i.rep:''))}))}; })()`);
const F=x=>x==='L'?'L':x==='R'?'R':'–', esc=s=>String(s).replace(/\|/g,'\\|');
const SCHWERPUNKT=['Discofox','Langsamer Walzer','Tango','Cha-Cha-Cha','Rumba','Jive','Samba'];
let md=`# Tanzfiguren – Übersicht

Diese Datei wird mit \`node tests/doku.js\` aus den Figurendaten erzeugt. Bitte nicht von Hand bearbeiten.

Stand: ${daten.figs.length} Figuren in ${new Set(daten.figs.map(f=>f.tanz)).size} Tänzen, davon ${daten.figs.filter(f=>f.neu).length} neue Kursfiguren (Status „neu“).

## Kursstufen

| Stufe | Bedeutung |
|---|---|
${[1,2,3,4,5].map(i=>`| ${i} | ${daten.stufen[i]} |`).join('\n')}

Die Stufen orientieren sich am Aufbau üblicher Tanzschulkurse: Welttanzprogramm für Einsteiger, danach Bronze, Silber und Gold. **Das ist eine Orientierung, keine offizielle Zuordnung des ADTV oder eines anderen Verbands.**

- **Festgelegt** sind die Stufen für ${SCHWERPUNKT.join(', ')}. Sie stehen in \`figuren/info.js\`.
- **Geschätzt** sind alle übrigen Stufen, aus dem Schwierigkeitsgrad. Sie sind in der Tabelle mit * markiert und in der App mit „(geschätzt)“.

## Spalten

- **Schwierigkeit** 1–5 wird aus den Schritten berechnet. Es zählen Anzahl der Schritte, Drehung, eigene Schritte der Dame, Haltungswechsel, Synkopen und Solodrehungen.
- **Zählzeiten** nennt die Zählung der Schritte, in Klammern die Zahl der Schläge.
- **Füße**: H = Herr, D = Dame, jeweils „Startfuß → Fuß mit Gewicht am Ende“. Die nächste Figur muss mit dem anderen Fuß beginnen.
- **Anschlüsse** zeigt die Zahl der Figuren desselben Tanzes, die laut Übergangsprüfung folgen dürfen, und drei Beispiele.
- **Status** ist „neu“ (dieser Ausbau) oder „vorhanden“. „vereinfacht“ heißt: Die Figur wird über Positionen und Drehungen gezeigt, die Armführung nicht.

## Kursfolgen

Übungsfolgen, die sich am Aufbau der Kurse orientieren (keine offiziellen Verbandsfolgen):

${daten.seqs.map(s=>`- **${s.name}**: ${s.items.join(' → ')}`).join('\n')}

`;
for(const d of [...SCHWERPUNKT,...[...new Set(daten.figs.map(f=>f.tanz))].filter(d=>!SCHWERPUNKT.includes(d))]){
  const l=daten.figs.filter(f=>f.tanz===d).sort((a,b)=>a.stufe-b.stufe||a.schwer-b.schwer);
  md+=`## ${d}\n\n| Figur | Stufe | Schwierigkeit | Typ | Zählzeiten | Füße H / D | Haltung | Anschlüsse | Status |\n|---|---|---|---|---|---|---|---|---|\n`;
  for(const f of l) md+=`| ${esc(f.name)} | ${f.stufe}${f.fest?'':'*'} | ${'★'.repeat(f.schwer)} | ${f.art} | ${esc(f.rhythmus)} (${f.schlaege}) | ${F(f.herr.start)}→${F(f.herr.ende)} / ${F(f.dame.start)}→${F(f.dame.ende)} | ${f.halt} | ${f.anzahl}: ${esc(f.an.join(', '))} | ${f.neu?'neu':'vorhanden'}${f.v?', vereinfacht':''} |\n`;
  md+='\n';
}
fs.mkdirSync(path.join(ROOT,'docs'),{recursive:true});
fs.writeFileSync(path.join(ROOT,'docs/tanzfiguren.md'),md);
console.log('docs/tanzfiguren.md geschrieben: '+daten.figs.length+' Figuren');
