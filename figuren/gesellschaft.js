/* Gesellschafts- und Partytänze: Foxtrott, Discofox, Blues, Rock'n'Roll, Polka */
{
tanz('Foxtrott',120,{
  b_f_gs:['Grundschritt (vor, vor, seit, schließen)',[S('L','vor',40,2,'S'),S('R','vor',40,2,'S'),S('L','seit',25,1,'Q'),S('R','schliessen',0,1,'Q')]],
  b_f_rueck:['Grundschritt rückwärts',[S('L','rueck',38,2,'S'),S('R','rueck',38,2,'S'),S('L','seit',25,1,'Q'),S('R','schliessen',0,1,'Q')]],
  b_f_wiege:['Wiegeschritt',[S('L','vor',35,2,'S'),S('R','platz',0,2,'S'),S('L','seit',25,1,'Q'),S('R','schliessen',0,1,'Q')]],
  b_f_links:['Linksdrehung (¼, im Wiegeschritt)',[S('L','vor',35,2,'S'),S('R','platz',0,2,'S',45),S('L','seit',25,1,'Q',45),S('R','schliessen',0,1,'Q')]],
  b_f_rechts:['Rechtsdrehung (¼, im Wiegeschritt)',[S('L','rueck',35,2,'S'),S('R','platz',0,2,'S',-45),S('L','seit',25,1,'Q',-45),S('R','schliessen',0,1,'Q')]],
  b_f_seit:['Seitschritte (seit, schließen)',[S('L','seit',25,1,'Q'),S('R','schliessen',0,1,'Q'),S('L','seit',25,1,'Q'),S('R','schliessen',0,1,'Q')]],
  b_f_prom:['Promenade',[S('L','seit',35,2,'S',0,'prom'),S('R','kreuzSeit',30,2,'S',0,'prom'),S('L','seit',28,1,'Q',0,'prom'),S('R','schliessen',0,1,'Q')]],
  b_f_kreuz:['Kreuzschritt A (seit, rechts kreuzt vorn)',[S('L','seit',30,2,'S'),S('R','kreuz',12,2,'S'),S('L','seit',28,1,'Q'),S('R','schliessen',0,1,'Q')]],
  b_f_kreuzh:['Kreuzschritt B (seit, rechts kreuzt hinten)',[S('L','seit',30,2,'S'),S('R','kreuzHinter',12,2,'S'),S('L','seit',28,1,'Q'),S('R','schliessen',0,1,'Q')]],
  b_f_lock:['Kreuzschritt C (vorwärts, rechts kreuzt hinten ein)',[S('L','vor',40,2,'S'),S('R','vor',40,2,'S'),S('L','vor',30,1,'Q'),S('R','kreuzHinter',10,1,'Q')]],
  b_f_solo:['Damendrehung rechts unter dem Arm',
     [S('L','platz',0,2,'S',0,'hoch'),S('R','platz',0,2,'S',0,'hoch'),S('L','seit',25,1,'Q'),S('R','schliessen',0,1,'Q')],
     [S('R','vor',8,2,'S',-180),S('L','vor',8,2,'S',-180),S('R','seit',25,1,'Q'),S('L','schliessen',0,1,'Q')]],
});

/* Discofox: Schritt, Schritt, Tap – der Tap-Fuß macht den nächsten Schritt */
const dfox=(t,h,third='tap')=>[S('L','vor',28,1,'1',t,h),S('R','vor',28,1,'2',t,h),S('L',third,third==='kick'?30:0,1,'3',0,h),
              S('L','rueck',28,1,'4',t,h),S('R','rueck',28,1,'5',t,h),S('L',third,third==='kick'?30:0,1,'6',0,h)];
/* Grundschritt, der rückwärts beginnt: zum Ausdrehen, der Herr gibt der Dame Platz */
const dfoxRueck=h=>[S('L','rueck',28,1,'1',0,h),S('R','rueck',28,1,'2',0,h),S('L','tap',0,1,'3',0,h),S('L','vor',28,1,'4',0,h),S('R','vor',28,1,'5',0,h),S('L','tap',0,1,'6',0,h)];
const amPlatz=[S('L','platz',0,1,'1',0,'hoch'),S('R','platz',0,1,'2',0,'hoch'),S('L','tap',0,1,'3',0,'LR')];
tanz('Discofox',120,{
  b_d_gs:['Grundschritt',dfox(0)],
  b_d_dreh:['Grundschritt mit Linksdrehung',dfox(30)],
  b_d_drehr:['Grundschritt mit Rechtsdrehung',dfox(-30)],
  b_d_offen:['Grundschritt in offener Haltung',dfox(0,'offen')],
  b_d_kick:['Grundschritt mit Kick',dfox(0,undefined,'kick')],
  b_d_seit:['Seitschritte links und rechts',[S('L','seit',25,1,'1'),S('R','schliessen',0,1,'2'),S('L','seit',25,1,'3'),S('R','tap',0,1,'4'),
     S('R','seit',25,1,'5'),S('L','schliessen',0,1,'6'),S('R','seit',25,1,'7'),S('L','tap',0,1,'8')]],
  b_d_kreuzh:['Grundschritt in Kreuzhandfassung',dfox(0,'kreuz')],
  b_d_korb:['Körbchen (eindrehen, mitgehen, ausdrehen)',[...dfox(0,'korb'),   // beim Ausdrehen geht der Herr zurück und gibt der Dame Platz, sonst müsste sie riesige Schritte machen
     ...dfoxRueck('LR')]],
  b_d_schatten:['Schattenposition (Dame vor dem Herrn)',[...dfox(0,'schatten'),...dfoxRueck('offen')]],
  b_d_solo:['Damensolo rechts (Drehung unter dem Arm)',amPlatz,[S('R','vor',20,1,'1',-180),S('L','vor',20,1,'2',-180),S('R','tap',0,1,'3')]],
  b_d_solol:['Damensolo links (Drehung unter dem Arm)',amPlatz,[S('R','vor',20,1,'1',180),S('L','vor',20,1,'2',180),S('R','tap',0,1,'3')]],
  b_d_doppel:['Doppelte Damendrehung rechts',amPlatz,[S('R','vor',20,1,'1',-360),S('L','rueck',20,1,'2',-360),S('R','tap',0,1,'3')]],
  b_d_herr:['Herrensolo (Linksdrehung)',
     [S('L','vor',15,1,'1',180,'frei'),S('R','vor',15,1,'2',180,'frei'),S('L','tap',0,1,'3',0,'offen')],
     [S('R','platz',0,1,'1'),S('L','platz',0,1,'2'),S('R','tap',0,1,'3')]],
  b_d_pw:['Platzwechsel (Dame dreht links unter dem Arm)',
     [S('L','kreuz',30,1,'1',0,'hoch'),S('R','vor',30,1,'2',180,'hoch'),S('L','tap',0,1,'3',0,'LR')],   // Herr weicht leicht nach rechts aus
     [S('R','diagVor',60,1,'1'),S('L','diagVor',60,1,'2',180),S('R','tap',0,1,'3')]],   // Dame geht im Bogen um den Herrn: schräg hinaus, schräg wieder herein
});

tanz('Blues',80,{
  b_bl_seit:['Grundschritt (seit, Tap)',[S('L','seit',25,1,'1'),S('R','tap',0,1,'2'),S('R','seit',25,1,'3'),S('L','tap',0,1,'4')]],
  b_bl_vor:['Vor – Tap, Rück – Tap',[S('L','vor',25,1,'1'),S('R','tap',0,1,'2'),S('R','rueck',25,1,'3'),S('L','tap',0,1,'4')]],
  b_bl_dreh:['Grundschritt mit Linksdrehung',[S('L','seit',25,1,'1',45),S('R','tap',0,1,'2'),S('R','seit',25,1,'3',45),S('L','tap',0,1,'4')]],
});

tanz("Rock'n'Roll",150,{
  b_rr_gs:['Grundschritt (Rück, Platz, Kick, Kick)',[S('L','rueck',20,1,'1'),S('R','platz',0,1,'2'),S('L','kick',30,1,'3'),S('L','schliessen',0,1,'4'),S('R','kick',30,1,'5'),S('R','schliessen',0,1,'6')]],
  b_rr_offen:['Grundschritt in offener Haltung',H([S('L','rueck',20,1,'1'),S('R','platz',0,1,'2'),S('L','kick',30,1,'3'),S('L','schliessen',0,1,'4'),S('R','kick',30,1,'5'),S('R','schliessen',0,1,'6')],'offen')],
});

const polka=t=>[S('L','vor',22,.5,'1',t),S('R','schliessen',0,.5,'&',t),S('L','vor',22,1,'2',t),S('R','vor',22,.5,'1',t),S('L','schliessen',0,.5,'&',t),S('R','vor',22,1,'2',t)];
tanz('Polka',120,{
  b_p_gs:['Polkaschritt vorwärts',polka(0)],
  b_p_dreh:['Polka mit Rechtsdrehung',polka(-30)],
  b_p_galopp:['Seitgalopp',[1,2,3,4].flatMap(n=>[S('L','seit',25,.5,String(n)),S('R','schliessen',0,.5,'&')])],
});
}
