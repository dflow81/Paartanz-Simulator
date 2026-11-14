/* ================= Speicher =================
   Eigene Figuren und Tanzfolgen liegen im Browser (localStorage). Wird nach den Dateien in figuren/ geladen. */
const STORE='tanzsim_v2';
let user={figures:{},seqs:structuredClone(DEFAULT_SEQS),seen:Object.keys(DEFAULT_SEQS)};
try{const s=JSON.parse(localStorage.getItem(STORE)); if(s&&s.figures&&s.seqs) user=s;}catch(e){}
const saveStore=()=>{try{localStorage.setItem(STORE,JSON.stringify(user));}catch(e){}};
{ // neu hinzugekommene Beispielfolgen einmalig ergänzen
  const seen=new Set(user.seen||Object.keys(user.seqs)); let ch=!user.seen;
  for(const k in DEFAULT_SEQS) if(!seen.has(k)){ seen.add(k); if(!user.seqs[k]) user.seqs[k]=structuredClone(DEFAULT_SEQS[k]); ch=true; }
  if(user.seqs.s_tango&&user.seqs.s_tango.bpm===64){ user.seqs.s_tango.bpm=128; ch=true; }   // Tango wurde früher im halben Tempo gezählt
  for(const k of ['s_walzer','s_disco','s_chacha','s_disco2','s_chacha2','s_walzer2','s_wiener','s_tango','s_salsa'])   // alte Beispielnamen angleichen
    if(user.seqs[k]&&/\(Beispiel\)|^(Wiener Walzer|Discofox mit|Cha-Cha mit|Walzer mit|Salsa mit)/.test(user.seqs[k].name)&&JSON.stringify(user.seqs[k].items)===JSON.stringify(DEFAULT_SEQS[k].items)){ user.seqs[k].name=DEFAULT_SEQS[k].name; ch=true; }
  if(ch){ user.seen=[...seen]; saveStore(); }
}
const allFigs=()=>({...BUILTIN,...user.figures});
const uid=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const stepText=s=>s.dir==='halt'?'Pause':(s.f==='L'?'Links ':'Rechts ')+(DIRS[s.dir]||s.dir)+(+s.turn?` · ${s.turn>0?'Links':'Rechts'}drehung ${Math.abs(s.turn)}°`:'');
