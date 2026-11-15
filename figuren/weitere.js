/* Weitere Tänze: Boogie-Woogie, Tango Argentino, West Coast Swing (vereinfachte Tanzschul-Versionen) */
{
/* Boogie: Sechserschritt – Schritt-Tap, Schritt-Tap, Rück-Platz; in der Triple-Version statt Tap ein kleines Chassé */
const bt=t=>[S('L','seit',14,1,'1',t),S('R','tap',0,1,'2'),S('R','seit',14,1,'3',t),S('L','tap',0,1,'4'),S('L','rueck',20,1,'5',t),S('R','platz',0,1,'6',t)];
const tri=(f,c1,c2,t=0)=>[S(f,'seit',14,.75,c1,t),S(O(f),'schliessen',0,.25,'a'),S(f,'seit',10,1,c2,t)];
tanz('Boogie-Woogie',160,{
  b_bw_gs:['Grundschritt (Schritt-Tap, Schritt-Tap, Rück-Platz)',bt(0)],
  b_bw_dreh:['Grundschritt mit Rechtsdrehung',bt(-20)],
  b_bw_triple:['Grundschritt mit Triple-Steps',[...tri('L','1','2'),...tri('R','3','4'),S('L','rueck',20,1,'5'),S('R','platz',0,1,'6')]],
  b_bw_offen:['Grundschritt in offener Haltung (eine Hand)',H(bt(0),'LR')],
  b_bw_kick:['Kick-Schritt (Kick, Platz, Kick, Platz, Rück-Platz)',[S('L','kick',25,1,'1'),S('L','platz',0,1,'2'),S('R','kick',25,1,'3'),S('R','platz',0,1,'4'),S('L','rueck',20,1,'5'),S('R','platz',0,1,'6')]],
});

/* Tango Argentino: gegangen wird ruhig und gleichmäßig, jeder Schritt ein Schlag */
tanz('Tango Argentino',110,{
  b_ta_geh:['Caminata (Gehschritte vorwärts)',[S('L','vor',40,1,'1'),S('R','vor',40,1,'2'),S('L','vor',40,1,'3'),S('R','vor',40,1,'4')]],
  b_ta_salida:['Salida (Grundschritt, 8 Schritte)',[S('R','rueck',35,1,'1'),S('L','seit',35,1,'2'),{...S('R','vorAussen',38,1,'3'),tip:'Außenseitlich: rechts an der Dame vorbei'},S('L','vor',38,1,'4'),
     {...S('R','schliessen',0,1,'5'),tip:'Dame kreuzt den linken Fuß vor den rechten'},S('L','vor',35,1,'6'),S('R','seit',30,1,'7'),S('L','schliessen',0,1,'8')]],
  b_ta_baldosa:['Baldosa (Viereck)',[S('R','rueck',32,1,'1'),S('L','seit',32,1,'2'),S('R','vor',32,1,'3'),S('L','vor',32,1,'4'),S('R','seit',32,1,'5'),S('L','schliessen',0,1,'6')]],
  b_ta_cunita:['Cunita (Wiegeschritt mit Drehung)',[S('L','vor',28,1,'1',30),S('R','platz',0,1,'2',30),S('L','rueck',28,1,'3',30),S('L','halt',0,1,'')]],
  b_ta_cambio:['Cambio de peso (Gewichtswechsel am Platz)',[S('R','platz',0,1,'1'),S('R','halt',0,1,'')]],
  b_ta_pausa:['Seitschritt mit Pause',[S('L','seit',35,1,'1'),S('R','tap',0,1,'2'),S('R','halt',0,2,''),S('R','seit',35,1,'5'),S('L','tap',0,1,'6'),S('L','halt',0,2,'')]],
});

/* West Coast Swing: getanzt wird auf einer Linie („Slot“). Die Dame läuft vor und zurück, am Ende steht der Anker-Schritt am Platz */
const anker=(f,c1,c2)=>[S(f,'kreuzHinter',6,.5,c1),S(O(f),'platz',0,.5,'&'),S(f,'platz',0,1,c2)];
tanz('West Coast Swing',105,{
  b_wc_push:['Sugar Push (Grundschritt am Platz)',H([S('L','rueck',22,1,'1'),S('R','rueck',12,1,'2'),{...S('L','tap',0,1,'3'),tip:'Beide Hände bremsen die Dame – sie kommt heran und wird zurückgeschoben'},S('L','vor',40,1,'4'),...anker('R','5','6')],'offen')],
  b_wc_left:['Left Side Pass (Dame geht links vorbei)',
     [S('L','seit',35,1,'1',0,'LR'),S('R','schliessen',0,1,'2',45,'LR'),S('L','platz',0,.5,'3',45,'LR'),S('R','platz',0,.5,'&',45,'LR'),S('L','platz',0,1,'4',45,'LR'),...H(anker('R','5','6'),'LR')],
     [S('R','vor',40,1,'1'),S('L','vor',40,1,'2'),S('R','vor',30,.5,'3'),S('L','vor',15,.5,'&',90),S('R','rueck',15,1,'4',90),...anker('L','5','6')]],
  b_wc_turn:['Underarm Turn (Dame dreht rechts unter dem Arm)',
     [S('L','seit',35,1,'1',0,'LR'),S('R','kreuz',15,1,'2',-45,'hoch'),S('L','platz',0,.5,'3',-45,'hoch'),S('R','platz',0,.5,'&',-45,'hoch'),S('L','platz',0,1,'4',-45,'LR'),...H(anker('R','5','6'),'LR')],
     [S('R','vor',40,1,'1'),S('L','vor',40,1,'2'),S('R','vor',25,.5,'3',-90),S('L','vor',10,.5,'&',-135),S('R','rueck',15,1,'4',45),...anker('L','5','6')]],
});
}
