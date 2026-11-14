/* Lateintänze: Cha-Cha-Cha, Rumba, Samba, Jive, Paso Doble */
{
/* Cha-Cha und Rumba haben denselben Aufbau: 2, 3 und dann „4 & 1“ (Cha-Cha: Chassé) bzw. „4–1“ (Rumba: ein langsamer Seitschritt) */
function latein(cha){
  const T=f=>cha?[S(f,'seit',12,.5,'4'),S(O(f),'schliessen',0,.5,'&'),S(f,'seit',12,1,'1')]:[S(f,'seit',25,2,'4')];
  const h1=[S('L','vor',30,1,'2'),S('R','platz',0,1,'3'),...T('L')], h2=[S('R','rueck',30,1,'2'),S('L','platz',0,1,'3'),...T('R')];
  const gs=[...h1,...h2];
  /* seitlich öffnen: kreuzSeit = New Yorker (vorwärts), kreuzSeitHinter = Hand to Hand (rückwärts) */
  const auf=(dir,sg,h)=>({
    steps:[S('L',dir,30,1,'2',-90*sg,h[0]),S('R','platz',0,1,'3',90*sg,h[0]),...H(T('L'),'offen'),
           S('R',dir,30,1,'2',90*sg,h[1]),S('L','platz',0,1,'3',-90*sg,h[1]),...H(T('R'),'offen')],
    dame:[S('R',dir,30,1,'2',90*sg),S('L','platz',0,1,'3',-90*sg),...T('R'),
          S('L',dir,30,1,'2',-90*sg),S('R','platz',0,1,'3',90*sg),...T('L')]});
  return {gs,T,
    ny:auf('kreuzSeit',1,['LR','RL']), hand:auf('kreuzSeitHinter',-1,['RL','LR']),
    solo:{steps:[...h1,S('R','rueck',30,1,'2',0,'hoch'),S('L','platz',0,1,'3',0,'hoch'),...T('R')],
          dame:[...spiegel(h1),S('L','vor',20,1,'2',-180),S('R','vor',20,1,'3',-180),...T('L')]},
    spot:{steps:[S('L','kreuz',18,1,'2',-180,'frei'),S('R','vor',18,1,'3',-180,'frei'),...H(T('L'),'offen'),
                 S('R','kreuz',18,1,'2',180,'frei'),S('L','vor',18,1,'3',180,'frei'),...H(T('R'),'offen')],
          dame:[S('R','kreuz',18,1,'2',180),S('L','vor',18,1,'3',180),...T('R'),
                S('L','kreuz',18,1,'2',-180),S('R','vor',18,1,'3',-180),...T('L')]}};
}
const c=latein(true), r=latein(false);

tanz('Cha-Cha-Cha',120,{
  b_c_gs:['Grundschritt',c.gs],
  b_c_offen:['Grundschritt in offener Haltung',H(c.gs,'offen')],
  b_c_lock:['Grundschritt mit Kreuz-Chassé (vor und rück)',[S('L','vor',30,1,'2'),S('R','platz',0,1,'3'),S('L','rueck',15,.5,'4'),S('R','kreuz',8,.5,'&'),S('L','rueck',15,1,'1'),
     S('R','rueck',30,1,'2'),S('L','platz',0,1,'3'),S('R','vor',15,.5,'4'),S('L','kreuzHinter',8,.5,'&'),S('R','vor',15,1,'1')]],
  b_c_ny:['New Yorker (rechts und links)',c.ny.steps,c.ny.dame],
  b_c_hand:['Hand to Hand (links und rechts)',c.hand.steps,c.hand.dame],
  b_c_solo:['Damendrehung rechts unter dem Arm',c.solo.steps,c.solo.dame],
  b_c_spot:['Platzdrehung (beide drehen solo)',c.spot.steps,c.spot.dame],
});

tanz('Rumba',100,{
  b_r_box:['Grundschritt',r.gs],
  b_r_cuca:['Seit-Wiegeschritt (Cucaracha)',[S('L','seit',25,1,'2'),S('R','platz',0,1,'3'),S('L','schliessen',0,2,'4'),S('R','seit',25,1,'2'),S('L','platz',0,1,'3'),S('R','schliessen',0,2,'4')]],
  b_r_geh:['Gehschritte vor und rück',[S('L','vor',28,1,'2'),S('R','vor',28,1,'3'),S('L','vor',28,2,'4'),S('R','rueck',28,1,'2'),S('L','rueck',28,1,'3'),S('R','rueck',28,2,'4')]],
  b_r_ny:['New Yorker (rechts und links)',r.ny.steps,r.ny.dame],
  b_r_hand:['Hand to Hand (links und rechts)',r.hand.steps,r.hand.dame],
  b_r_solo:['Damendrehung rechts unter dem Arm',r.solo.steps,r.solo.dame],
  b_r_spot:['Platzdrehung (beide drehen solo)',r.spot.steps,r.spot.dame],
});

/* Samba: „1 a 2“ = ¾, ¼, 1 Schlag */
const sa=(f,dir,len,mid)=>[S(f,dir,len,.75,'1'),S(O(f),mid,mid==='kreuzHinter'?8:0,.25,'a'),S(f,'platz',0,1,'2')];
const volta=f=>[1,2,3].flatMap(n=>[S(f,'kreuzSeit',15,.75,String(n)),S(O(f),'seit',10,.25,'a')]).concat([S(f,'kreuzSeit',15,1,'4')]);
tanz('Samba',100,{
  b_sa_gs:['Grundschritt (vor und rück)',[...sa('L','vor',22,'schliessen'),...sa('R','rueck',22,'schliessen')]],
  b_sa_seit:['Grundschritt seitlich',[...sa('L','seit',22,'schliessen'),...sa('R','seit',22,'schliessen')]],
  b_sa_wisch:['Wischer (links und rechts)',[...sa('L','seit',25,'kreuzHinter'),...sa('R','seit',25,'kreuzHinter')]],
  b_sa_volta:['Voltas (nach rechts und nach links)',[...volta('L'),...volta('R')]],
  b_sa_solo:['Damendrehung rechts im Wischer',
     [...H(sa('L','seit',25,'kreuzHinter'),'hoch'),...sa('R','seit',25,'kreuzHinter')],
     [S('R','seit',25,.75,'1',-180),S('L','seit',8,.25,'a',-180),S('R','platz',0,1,'2'),...sa('L','seit',25,'kreuzHinter')]],
});

/* Jive: Rock Step, dann zwei Chassés „3 a 4“ und „5 a 6“ */
const rock=[S('L','rueck',22,1,'1'),S('R','platz',0,1,'2')];
const jive=t=>[S('L','rueck',22,1,'1',t),S('R','platz',0,1,'2',t),S('L','seit',28,.75,'3',t),S('R','schliessen',0,.25,'a'),S('L','seit',14,1,'4',t),
              S('R','seit',28,.75,'5',t),S('L','schliessen',0,.25,'a'),S('R','seit',14,1,'6',t)];
const tripel=(f,c1,c2)=>[S(f,'platz',0,.75,c1),S(O(f),'platz',0,.25,'a'),S(f,'platz',0,1,c2)];
tanz('Jive',150,{
  b_j_gs:['Grundschritt (Rock Step, Chassé, Chassé)',jive(0)],
  b_j_dreh:['Grundschritt mit Linksdrehung',jive(18)],
  b_j_offen:['Grundschritt in offener Haltung',H(jive(0),'offen')],
  b_j_kicks:['Kicks am Platz',[S('L','kick',30,1,'1'),S('L','schliessen',0,1,'2'),S('R','kick',30,1,'3'),S('R','schliessen',0,1,'4')]],
  b_j_spin:['Damensolo am Platz (Rechtsdrehung)',
     [...rock,...H(tripel('L','3','4'),'hoch'),...H(tripel('R','5','6'),'offen')],
     [...spiegel(rock),S('R','vor',10,.75,'3',-180),S('L','vor',10,.25,'a',-180),S('R','platz',0,1,'4'),...tripel('L','5','6')]],
  b_j_pw:['Platzwechsel (Dame dreht links unter dem Arm)',
     [...rock,S('L','vor',35,.75,'3',0,'hoch'),S('R','schliessen',0,.25,'a',0,'hoch'),S('L','vor',35,1,'4',180,'hoch'),...H(tripel('R','5','6'),'LR')],
     [...spiegel(rock),S('R','diagVor',45,.75,'3'),S('L','schliessen',0,.25,'a'),S('R','diagVor',40,1,'4',180),...tripel('L','5','6')]],
});

/* Paso Doble: ein Schritt pro Schlag, beginnt rechts */
const n8=fn=>[1,2,3,4,5,6,7,8].map(n=>fn(n%2?'R':'L',String(n)));
tanz('Paso Doble',120,{
  b_pd_platz:['Sur Place (am Platz)',n8((f,c)=>S(f,'platz',0,1,c))],
  b_pd_marsch:['Grundschritt vorwärts',n8((f,c)=>S(f,'vor',25,1,c))],
  b_pd_rueck:['Grundschritt rückwärts',n8((f,c)=>S(f,'rueck',25,1,c))],
  b_pd_chasse:['Chassés nach rechts',n8((f,c)=>S(f,f==='R'?'seit':'schliessen',f==='R'?25:0,1,c))],
  b_pd_appel:['Appell und Attacke',[S('R','platz',0,1,'1'),S('L','vor',40,1,'2'),S('R','seit',25,1,'3'),S('L','schliessen',0,1,'4')]],
  b_pd_dreh:['Linksdrehung am Platz',n8((f,c)=>S(f,'platz',0,1,c,45))],
});
}
