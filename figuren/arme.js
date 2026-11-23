/* Armführung innerhalb einer Haltung: Schritte bekommen eine Armaktion (Feld „arm“, siehe ARME in js/basis.js).
   aus   = Linie: der freie Arm streckt sich seitlich nach oben (New Yorker, Hand to Hand, Fencing, Spanische Linie)
   zug   = die gefasste Hand holt die Dame heran (Führung aus dem Fächer, Hip Twist, Platzwechsel)
   stopp = die gefasste Hand hält kurz dagegen (Checked Action, Stop and Go)
   Drehungen unter dem Arm brauchen keinen Eintrag: In der Haltung „Arm hoch“ kreist die Hand von selbst über dem Kopf. */
{
const arm=(id,liste)=>{ const F=BUILTIN[id]; if(!F) return; for(const [i,a] of Object.entries(liste)) if(F.steps[i]) F.steps[i]={...F.steps[i],arm:a}; };
/* Regel: in den Lateintänzen öffnet ein Schritt „seitlich über Kreuz“ in Einhandfassung zur Linie (New Yorker, Hand to Hand) */
const LATEIN=['Cha-Cha-Cha','Rumba','Samba','Jive','Paso Doble','Salsa','Mambo'];
for(const F of Object.values(BUILTIN)) if(LATEIN.includes(F.dance))
  F.steps=F.steps.map(s=>!s.arm&&/^kreuzSeit/.test(s.dir)&&(s.hold==='LR'||s.hold==='RL')?{...s,arm:'aus'}:s);
/* Gezielt: Führung aus dem Fächer, Hip Twists, Checks und Linien */
for(const id of ['b_c_hockey','b_r_hockey','b_c_alemana','b_r_alemana','b_r_alem3','b_c_hip','b_r_hip','b_c_hipspiral','b_r_hipspiral','b_j_link']) arm(id,{0:'zug'});
arm('b_c_closedhip',{0:'stopp',5:'zug'}); arm('b_r_closedhip',{0:'stopp',3:'zug'});
arm('b_c_fence',{0:'aus'}); arm('b_r_fence',{0:'aus'});
arm('b_s_cbl',{1:'zug'}); arm('b_s_ench',{3:'zug'}); arm('b_s_setenta',{3:'zug'});
arm('b_j_stopgo',{5:'stopp'});
arm('b_pd_spanish',{4:'aus'}); arm('b_pd_sep',{2:'aus'});
}
