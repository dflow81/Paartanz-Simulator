/* Kursfiguren: ergänzt die Figuren, die in den üblichen Tanzschulkursen (Welttanzprogramm, Bronze, Silber, Gold) für
   Discofox, Langsamen Walzer, Tango, Cha-Cha-Cha, Rumba, Jive und Samba noch fehlten.
   Vereinfachte Darstellung: Die Engine kennt die Fassung (Haltung), aber keine einzelnen Arm- und Handbewegungen.
   Figuren, die vor allem von der Armführung leben (Brezel, Hammerlock, Schal, Tunnel), werden über Positionen,
   Drehungen und Führungshinweise gezeigt. Einordnung und Beschreibung stehen in figuren/info.js. */
{
/* ---------- Discofox: drei Schläge „Schritt, Schritt, Tap“ ---------- */
const z=(a,b,c)=>[a,b,c];                                  // Zählzeiten einer Hälfte
const Z1=z('1','2','3'), Z2=z('4','5','6'), Z3=z('7','8','9'), Z4=z('10','11','12');
const amPl=(Z,h,h2=h,tip)=>[{...S('L','platz',0,1,Z[0],0,h),...(tip?{tip}:{})},S('R','platz',0,1,Z[1],0,h),S('L','tap',0,1,Z[2],0,h2)];
const vorH=(Z,h,l=22)=>[S('L','vor',l,1,Z[0],0,h),S('R','vor',l,1,Z[1],0,h),S('L','tap',0,1,Z[2],0,h)];
const rueckH=(Z,h,l=22)=>[S('L','rueck',l,1,Z[0],0,h),S('R','rueck',l,1,Z[1],0,h),S('L','tap',0,1,Z[2],0,h)];
const herrDreh=(Z,t,h,h2=h,tip,l=12)=>[{...S('L','vor',l,1,Z[0],t/2,h),...(tip?{tip}:{})},S('R','vor',l,1,Z[1],t/2,h),S('L','tap',0,1,Z[2],0,h2)];
/* Dame (eigene Schritte): beginnt rechts */
const dDreh=(Z,t,l=18)=>[S('R','vor',l,1,Z[0],t/2),S('L','vor',l,1,Z[1],t/2),S('R','tap',0,1,Z[2])];
const dPlatz=Z=>[S('R','platz',0,1,Z[0]),S('L','platz',0,1,Z[1]),S('R','tap',0,1,Z[2])];
const dVor=(Z,l=22)=>[S('R','vor',l,1,Z[0]),S('L','vor',l,1,Z[1]),S('R','tap',0,1,Z[2])];
const dRueck=(Z,l=22)=>[S('R','rueck',l,1,Z[0]),S('L','rueck',l,1,Z[1]),S('R','tap',0,1,Z[2])];

tanz('Discofox',120,{
  b_d_pwr:['Platzwechsel (Dame dreht rechts unter dem Arm)',
     [S('L','diagVor',35,1,'1',0,'hoch'),S('R','diagVor',30,1,'2',-180,'hoch'),S('L','tap',0,1,'3',0,'LR')],   // Herr weicht nach links aus und dreht mit
     [S('R','kreuz',35,1,'1'),S('L','kreuzSeit',30,1,'2',-180),S('R','tap',0,1,'3')]],
  b_d_hegoes:['He Goes – She Goes (erst die Dame, dann der Herr wechselt den Platz)',
     [S('L','kreuz',30,1,'1',0,'hoch'),S('R','vor',30,1,'2',180,'hoch'),S('L','tap',0,1,'3',0,'LR'),
      {...S('L','diagVor',55,1,'4',0,'hoch'),tip:'He goes: Herr geht unter seinem linken Arm auf die andere Seite'},S('R','diagVor',55,1,'5',180,'hoch'),S('L','tap',0,1,'6',0,'LR')],
     [S('R','diagVor',60,1,'1'),S('L','diagVor',60,1,'2',180),S('R','tap',0,1,'3'),
      S('R','kreuz',30,1,'4'),S('L','vor',30,1,'5',180),S('R','tap',0,1,'6')]],
  b_d_tunnel:['Tunnel (Dame und Herr drehen unter beiden Armen)',
     [...amPl(Z1,'hochB','hochB','Beide Arme hoch – die Dame dreht rechts durch den Tunnel'),...herrDreh(Z2,360,'hochB','offen','Herr dreht links unter beiden Armen')],
     [...dDreh(Z1,-360),...dPlatz(Z2)]],
  b_d_hammer:['Hammerlock (Dame links eingewickelt, Arm hinter dem Rücken)',
     [...amPl(Z1,'hoch','hammer','Dame links eindrehen – ihr rechter Arm wird hinter ihren Rücken gewickelt'),...rueckH(Z2,'hammer'),
      ...amPl(Z3,'hoch','LR','Arm lösen – Dame rechts ausdrehen'),...vorH(Z4,'LR')],
     [...dDreh(Z1,360),...dVor(Z2),...dDreh(Z3,-360),...dRueck(Z4)]],
  b_d_schal:['Schal (Herr dreht rechts, ihr Arm liegt wie ein Schal um seinen Hals)',
     [...herrDreh(Z1,-180,'LR','schal','Herr dreht rechts – ihre rechte Hand gleitet über seine Schulter (Schal)'),...vorH(Z2,'schal',18),
      ...herrDreh(Z3,-180,'schal','LR','Herr dreht weiter rechts zurück zur Dame'),...rueckH(Z4,'LR',18)],
     [...dPlatz(Z1),...dVor(Z2,18),...dPlatz(Z3),...dVor(Z4,18)]],
  b_d_brezel:['Brezel (Körbchen, Herr dreht rechts hinein, beide drehen wieder auf)',
     [...amPl(Z1,'hoch','korb','Dame links ins Körbchen eindrehen'),...herrDreh(Z2,-180,'korb','brezel','Herr dreht rechts unter seinem linken Arm – Brezel: beide Arme verschränkt',4),
      ...herrDreh(Z3,180,'brezel','korb','Herr dreht links zurück, die Arme lösen sich',4),...amPl(Z4,'hoch','LR','Dame rechts aus dem Körbchen ausdrehen')],
     [S('R','vor',30,1,'1'),S('L','seit',40,1,'2',180),S('R','tap',0,1,'3'),...dPlatz(Z2),...dPlatz(Z3),S('R','vor',38,1,'10'),S('L','seit',40,1,'11',-180),S('R','tap',0,1,'12')]],
  b_d_schulter:['Schulterfasser (Grundschritt in Schulterfassung)',[...amPl(Z1,'hoch','schulter','Dame legt beide Hände auf seine Schultern, er fasst sie an der Taille'),...vorH(Z2,'schulter',18),...rueckH(Z3,'schulter',18),...amPl(Z4,'LR','LR','Hände lösen, zurück in die offene Haltung')]],
  b_d_zu:['Rückführung in die geschlossene Haltung',[...rueckH(Z1,'LR'),{...S('L','vor',22,1,'4',0,'zu'),tip:'Dame heranführen – zurück in die geschlossene Haltung'},S('R','vor',22,1,'5'),S('L','tap',0,1,'6')]],
});

/* ---------- Langsamer Walzer ---------- */
const nat3=[S('R','vor',38,1,'1',-45),S('L','seit',24,1,'2',-45),S('R','schliessen',0,1,'3',-45)];   // erste Hälfte der Rechtsdrehung
tanz('Langsamer Walzer',90,{
  b_w_impetus:['Rechtsdrehung mit Impetus (Closed Impetus)',[...nat3,{...S('L','rueck',35,1,'4',-90),tip:'Impetus: auf dem linken Fuß rückwärts, dann Fersendrehung'},S('R','ferse',0,1,'5',-90),S('L','diagRueck',25,1,'6')]],
  b_w_kchasse:['Rechtskreisel mit Chassé',[...nat3,{...S('L','rueck',32,1,'4',-90),tip:'Kreisel: auf dem linken Fuß eine halbe Drehung nach rechts'},S('R','vor',22,1,'5',-90),S('L','diagRueck',26,1,'6',-45),
     S('R','rueck',30,1,'1'),S('L','seit',22,.5,'2'),S('R','schliessen',0,.5,'&'),S('L','seit',24,1,'3')]],
});

/* ---------- Tango ---------- */
tanz('Tango',128,{
  b_t_rechts:['Rechtsdrehung aus der Promenade',[S('L','seit',38,2,'S',0,'prom'),{...S('R','vor',32,1,'Q',-90),tip:'Herr dreht vor der Dame nach rechts – zurück in die geschlossene Haltung'},
     S('L','seit',28,1,'Q',-45),S('R','rueck',30,2,'S',-45)]],
  b_t_fuenf:['Fünferschritt (Five Step)',[S('L','vor',32,1,'Q'),S('R','seit',22,1,'Q'),S('L','rueck',28,1,'Q'),S('R','rueck',15,1,'Q'),
     {...S('L','tapSeit',25,2,'S',0,'prom'),tip:'Kopf zur Promenade, der linke Fuß zeigt zur Seite (ohne Gewicht)'}]],
  b_t_aussen:['Außenseitiger Wechsel (mit Gehschritt)',[S('L','rueck',30,1,'Q'),S('R','rueck',25,1,'Q'),S('L','seit',28,2,'S',-45),{...S('R','vorAussen',35,2,'S'),tip:'Außenseitlich: rechts an der Dame vorbei'}]],
});

/* ---------- Cha-Cha-Cha und Rumba ---------- */
const lat=cha=>{
  const T=f=>cha?[S(f,'seit',12,.5,'4'),S(O(f),'schliessen',0,.5,'&'),S(f,'seit',12,1,'1')]:[S(f,'seit',25,2,'4')];
  const TB=(f,t=0)=>cha?[S(f,'rueck',12,.5,'4',t),S(O(f),'schliessen',0,.5,'&'),S(f,'rueck',12,1,'1')]:[S(f,'rueck',25,2,'4',t)];
  const TV=f=>cha?[S(f,'vor',14,.5,'4'),S(O(f),'schliessen',0,.5,'&'),S(f,'vor',14,1,'1')]:[S(f,'vor',28,2,'4')];
  const TP=f=>cha?[S(f,'schliessen',0,.5,'4'),S(O(f),'platz',0,.5,'&'),S(f,'platz',0,1,'1')]:[S(f,'schliessen',0,2,'4')];
  return {
    /* Offener Hip Twist: aus der offenen Haltung (eine Hand) holt der Herr die Dame heran, sie dreht sich auf und geht in den Fächer */
    hip:{steps:[...H([S('L','vor',12,1,'2'),S('R','platz',0,1,'3'),...TP('L')],'LR'),...H([S('R','rueck',12,1,'2'),S('L','platz',0,1,'3'),...T('R')],'faecher')],
         dame:[S('R','rueck',25,1,'2'),S('L','platz',0,1,'3'),...TV('R'),{...S('L','vor',10,1,'2',-45),tip:'Dame dreht auf (Hip Twist) und geht in den Fächer'},S('R','diagVor',40,1,'3',90),...TB('L',45)]},
    /* Opening Out: der Herr schließt am Platz, die Dame öffnet sich mit einer Vierteldrehung nach rechts bzw. links nach außen */
    open:{steps:[S('L','seit',12,1,'2',0,'RL'),S('R','platz',0,1,'3',0,'RL'),...H(TP('L'),'zu'),S('R','seit',12,1,'2',0,'LR'),S('L','platz',0,1,'3',0,'LR'),...H(TP('R'),'zu')],
          dame:[S('R','rueck',25,1,'2',-90),S('L','platz',0,1,'3',90),...TP('R'),S('L','rueck',25,1,'2',90),S('R','platz',0,1,'3',-90),...TP('L')]},
  };
};
const c=lat(true), r=lat(false);
tanz('Cha-Cha-Cha',120,{
  b_c_hip:['Offener Hip Twist (in den Fächer)',c.hip.steps,c.hip.dame],
  b_c_open:['Opening Out (rechts und links)',c.open.steps,c.open.dame],
});
tanz('Rumba',100,{
  b_r_hip:['Offener Hip Twist (in den Fächer)',r.hip.steps,r.hip.dame],
  b_r_open:['Opening Out (rechts und links)',r.open.steps,r.open.dame],
});

/* ---------- Jive ---------- */
const rock=[S('L','rueck',22,1,'1'),S('R','platz',0,1,'2')];
const tri=(f,c1,c2,l=0,dir='platz')=>[S(f,l?dir:'platz',l,.75,c1),S(O(f),'schliessen',0,.25,'a'),S(f,'platz',0,1,c2)];
tanz('Jive',150,{
  b_j_pwrl:['Platzwechsel rechts nach links (Dame dreht rechts unter dem Arm)',
     [...rock,S('L','vor',10,.75,'3',45,'hoch'),S('R','schliessen',0,.25,'a',0,'hoch'),S('L','platz',0,1,'4',45,'hoch'),...H(tri('R','5','6'),'LR')],   // Herr dreht ¼ links, die Dame ¾ rechts
     [S('R','rueck',22,1,'1'),S('L','platz',0,1,'2'),S('R','diagVor',45,.75,'3',-90),S('L','vor',22,.25,'a',-90),{...S('R','kreuzSeit',15,1,'4',-90),tip:'Dame dreht rechts unter seiner erhobenen Hand'},...tri('L','5','6')]],
  b_j_amspin:['American Spin (Dame dreht ganz rechts)',
     [...H(rock,'LR'),...H(tri('L','3','4'),'LR'),{...S('R','platz',0,.75,'5',0,'frei'),tip:'Herr gibt Schwung und lässt los – die Dame dreht'},S('L','schliessen',0,.25,'a',0,'frei'),S('R','platz',0,1,'6',0,'LR')],
     [S('R','rueck',22,1,'1'),S('L','platz',0,1,'2'),S('R','vor',20,.75,'3'),S('L','schliessen',0,.25,'a'),S('R','vor',10,1,'4'),S('L','platz',0,.75,'5',-180),S('R','schliessen',0,.25,'a',-180),S('L','rueck',12,1,'6')]],
  b_j_stopgo:['Stop and Go (Dame dreht ein, Stopp, dreht aus)',
     [...H(rock,'LR'),...H(tri('L','3','4',20,'vor'),'korb'),{...S('R','platz',0,1,'5',0,'korb'),tip:'Stopp: seine rechte Hand hält die Dame an ihrem Rücken'},S('L','platz',0,1,'6',0,'korb'),...H(tri('R','7','8'),'LR')],
     [S('R','rueck',22,1,'1'),S('L','platz',0,1,'2'),S('R','vor',34,.75,'3'),{...S('L','seit',35,.25,'a',180),tip:'Dame dreht links ein, an seine rechte Seite'},S('R','platz',0,1,'4'),
      S('L','vor',18,1,'5'),S('R','platz',0,1,'6'),S('L','vor',62,.75,'7',-180),S('R','schliessen',0,.25,'a'),S('L','platz',0,1,'8')]],
});

/* Stop and Go hängt stark davon ab, wie weit die Dame am Anfang entfernt steht: über die ganze Figur nachführen */
BUILTIN.b_j_stopgo.ganz=true;

/* ---------- Samba ---------- */
tanz('Samba',100,{
  b_sa_pbota:['Promenaden-Botafogos',[S('L','vor',22,.75,'1',-45,'prom'),S('R','seit',15,.25,'a',0,'prom'),S('L','platz',0,1,'2',0,'prom'),
     {...S('R','vor',22,.75,'1',90,'RL'),tip:'Gegenpromenade: beide öffnen sich zur anderen Seite'},S('L','seit',15,.25,'a',0,'RL'),S('R','platz',0,1,'2',-45,'zu')]],
  b_sa_swalk:['Samba-Walks in der Promenade',[S('L','vor',25,.75,'1',0,'prom'),S('R','rueck',8,.25,'a',0,'prom'),S('L','platz',0,1,'2',0,'prom'),
     S('R','vor',25,.75,'1',0,'prom'),S('L','rueck',8,.25,'a',0,'prom'),{...S('R','platz',0,1,'2'),tip:'zurück in die geschlossene Haltung'}]],
});
}
