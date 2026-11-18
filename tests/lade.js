/* Lädt Figuren, Speicher, Engine und Figuren-Metadaten in derselben Reihenfolge wie tanzsimulator.html,
   aber ohne Browserfenster (alles außer three.js und der Seite). Gibt den Kontext mit allen Funktionen zurück. */
const fs=require('fs'), vm=require('vm'), path=require('path');
const ROOT=path.join(__dirname,'..');
const OHNE_FENSTER=/^(js\/basis|figuren\/|js\/speicher|js\/engine|js\/figurdaten|js\/technik)/;
/* Alle Skripte, die die Seite lädt, in ihrer Reihenfolge */
function skripte(){
  const html=fs.readFileSync(path.join(ROOT,'tanzsimulator.html'),'utf8');
  return [...html.matchAll(/<script src="([^"?]+)(?:\?v=\d+)?"/g)].map(m=>m[1]);
}
function ladeAlles(){
  const c={console,Math,structuredClone}; vm.createContext(c);
  for(const f of skripte().filter(f=>OHNE_FENSTER.test(f))){
    let src=fs.readFileSync(path.join(ROOT,f),'utf8');
    if(f==='js/speicher.js') src='var localStorage={getItem:()=>null,setItem:()=>{}};\n'+src;   // leerer Speicher: nur die Beispielfolgen
    vm.runInContext(src,c,{filename:f});
  }
  return c;
}
const lauf=(c,code)=>vm.runInContext(code,c);
module.exports={ROOT,skripte,ladeAlles,lauf};
