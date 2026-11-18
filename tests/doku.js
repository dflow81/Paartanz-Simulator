/* Erzeugt die Kataloge unter docs/ aus den Figurendaten:
   analyse.md, figurenluecken.md, figurenkatalog.md, tanzkatalog.md, technikkatalog.md.   Aufruf:  node tests/doku.js */
const fs=require('fs'), path=require('path');
const {ROOT,ladeAlles,lauf}=require('./lade.js');
const c=ladeAlles();
const ids=f=>[...fs.readFileSync(path.join(ROOT,f),'utf8').matchAll(/\b(b_\w+):\[/g)].map(m=>m[1]);
c.NEU=[...new Set([...ids('figuren/kurs.js'),...ids('figuren/profi.js')])];
c.PRIO=['Slowfox','Quickstep','Tango','Langsamer Walzer','Cha-Cha-Cha','Rumba','Salsa','Discofox'];
const D=lauf(c,String.raw`(()=>{ const neu=new Set(NEU), kurz=n=>n.replace(/\s*\(.*?\)/g,''), H_=k=>HOLDS[k][0];
  const figs=Object.entries(BUILTIN).map(([k,F])=>{ const m=figMeta(F,k), an=anschluesse(k), sty=styleOf(F.dance), t=technikVon(F.steps,sty);
    return {id:k,tanz:F.dance,name:F.name,stufe:m.stufe,fest:m.stufeFest,schwer:m.schwer,art:ARTEN[m.art],rhythmus:m.rhythmus,schlaege:m.schlaege,herr:m.herr,dame:m.dame,
      halt:H_(m.haltStart)+(m.haltEnde!==m.haltStart?' → '+H_(m.haltEnde):''),an:an.slice(0,3).map(x=>kurz(BUILTIN[x].name)),anzahl:an.length,neu:neu.has(k),v:m.vereinfacht,s:m.schematisch,
      fuss:t.map(x=>x.technik).join(' '),rise:[...new Set(t.map(x=>x.rise))].join(', '),cbm:t.filter(x=>x.cbm).map(x=>x.nr).join(','),cbmp:t.filter(x=>x.cbmp).map(x=>x.nr).join(','),sway:t.map(x=>x.sway[0]).join(''),
      sig:JSON.stringify([F.steps.map(s=>[s.f,s.dir,s.len,s.d,+s.turn||0,s.hold||'zu']),F.dame?F.dame.map(s=>[s.f,s.dir,s.len,s.d,+s.turn||0]):0])}; });
  const q=qualitaetAlle();
  const syll=Object.entries(SYLLABUS).map(([d,st])=>({tanz:d,st:Object.entries(st).map(([s,l])=>({stufe:+s,da:l.filter(e=>e.includes('=')).map(e=>e.split('=')),fehlt:l.filter(e=>!e.includes('='))}))}));
  let seed=20261118; const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
  const folgen=PRIO.map(d=>({tanz:d,st:[2,3,4,5].map(s=>{ const r=folgeFuerStufe(d,s,rnd); return {stufe:s,fehler:r.fehler,items:r.items.map(i=>kurz(BUILTIN[i.fig].name))}; })}));
  const taenze=DANCES.map(d=>{ const l=figs.filter(f=>f.tanz===d), sty=styleOf(d), f0=Object.values(BUILTIN).find(F=>F.dance===d); return {tanz:d,bpm:f0.bpm,takt:taktOf(d),stil:stilKey(sty),n:l.length,seqs:Object.values(DEFAULT_SEQS).filter(s=>BUILTIN[s.items[0].fig]&&BUILTIN[s.items[0].fig].dance===d).length,stufen:[1,2,3,4,5,6,7].map(s=>l.filter(f=>f.stufe===s).length),fest:l.filter(f=>f.fest).length}; });
  return {figs,q,syll,folgen,taenze,stufen:STUFEN,seqN:Object.keys(DEFAULT_SEQS).length}; })()`);
const esc=s=>String(s).replace(/\|/g,'\\|'), w=(n,t)=>{ fs.writeFileSync(path.join(ROOT,'docs',n),t); console.log('docs/'+n); };
fs.mkdirSync(path.join(ROOT,'docs'),{recursive:true});
const HINWEIS='Diese Datei wird mit `node tests/doku.js` aus den Figurendaten erzeugt. Bitte nicht von Hand bearbeiten.\n';
const F=x=>x||'–', fu=f=>`${F(f.herr.start)}→${F(f.herr.ende)} / ${F(f.dame.start)}→${F(f.dame.ende)}`;
const status=f=>[f.neu?'neu':'vorhanden',f.v?'vereinfacht':'',f.s?'schematisch':''].filter(Boolean).join(', ');
const reihen=[...c.PRIO,...D.taenze.map(t=>t.tanz).filter(t=>!c.PRIO.includes(t))];

/* ---------- Phase 1: Analyse ---------- */
{ const gruppe=(key)=>{ const m={}; for(const f of D.figs) (m[key(f)]??=[]).push(f); return Object.values(m).filter(l=>l.length>1); };
  const dupN=gruppe(f=>f.tanz+'|'+f.name), dupS=gruppe(f=>f.tanz+'|'+f.sig), gesch=D.figs.filter(f=>!f.fest);
  w('analyse.md',`# Analyse der Figurenbibliothek\n\n${HINWEIS}\n## Bestand\n\n- **${D.taenze.length} Tänze**, **${D.figs.length} Figuren**, **${D.seqN} Beispiel- und Kursfolgen**\n- Vollständige Zuordnung jeder Figur (Tanz, Startfuß, Endfuß, Haltung, Schwierigkeit): [figurenkatalog.md](figurenkatalog.md)\n\n| Tanz | Figuren | Stufe festgelegt | Stufe geschätzt |\n|---|---|---|---|\n${D.taenze.map(t=>`| ${esc(t.tanz)} | ${t.n} | ${t.fest} | ${t.n-t.fest} |`).join('\n')}\n\n## Dubletten\n\n### Gleicher Name im selben Tanz (${dupN.length})\n\n${dupN.length?dupN.map(l=>`- ${esc(l[0].tanz)}: „${esc(l[0].name)}“ – ${l.map(f=>'\`'+f.id+'\`').join(', ')}`).join('\n'):'Keine.'}\n\n### Gleiche Schritte im selben Tanz (${dupS.length})\n\n${dupS.length?dupS.map(l=>`- ${esc(l[0].tanz)}: ${l.map(f=>`„${esc(f.name)}“ (\`${f.id}\`)`).join(' = ')}`).join('\n'):'Keine.'}\n\nDubletten wurden nicht gelöscht, weil gespeicherte eigene Folgen auf diese Figuren verweisen können.\n\n## Unvollständige Figuren\n\n- Figuren ohne Schritte, Startfuß oder Endfuß: **0** (wird von \`node tests/test.js\` geprüft)\n- Figuren ohne festgelegte Kursstufe (Stufe wird geschätzt): **${gesch.length}** von ${D.figs.length}\n\n## Inkonsistente Figuren (Figuren-Qualitätsprüfung)\n\n${D.q.geprueft} Figuren geprüft: **${D.q.fehler} Fehler, ${D.q.warnungen} Warnungen**.\n\n${D.q.liste.length?D.q.liste.map(x=>`- ${esc(x.tanz)} – ${esc(x.name)} (\`${x.id}\`): ${x.q.map(q=>(q.art==='fehler'?'**Fehler:** ':'')+esc(q.text)).join('; ')}`).join('\n'):'Keine Auffälligkeiten.'}\n`); }

/* ---------- Phase 2: Figurenlücken ---------- */
{ const nm={2:'Bronze',3:'Silber',4:'Gold',5:'Goldstar',6:'Turnier'}, prio=[]; let md='';
  const sortiert=[...D.syll].sort((a,b)=>{ const i=x=>{ const k=c.PRIO.indexOf(x.tanz); return k<0?99:k; }; return i(a)-i(b); });
  for(const s of sortiert){ const da=s.st.reduce((a,x)=>a+x.da.length,0), fe=s.st.reduce((a,x)=>a+x.fehlt.length,0);
    md+=`## ${esc(s.tanz)}\n\nAbgedeckt: **${da} von ${da+fe}** Figuren der Abgleichliste (${Math.round(da/(da+fe)*100)} %).\n\n| Stufe | vorhanden | fehlend |\n|---|---|---|\n`;
    for(const x of s.st){ md+=`| ${nm[x.stufe]} | ${x.da.map(e=>esc(e[0])).join(', ')||'–'} | ${x.fehlt.map(esc).join(', ')||'–'} |\n`; x.fehlt.forEach(n=>prio.push({tanz:s.tanz,name:n,stufe:x.stufe})); }
    md+='\n'; }
  const rang=p=>{ const k=c.PRIO.indexOf(p.tanz); return (k<0?9:k)+p.stufe*3; }; prio.sort((a,b)=>rang(a)-rang(b));
  const ohne=D.taenze.map(t=>t.tanz).filter(t=>!D.syll.some(s=>s.tanz===t));
  w('figurenluecken.md',`# Figurenlücken\n\n${HINWEIS}\n**Grundlage:** eine aus dem Fachwissen zusammengestellte Abgleichliste (\`figuren/syllabus.js\`) mit den allgemein bekannten Figurennamen der Medaillenprogramme, vor allem nach der englischen Technik (ISTD). Die offiziellen Lehrpläne von ADTV, DTV, ISTD und WDSF lagen nicht vor. Die Zuordnung zu den Stufen ist deshalb eine Orientierung und kann je nach Verband und Ausgabe abweichen. „Goldstar“ und „Turnier“ sind keine einheitlichen Verbandsstufen, sondern eine eigene Einordnung.\n\nFür diese Tänze gibt es keine Abgleichliste, weil kein vergleichbares Medaillenprogramm hinterlegt ist: ${ohne.map(esc).join(', ')}.\n\n## Priorisierte Liste der fehlenden Figuren\n\nSortiert nach gewünschter Tanz-Priorität und Stufe (niedrige Stufen zuerst).\n\n| Nr. | Tanz | Figur | Stufe |\n|---|---|---|---|\n${prio.map((p,i)=>`| ${i+1} | ${esc(p.tanz)} | ${esc(p.name)} | ${nm[p.stufe]} |`).join('\n')}\n\n${md}`); }

/* ---------- Figurenkatalog ---------- */
{ let md=`# Figurenkatalog\n\n${HINWEIS}\nStand: ${D.figs.length} Figuren in ${D.taenze.length} Tänzen.\n\n**Kursstufen:** ${[1,2,3,4,5,6,7].map(i=>i+' = '+D.stufen[i]).join(', ')}. Sie sind eine Orientierung am Aufbau üblicher Kurse, keine offizielle Zuordnung eines Verbands. Mit * markierte Stufen sind aus dem Schwierigkeitsgrad geschätzt.\n\n**Füße:** H = Herr, D = Dame, jeweils Startfuß → Fuß mit Gewicht am Ende. **Status:** „neu“ = seit dem Ausbau zum Lernsystem, „vereinfacht“ = Armführung wird nicht gezeigt, „schematisch“ = Schrittfolge nicht mit einem Technikbuch abgeglichen.\n\n`;
  for(const d of reihen){ const l=D.figs.filter(f=>f.tanz===d).sort((a,b)=>a.stufe-b.stufe||a.schwer-b.schwer);
    md+=`## ${esc(d)}\n\n| Figur | Stufe | Schwierigkeit | Typ | Zählzeiten (Schläge) | Füße H / D | Haltung | Anschlüsse | Status |\n|---|---|---|---|---|---|---|---|---|\n`;
    for(const f of l) md+=`| ${esc(f.name)} | ${f.stufe}${f.fest?'':'*'} | ${'★'.repeat(f.schwer)} | ${f.art} | ${esc(f.rhythmus)} (${f.schlaege}) | ${fu(f)} | ${f.halt} | ${f.anzahl}: ${esc(f.an.join(', '))} | ${status(f)} |\n`;
    md+='\n'; }
  w('figurenkatalog.md',md); }

/* ---------- Tanzkatalog ---------- */
{ const stil={swing:'Schwungtanz mit Heben und Senken',tango:'Standard ohne Heben und Senken',latin:'Latein mit Hüftaktion',bounce:'federnd',social:'Gesellschaftstanz'};
  w('tanzkatalog.md',`# Tanzkatalog\n\n${HINWEIS}\n| Tanz | Takt | Tempo (Schläge/min) | Stil | Figuren | Folgen | ${[1,2,3,4,5,6,7].map(i=>D.stufen[i].replace(' (WTP 1)','')).join(' | ')} |\n|---|---|---|---|---|---|${'---|'.repeat(7)}\n${D.taenze.map(t=>`| ${esc(t.tanz)} | ${t.takt}/4 | ${t.bpm} | ${stil[t.stil]} | ${t.n} | ${t.seqs} | ${t.stufen.join(' | ')} |`).join('\n')}\n\n## Beispiele des Folgen-Generators\n\nJe Medaillenstufe automatisch erzeugt, mit gültigen Übergängen. In der App erzeugt jeder Klick eine neue Folge.\n\n${D.folgen.map(x=>`### ${esc(x.tanz)}\n\n${x.st.map(s=>`- **${D.stufen[s.stufe]}:** ${s.fehler.length?esc(s.fehler[0]):s.items.map(esc).join(' → ')}`).join('\n')}\n`).join('\n')}`); }

/* ---------- Technikkatalog ---------- */
{ let md=`# Technikkatalog\n\n${HINWEIS}\n**Wichtig:** Die Technikangaben werden nach festen Regeln aus den Schritten abgeleitet (\`js/technik.js\`). Sie sind eine Lernhilfe, keine Abschrift aus einem Technikbuch.\n\n## Begriffe\n\n| Begriff | Bedeutung |\n|---|---|\n| H, T, B, F | Ferse (Heel), Spitze (Toe), Ballen (Ball), ganzer Fuß (Flat) |\n| HT, TH, BF | Abrollen in dieser Reihenfolge, z. B. HT = erst Ferse, dann Spitze |\n| Heben und Senken | Rise and Fall: aus der Zählzeit abgeleitet |\n| CBM | Contra Body Movement: Körper dreht zum bewegten Fuß hin, zu Beginn einer Drehung |\n| CBMP | Contra Body Movement Position: Fuß wird auf die Körperlinie des anderen Fußes gesetzt |\n| Sway | Neigung des Körpers: g gerade, l links, r rechts, – keine |\n| LOD | Line of Dance, Tanzrichtung gegen den Uhrzeigersinn |\n| DW, DC, W, C | diagonal zur Wand, diagonal zur Mitte, Wand, Mitte |\n\nBelastungsfuß, freier Fuß und Ausrichtung im Raum stehen je Schritt in der App unter „Schritte erklärt“ → „Technikdaten einblenden“.\n\n`;
  for(const d of reihen){ const l=D.figs.filter(f=>f.tanz===d); md+=`## ${esc(d)}\n\n| Figur | Fußtechnik Herr je Schritt | Heben und Senken | CBM bei Schritt | CBMP bei Schritt | Sway je Schritt |\n|---|---|---|---|---|---|\n`;
    for(const f of l) md+=`| ${esc(f.name)} | ${esc(f.fuss)} | ${esc(f.rise)} | ${f.cbm||'–'} | ${f.cbmp||'–'} | ${esc(f.sway)} |\n`; md+='\n'; }
  w('technikkatalog.md',md); }
