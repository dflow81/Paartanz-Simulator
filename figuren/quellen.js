/* Mit Quelle abgeglichene Lehrplanfiguren: ersetzen die schematischen Fassungen aus figuren/lehrplan.js.
   Quelle: BallroomGuide (Djurre de Boer, http://dance.djurredeboer.nl/), Schritttabellen für Herr und Dame, abgerufen am 2026-11-23.
   Übernommen werden Fuß, Richtung, Zählung, Drehung und Position. Schrittlängen sind geschätzt, Drehungen „zwischen zwei Schritten“
   liegen auf dem folgenden Schritt. Positionen ohne eigene Haltung in der Engine: Tandem und Seitposition → Schatten,
   Gegenpromenade → Promenade. Nach dem Abgleich verlieren die Figuren das Kennzeichen „schematisch“. */
const QUELLE_GEPRUEFT=[];
{
const Q='http://dance.djurredeboer.nl/';
const belegt=(id,pfad)=>{ QUELLEN[id]=Q+pfad; QUELLE_GEPRUEFT.push(id); if(INFO[id]) INFO[id]=INFO[id].slice(0,3); };
const tip=(st,t)=>({...st,tip:t});

/* ---------- Jive ---------- */
tanz('Jive',150,{
  /* Toe Heel Swivels (Gold): aus der offenen Haltung mit beiden Händen; Spitze tippen, Ferse seitlich tippen, vor und kreuzen –
     jeweils auf dem Standfuß gedreht, abwechselnd Gegenpromenade und Promenade. Zählung 1 2 3 4 12 3 4 12 3 4 1 2 3 4 (16 Schläge). */
  b_j_toeheel:['Toe Heel Swivels',
    [S('L','rueck',20,1,'1',0,'offen'),S('R','platz',0,1,'2',0,'offen'),
     tip(S('L','tap',0,1,'3',-45,'offen'),'Auf dem rechten Fuß drehen, linke Spitze ohne Gewicht schließen'),tip(S('L','tapSeit',15,1,'4',90,'prom'),'Linke Ferse seitlich ohne Gewicht'),S('L','kreuz',15,2,'1',-90,'offen'),
     S('R','tap',0,1,'3',90,'offen'),S('R','tapSeit',15,1,'4',-90,'prom'),S('R','kreuz',15,2,'1',90,'offen'),
     S('L','tap',0,1,'3',-90,'offen'),S('L','tapSeit',15,1,'4',90,'prom'),S('L','kreuz',15,1,'1',-90,'offen'),
     S('R','tap',0,1,'2',90,'offen'),S('R','tapSeit',15,1,'3',-90,'prom'),S('R','kreuz',15,1,'4',90,'prom')],
    [S('R','rueck',20,1,'1',-45),S('L','platz',0,1,'2'),
     S('R','tap',0,1,'3',90),S('R','tapSeit',15,1,'4',-90),S('R','kreuz',15,2,'1',90),
     S('L','tap',0,1,'3',-90),S('L','tapSeit',15,1,'4',90),S('L','kreuz',15,2,'1',-90),
     S('R','tap',0,1,'3',90),S('R','tapSeit',15,1,'4',-90),S('R','kreuz',15,1,'1',90),
     S('L','tap',0,1,'2',-90),S('L','tapSeit',15,1,'3',90),S('L','kreuz',15,1,'4',-90)]],
});
belegt('b_j_toeheel','latin/jive/toe_heel.html');

/* ---------- Rumba ---------- */
tanz('Rumba',100,{
  /* Three Threes (Gold), Ende geschlossen: Der Herr tanzt fast am Platz (Checked Forward Walk, dann Schließen und Seitschritte),
     die Dame steht im Tandem vor ihm und dreht ½ rechts, eine ganze Drehung links und 1½ rechts. Zählung 2 3 4-1. */
  b_r_drei3:['Three Threes (drei Damendrehungen)',
    [tip(S('L','vor',15,1,'2',0,'LR'),'Checked Forward Walk: der Herr führt die Dame vor sich'),S('R','platz',0,1,'3',0,'LR'),S('L','schliessen',0,2,'4',0,'schatten'),
     S('R','seit',12,1,'2',0,'schatten'),S('L','platz',0,1,'3',0,'schatten'),S('R','schliessen',0,2,'4',0,'schatten'),
     S('L','seit',12,1,'2',0,'schatten'),S('R','platz',0,1,'3',0,'schatten'),S('L','schliessen',0,2,'4',0,'schatten'),
     S('R','rueck',18,1,'2',0,'schatten'),S('L','seit',18,1,'3',0,'schatten'),tip(S('R','vor',20,2,'4',0,'zu'),'Vor zur rechten Seite der Dame, geschlossen enden')],
    [S('R','rueck',15,1,'2'),S('L','platz',0,1,'3'),tip(S('R','vor',40,2,'4'),'Die Dame geht vor, dann ½ Rechtsdrehung in den Tandem vor dem Herrn'),
     S('L','schliessen',0,1,'2',-180),S('R','platz',0,1,'3'),tip(S('L','platz',0,2,'4',360),'Eine ganze Linksdrehung auf dem linken Fuß'),
     S('R','diagRueck',15,1,'2'),S('L','platz',0,1,'3'),S('R','kreuz',15,2,'4'),
     tip(S('L','vor',20,1,'2',-315),'Vorwärtsschritt mit Rechtsdrehung, endet rück und etwas seitlich'),S('R','platz',0,1,'3'),S('L','vor',20,2,'4',-225)]],
});
belegt('b_r_drei3','latin/rumba/three_threes.html');

/* ---------- Jive (weitere) ---------- */
const chs=(f,dir,len,c1,c2,t=0,h,dir2=dir)=>[S(f,dir,len,.75,c1,0,h),S(f==='L'?'R':'L','schliessen',0,.25,'a',0,h),S(f,dir2,len,1,c2,t,h)];   // Chassé „3 a 4“, Drehung auf dem dritten Schritt
tanz('Jive',150,{
  b_j_link:['Link (aus der offenen Haltung zurück in die geschlossene)',[S('L','rueck',20,1,'1',0,'LR'),S('R','platz',0,1,'2',0,'LR'),
    ...chs('L','vor',12,'3','4',0,'zu'),...chs('R','seit',14,'1','2',0,'zu')]],
  /* Simple Spin: der Herr tritt am Platz und lässt los, die Dame dreht auf dem rechten Fuß eine ganze Rechtsdrehung (2 Schläge) */
  b_j_simplespin:['Simple Spin (Dame dreht ganz rechts)',[tip(S('L','schliessen',0,1,'1',0,'frei'),'Herr schließt am Platz und lässt die Hand los'),S('R','platz',0,1,'2',0,'LR')],
    [tip(S('R','vor',8,1,'1',-360),'Simple Spin: auf dem rechten Fuß eine ganze Rechtsdrehung'),S('L','seit',10,1,'2')]],
  /* Miami Special (Rechts-in-rechts-Fassung, hier als Hand R–L dargestellt): Die Dame dreht unter dem Arm links herum hinter ihn,
     ihre Hand gleitet über seinen Nacken; der Herr dreht ½ rechts mit. In der Quelle stehen die Herrenschritte 6–8 mit dem falschen Fuß – hier rechts, links, rechts. */
  b_j_miami:['Miami Special',[S('L','rueck',20,1,'1',0,'RL'),S('R','platz',0,1,'2',0,'RL'),S('L','vor',12,.75,'3',0,'hoch'),S('R','schliessen',0,.25,'a',0,'hoch'),
    tip(S('L','seit',35,1,'4',-90,'schal'),'Seine rechte Hand liegt hinter seinem Kopf, ihre Hand gleitet über seine Schulter'),S('R','rueck',8,.75,'1',-90,'LR'),S('L','schliessen',0,.25,'a',0,'LR'),S('R','rueck',8,1,'2',0,'LR')],
    [S('R','rueck',20,1,'1'),S('L','platz',0,1,'2'),S('R','vor',15,.75,'3',45),S('L','schliessen',0,.25,'a'),tip(S('R','vor',20,1,'4',135),'Die Dame geht links herum hinter den Herrn'),
     S('L','rueck',8,.75,'1'),S('R','schliessen',0,.25,'a'),S('L','rueck',8,1,'2')]],
  /* Rolling off the Arm (Fassung rechts in links): Drehchassé in die Schattenstellung, Kreuz und Seitschritt mit je ¼ rechts, Vorwärtschassé zurück in die offene Haltung */
  b_j_rolloff:['Rolling off the Arm',[S('L','rueck',20,1,'1',0,'RL'),S('R','platz',0,1,'2',0,'RL'),S('L','diagVor',15,.75,'3',0,'RL'),S('R','schliessen',0,.25,'a',0,'RL'),S('L','seit',15,1,'4',-90,'schatten'),
    S('R','kreuzHinter',10,1,'1',-90,'schatten'),S('L','seit',15,1,'2',-90,'schatten'),...chs('R','vor',15,'3','4',-45,'RL')],
    [S('R','rueck',20,1,'1'),S('L','platz',0,1,'2'),S('R','vor',15,.75,'3'),S('L','schliessen',0,.25,'a'),tip(S('R','vor',15,1,'4',90),'Die Dame rollt vom Arm ab, endet rück und etwas seitlich'),
     S('L','rueck',15,1,'1',-90),S('R','rueck',15,1,'2',-90),S('L','diagRueck',15,.75,'3',-180),S('R','schliessen',0,.25,'a'),S('L','rueck',15,1,'4',-45)]],
  /* Spanish Arms (beide Hände): zweimal Rock und Chassés; die Dame dreht im Tandem erst links, dann rechts, beim zweiten Mal mit Dreischrittdrehung */
  b_j_spanish:['Spanish Arms',[S('L','rueck',20,1,'1',0,'offen'),S('R','platz',0,1,'2',0,'offen'),...chs('L','vor',12,'3','4',-45,'hochB','diagVor'),...chs('R','vor',12,'1','2',-90,'offen'),
    S('L','rueck',20,1,'3',0,'offen'),S('R','platz',0,1,'4',0,'offen'),...chs('L','vor',12,'1','2',-45,'hochB','diagVor'),...chs('R','vor',6,'3','4',-90,'offen')],
    [S('R','rueck',20,1,'1'),S('L','platz',0,1,'2'),tip(S('R','vor',15,.75,'3',135),'Spanish Arms: die Dame dreht links unter den gefassten Händen …'),S('L','schliessen',0,.25,'a'),tip(S('R','diagRueck',15,1,'4',-135),'… und wieder rechts zurück'),
     S('L','diagRueck',12,.75,'1'),S('R','schliessen',0,.25,'a'),S('L','rueck',12,1,'2',-135),
     S('R','rueck',20,1,'3'),S('L','platz',0,1,'4'),S('R','vor',15,.75,'1',135),S('L','schliessen',0,.25,'a'),S('R','diagRueck',15,1,'2',-270),
     tip(S('L','seit',10,.75,'3',-120),'Dreischrittdrehung am Platz, eine ganze Rechtsdrehung'),S('R','platz',0,.25,'a',-120),S('L','seit',10,1,'4',-120)]],
});
BUILTIN.b_j_miami.ganz=true;   // die Dame geht hinter dem Herrn herum: Anfangsabstand ganz ausgleichen
belegt('b_j_link','latin/jive/link.html'); belegt('b_j_simplespin','latin/jive/simple_spin.html'); belegt('b_j_miami','latin/jive/miami_special.html');
belegt('b_j_rolloff','latin/jive/rolling_off_arm.html'); belegt('b_j_spanish','latin/jive/spanish_arms.html');

/* ---------- Samba ---------- */
tanz('Samba',100,{
  /* Corta Jaca (Bronze): ohne Samba-Federung; S vor, dann Fersen- und Spitzenschritte mit kleinem Gleitschritt (Slip) */
  b_sa_cjaca:['Corta Jaca',[S('R','vor',25,1,'1'),S('L','vor',10,.5,'1'),tip(S('R','schliessen',0,.5,'2'),'Kleiner Gleitschritt (Slip)'),S('L','rueck',10,.5,'1'),S('R','schliessen',0,.5,'2'),S('L','vor',10,.5,'1'),S('R','schliessen',0,.5,'2'),
    S('L','rueck',25,1,'1'),S('R','rueck',10,.5,'1'),S('L','schliessen',0,.5,'2'),S('R','vor',10,.5,'1'),S('L','schliessen',0,.5,'2'),S('R','rueck',10,.5,'1'),S('L','schliessen',0,.5,'2')]],
  /* Argentine Crosses (Silber): zweimal eine ganze Rechtsdrehung mit Latin Cross, Rhythmus Q Q S */
  b_sa_argcross:['Argentine Crosses',[...[0,1].flatMap(()=>[S('L','seit',18,.5,'1',-45),S('R','kreuzHinter',10,.5,'&',-45),S('L','seit',18,1,'2',-90),S('R','kreuz',10,.5,'1',-45),S('L','seit',14,.5,'&',-45),S('R','kreuz',10,1,'2',-90)])],
    [...[0,1].flatMap(()=>[S('R','kreuz',10,.5,'1',-45),S('L','seit',14,.5,'&',-45),S('R','kreuz',10,1,'2',-90),S('L','seit',18,.5,'1',-45),S('R','kreuzHinter',10,.5,'&',-45),S('L','seit',18,1,'2',-90)])]],
  /* Maypole nach links (Silber): der Herr geht mit Latin Cross eine ganze Linksdrehung um die Dame, die unter seinem Arm Volta-Drehungen am Platz tanzt */
  b_sa_maypole:['Maypole',[S('L','kreuz',10,.75,'1',90,'hoch'),S('R','seit',8,.25,'a',45,'hoch'),S('L','kreuz',10,.75,'2',45,'hoch'),S('R','seit',8,.25,'a',45,'hoch'),S('L','kreuz',10,.75,'1',45,'hoch'),S('R','seit',8,.25,'a',45,'hoch'),S('L','kreuz',10,1,'2',45,'zu')],
    [tip(S('R','kreuz',6,.75,'1',-180),'Maypole: die Dame dreht Voltas am Platz unter seinem Arm'),S('L','seit',5,.25,'a'),S('R','kreuz',6,.75,'2',-180),S('L','seit',5,.25,'a'),S('R','kreuz',6,.75,'1',-180),S('L','seit',5,.25,'a'),S('R','kreuz',6,1,'2',-180)]],
  /* Natural Roll (Gold): eine ganze Rechtsdrehung, ohne Federung, S Q Q S Q Q */
  b_sa_nroll:['Natural Roll (Rechtsrollen)',[S('R','vor',25,1,'1',-45),S('L','seit',20,.5,'2',-90),S('R','schliessen',0,.5,'&',-45),S('L','rueck',25,1,'1',-45),S('R','seit',20,.5,'2',-90),tip(S('L','schliessen',0,.5,'&',-45),'Der Körper vollendet die Drehung')]],
});
belegt('b_sa_cjaca','latin/samba/corta_jaca.html'); belegt('b_sa_argcross','latin/samba/argentine_crosses.html'); belegt('b_sa_maypole','latin/samba/maypole.html'); belegt('b_sa_nroll','latin/samba/natural_roll.html');

/* ---------- Paso Doble ---------- */
tanz('Paso Doble',120,{
  /* Separation (Grundform 1–8): Appell, vor, schließen; der Herr bleibt am Platz, die Dame geht zwei Schritte zurück und vier vor */
  b_pd_sep:['Separation',[tip(S('R','platz',0,1,'1'),'Appell'),S('L','vor',20,1,'2'),S('R','schliessen',0,1,'3',0,'LR'),S('L','platz',0,1,'4',0,'LR'),S('R','platz',0,1,'5',0,'LR'),S('L','platz',0,1,'6',0,'LR'),S('R','platz',0,1,'7',0,'LR'),S('L','platz',0,1,'8')],
    [S('L','platz',0,1,'1'),S('R','rueck',25,1,'2'),tip(S('L','rueck',25,1,'3'),'Separation: die Dame geht vom Herrn weg …'),S('R','schliessen',0,1,'4'),tip(S('L','vor',10,1,'5'),'… und mit vier Schritten wieder heran'),S('R','vor',10,1,'6'),S('L','vor',10,1,'7'),S('R','vor',8,1,'8')]],
  /* Twist Turn (Silber): Promenade, ⅜ rechts, rechter Fuß kreuzt hinter, Twist ½ rechts auf beiden Füßen; die Dame geht außen herum */
  b_pd_twist:['Twist Turn',[tip(S('R','platz',0,1,'1'),'Appell'),S('L','seit',20,1,'2',45,'prom'),S('R','kreuz',10,1,'3',0,'prom'),S('L','seit',15,1,'4',-135),tip(S('R','kreuzHinter',10,1,'5'),'Der rechte Fuß kreuzt hinter den linken'),
    tip(S('L','platz',0,1,'6',-180),'Twist: auf beiden Füßen ½ nach rechts aufdrehen, Gewicht links'),S('R','seit',15,1,'7',0,'prom'),S('L','schliessen',0,1,'8',0,'prom')],
    [S('L','platz',0,1,'1'),S('R','seit',20,1,'2',-45),S('L','kreuz',10,1,'3',-45),S('R','vor',20,1,'4'),S('L','vor',20,1,'5',-45),S('R','vorAussen',20,1,'6',-45),S('L','seit',15,1,'7',-90),S('R','schliessen',0,1,'8')]],
  /* Coup de Pique (Methode 1): Spitze ohne Gewicht vor und kreuzen, schließen, Fallaway, schließen, Gewicht zurück */
  b_pd_coup:['Coup de Pique',[tip(S('R','tap',15,1,'1',45,'prom'),'Coup de Pique: rechte Spitze ohne Gewicht vor und über Kreuz'),S('R','schliessen',0,1,'2',-45),S('L','rueck',15,1,'3',45,'prom'),S('R','schliessen',0,.5,'&',-45),S('L','platz',0,.5,'4')]],
  /* Flamenco Taps (Methode 1): aus der spanischen Linie, ohne Fassung; beide tanzen dieselben Schritte mit dem anderen Fuß */
  b_pd_flamenco:['Flamenco Taps',[S('L','platz',0,1,'1',0,'frei'),tip(S('R','tapRueck',0,.5,'2',0,'frei'),'Rechte Spitze zweimal hinter der linken Ferse tippen'),S('R','tapRueck',0,.5,'&',0,'frei'),S('R','rueck',10,1,'3',0,'frei'),tip(S('L','tap',10,1,'4',0,'frei'),'Zurück in die spanische Linie')],
    [S('R','platz',0,1,'1'),S('L','tapRueck',0,.5,'2'),S('L','tapRueck',0,.5,'&'),S('L','rueck',10,1,'3'),S('R','tap',10,1,'4')]],
});
belegt('b_pd_sep','latin/paso/separation.html'); belegt('b_pd_twist','latin/paso/twist_turn.html');
belegt('b_pd_coup','latin/paso/coup_de_pique.html'); belegt('b_pd_flamenco','latin/paso/flamenco_taps.html');

/* ---------- Rumba und Cha-Cha-Cha ---------- */
/* Rope Spinning: die Dame dreht unter seinem Arm und geht dann mit Vorwärtsschritten ganz um den Herrn herum (zusammen zwei Rechtsdrehungen) */
const ropeD=(rumba)=>{ const v=(f,t,d,c,l=d>=1?30:15)=>S(f,'vor',l,d,c,t), auf=tip(S('R','vor',5,1,'2',-270),'Rope Spinning: die Dame dreht ¾ rechts unter seinem Arm und geht dann im Bogen um ihn herum');
  // Die Drehung unter dem Arm (⅞) und das Herumgehen (⅝ und ½) sind so verteilt, dass der Herr im Mittelpunkt ihres Bogens steht; zusammen zwei Rechtsdrehungen
  return rumba?[auf,v('L',-90,1,'3'),v('R',-90,2,'4',30),v('L',-90,1,'2'),v('R',-90,1,'3'),v('L',-90,2,'4',30)]
    :[auf,v('L',-50,1,'3'),v('R',-50,.5,'4'),S('L','kreuzHinter',15,.5,'&',-50),v('R',-50,1,'1'),v('L',-50,1,'2'),v('R',-50,1,'3'),v('L',-50,.5,'4'),S('R','kreuzHinter',15,.5,'&',-50),v('L',-50,1,'1')]; };
tanz('Rumba',100,{
  b_r_rope:['Rope Spinning',[S('L','seit',12,1,'2',0,'hoch'),S('R','platz',0,1,'3',0,'hoch'),S('L','schliessen',0,2,'4',0,'hoch'),S('R','rueck',15,1,'2',0,'hoch'),S('L','seit',15,1,'3',0,'hoch'),S('R','kreuz',15,2,'4',0,'zu')],ropeD(true)],
  /* Fencing (Gold) aus dem Fächer: Ausfall über Kreuz in der offenen Promenade, zurück in die geschlossene Haltung */
  b_r_fence:['Fencing',[S('L','vor',15,1,'2',0,'faecher'),S('R','platz',0,1,'3',0,'faecher'),S('L','seit',15,2,'4',45,'LR'),tip(S('R','kreuz',25,1,'2',0,'LR'),'Fencing: rechter Fuß vor und über Kreuz, Knie gebeugt'),S('L','platz',0,1,'3',0,'LR'),S('R','seit',15,2,'4',-45,'zu')],
    [S('R','schliessen',0,1,'2'),S('L','vor',20,1,'3'),tip(S('R','vor',15,2,'4',-135),'Gewicht vor, drehen, linke Spitze seitlich'),S('L','kreuz',25,1,'2'),S('R','platz',0,1,'3'),S('L','seit',15,2,'4',45)]],
});
tanz('Cha-Cha-Cha',120,{
  b_c_rope:['Rope Spinning',[S('L','seit',12,1,'2',0,'hoch'),S('R','platz',0,1,'3',0,'hoch'),S('L','schliessen',0,.5,'4',0,'hoch'),S('R','platz',0,.5,'&',0,'hoch'),S('L','platz',0,1,'1',0,'hoch'),
    S('R','diagRueck',15,1,'2',0,'hoch'),S('L','platz',0,1,'3',0,'hoch'),S('R','vor',12,.5,'4',0,'hoch'),S('L','kreuzHinter',8,.5,'&',0,'hoch'),S('R','vor',12,1,'1',0,'zu')],ropeD(false)],
});
belegt('b_r_rope','latin/rumba/rope_spinning.html'); belegt('b_r_fence','latin/rumba/fencing.html'); belegt('b_c_rope','latin/cha_cha/rope_spinning.html');


/* ---------- Langsamer Walzer: Fallaway Whisk (Gold, ISTD-Zusatzfigur) ----------
   Nach Dance Central (https://www.dancecentral.info/ballroom/international-style/waltz/fallaway-whisk): Herr links rück mit beginnender
   Rechtsdrehung, rechts seit und etwas rück (⅜ rechts zwischen 1 und 2, Körper dreht weniger), links kreuzt locker hinter in den Fallaway.
   Die Dame tanzt gegengleich (rechts vor, links seit, rechts kreuzt hinter). Die Quellseite lag nur gekürzt vor, daher bleibt die Figur
   als schematisch gekennzeichnet. Vorher z. B. Rechtsdrehung, Back Lock, Cross Hesitation; danach Chassé oder Weave aus der Promenade, Wing. */
tanz('Langsamer Walzer',90,{
  b_w_fwhisk:['Fallaway Whisk',[tip(S('L','rueck',30,1,'1',-30),'Links rück, Rechtsdrehung beginnen'),S('R','seit',26,1,'2',-105),tip(S('L','kreuzHinter',15,1,'3',0,'prom'),'Links kreuzt locker hinter – Fallaway (Promenade rückwärts)')]],
});
QUELLEN.b_w_fwhisk='https://www.dancecentral.info/ballroom/international-style/waltz/fallaway-whisk';
INFO.b_w_fwhisk=[4,'prom','Fallaway Whisk: rück mit Rechtsdrehung, seit und etwas rück, dann kreuzt der linke Fuß locker hinter – Herr und Dame stehen im Fallaway (Promenade rückwärts). Danach eine Figur aus der Promenade.','s'];


/* ==================== Standardtänze nach BallroomGuide ====================
   Herrenschritte nach der Quelle; die Dame tanzt gegengleich (Fersendrehungen der Dame als df:'ferse'), wo ihre Schritte nicht einfach
   gespiegelt sind, hat sie eigene Schritte. Drehung „zwischen a und b“ liegt auf Schritt b; positive Werte = links, negative = rechts. */
const fe=st=>({...st,df:'ferse',tip:st.tip||'Dame: Fersendrehung – Füße schließen, auf den Fersen drehen'});
const W=(f,dir,len,d,c,t=0,h)=>S(f,dir,len,d,c,t,h);
tanz('Langsamer Walzer',90,{
  b_w_otelemark:['Open Telemark',[W('L','vor',35,1,'1',30),fe(W('R','seit',30,1,'2',135)),tip(W('L','seit',25,1,'3',45,'prom'),'Öffnen in die Promenade')]],
  b_w_wing:['Wing',[W('R','kreuz',30,1,'1',45,'prom'),tip(W('L','tap',0,1,'2',0),'Linken Fuß langsam heranziehen, die Dame geht links um den Herrn herum'),W('L','tap',0,1,'3')],
    [W('L','kreuz',25,1,'1'),W('R','vor',25,1,'2',45),tip(W('L','vorAussen',25,1,'3',90),'Die Dame endet außen links vom Herrn')]],
  b_w_contra:['Contra Check',[tip(W('L','vorAussen',20,1,'1',45),'Contra Check: links vor in CBMP, Knie gebeugt, Körper dreht stark links'),W('R','platz',0,1,'2',-45),W('L','seit',20,1,'3',0,'prom')]],
  b_w_hcorte:['Hover Corté',[W('R','rueck',25,1,'1',30),tip(W('L','seit',20,1,'2',105),'Hover: hochkommen, Sway nach rechts'),W('R','platz',0,1,'3')]],
  b_w_dbl:['Double Reverse Spin',[W('L','vor',35,1,'1',30),W('R','seit',26,.5,'2',90),tip(W('L','tap',0,.5,'&',135),'Linker Fuß schließt ohne Gewicht, auf dem rechten Ballen weiterdrehen'),W('R','platz',0,1,'3',90)],
    [W('R','rueck',30,1,'1',30),fe(W('L','ferse',0,.5,'2',135)),W('R','seit',20,.5,'&',90),W('L','kreuz',8,1,'3',90)]],
  b_w_ospin:['Outside Spin',[tip(W('L','rueck',15,1,'1',-135),'Kleiner Schritt rück in CBMP, Spitze einwärts – Pivot'),W('R','vorAussen',30,1,'2'),tip(W('L','seit',25,1,'3',-270),'Seit und weiter drehen, endet links rück')],
    [W('R','vorAussen',30,1,'1'),W('L','schliessen',0,1,'2',-225),W('R','vor',25,1,'3',-180)]],
  b_w_tlock:['Turning Lock',[W('R','rueck',25,.5,'1'),W('L','kreuz',10,.5,'&'),W('R','rueck',20,1,'2',30),W('L','seit',25,1,'3',60)]],
  b_w_drag:['Drag Hesitation',[W('L','vor',30,1,'1',30),W('R','seit',30,1,'2',60),tip(W('L','tap',0,1,'3',45),'Linker Fuß schließt ohne Gewicht (Drag)')]],
  b_w_bwhisk:['Back Whisk',[W('L','rueck',30,1,'1'),W('R','diagRueck',25,1,'2'),tip(W('L','kreuzHinter',15,1,'3',0,'prom'),'Links kreuzt hinter – in die Promenade')]],
  b_w_rcorte:['Reverse Corté',[W('R','rueck',30,1,'1',30),tip(W('L','tap',0,1,'2',105),'Links schließt ohne Gewicht, Fersendrehung auf dem rechten Fuß'),W('L','halt',0,1,'3')],
    [W('L','vor',30,1,'1',30),W('R','seit',25,1,'2',90),W('L','schliessen',0,1,'3',45)]],
  b_w_wpp:['Weave aus der Promenade',[W('R','kreuz',30,1,'1',45,'prom'),W('L','vor',30,1,'2'),W('R','seit',25,1,'3',90),W('L','rueckAussen',30,1,'1',45),W('R','rueck',25,1,'2'),W('L','seit',25,1,'3',135)],
    [W('L','kreuz',30,1,'1'),W('R','seit',25,1,'2',135),W('L','seit',25,1,'3',135),W('R','vorAussen',30,1,'1'),W('L','vor',30,1,'2'),W('R','seit',25,1,'3',135)]],
  b_w_pcr:['Progressives Chassé nach rechts',[W('L','vor',30,1,'1',30),W('R','seit',25,.5,'2',45),W('L','schliessen',0,.5,'&',45),W('R','seit',25,1,'3')]],
  b_w_cross:['Cross Hesitation',[W('R','kreuz',30,1,'1',45,'prom'),tip(W('L','tap',0,1,'2'),'Linker Fuß schließt ohne Gewicht'),W('L','halt',0,1,'3')],
    [W('L','kreuz',30,1,'1'),W('R','seit',25,1,'2',90),W('L','schliessen',0,1,'3',45)]],
  b_w_frsp:['Fallaway Reverse and Slip Pivot',[W('L','vor',30,.5,'1',20),W('R','rueck',20,.5,'&',115,'prom'),W('L','rueckAussen',20,1,'2',45,'prom'),tip(W('R','rueck',10,1,'3',135),'Slip Pivot: rechts rück, linker Fuß bleibt in CBMP')],
    [W('R','rueck',30,.5,'1',20),W('L','rueck',20,.5,'&',25),W('R','rueck',10,1,'2',180),W('L','vor',15,1,'3',90)]],
  /* Reverse Pivot: wird auf „&“ am Ende einer Figur getanzt – hier als Kombination mit den ersten drei Schritten der Linksdrehung (1 2 3 &) */
  b_w_rpivot:['Reverse Pivot (nach halber Linksdrehung, 1 2 3 &)',[W('L','vor',35,1,'1',45),W('R','seit',30,1,'2',90),W('L','schliessen',0,.5,'3',45),
    tip(W('R','rueck',10,.25,'&',90),'Reverse Pivot: kleiner Schritt rück in CBMP, Spitze einwärts, ½ Linksdrehung'),W('R','platz',0,.25,'a',90)]],   // Pivot in zwei Vierteln, damit das Paar um seine Mitte dreht
});
tanz('Quickstep',200,{
  b_q_fishtail:['Fishtail',[W('R','vorAussen',30,2,'S'),W('L','kreuzHinter',10,1,'Q'),W('R','vor',15,1,'Q',-45),W('L','diagVor',25,1,'Q',-45),W('R','kreuzHinter',10,1,'Q'),W('L','diagVor',25,2,'S')]],
  b_q_v6:['V6',[W('L','rueck',30,2,'S'),W('R','rueck',25,1,'Q'),W('L','kreuz',10,1,'Q'),W('R','diagRueck',25,2,'S'),W('L','rueckAussen',30,2,'S'),W('R','rueck',25,1,'Q',30),W('L','seit',25,1,'Q',60)]],
  b_q_rrturn:['Running Right Turn',[W('R','vor',35,2,'S',-20),W('L','seit',30,1,'Q',-70),W('R','schliessen',0,1,'Q',-45),tip(W('L','rueck',15,1,'S',-90),'Pivot: links rück, Spitze einwärts, ½ Rechtsdrehung'),W('L','platz',0,1,'&',-90),
    W('R','vorAussen',30,2,'S',-20),fe(W('L','seit',30,2,'S',-115)),W('R','rueck',25,2,'S',-45),W('L','rueckAussen',25,1,'Q',-20),W('R','seit',25,1,'Q',-115),W('L','vor',30,2,'S')]],
  b_q_rfinish:['Running Finish',[W('L','rueckAussen',30,2,'S',-20),W('R','seit',25,1,'Q',-115),tip(W('L','vor',25,1,'Q'),'Links vor, linke Seite führt')]],
  b_q_swivel:['Cross Swivel',[W('L','vor',30,2,'S',60),tip(W('R','tap',0,2,'S',30),'Rechter Fuß schließt etwas hinter ohne Gewicht – Swivel')]],
  b_q_qor:['Quick Open Reverse',[W('R','vorAussen',30,2,'S'),W('L','vor',30,2,'S',30),W('R','seit',25,1,'Q',60),W('L','rueckAussen',15,1,'Q',45)]],
  b_q_hcorte:['Hover Corté',[W('R','rueck',25,2,'S',30),tip(W('L','seit',20,2,'S',105),'Hover: hochkommen, Sway nach rechts'),W('R','platz',0,2,'S')]],
});
tanz('Slowfox',116,{
  b_sf_oimp:['Open Impetus (in die Promenade)',[W('L','rueck',35,2,'S',-20),tip(W('R','ferse',0,1,'Q',-120),'Herr: Fersendrehung, Füße geschlossen'),W('L','seit',25,1,'Q',-40,'prom')],
    [W('R','vor',35,2,'S',-20),W('L','seit',30,1,'Q',-125),W('R','seit',25,1,'Q',-125)]],
  b_sf_hfeder:['Hover Feather',[tip(W('L','diagVor',25,1,'Q'),'Hover: hoch, linke Seite führt'),W('R','vorAussen',30,1,'Q')]],
  b_sf_nweave:['Natural Weave',[W('R','vor',35,2,'S',-10),fe(W('L','seit',30,1,'Q',-70)),W('R','rueck',25,1,'Q',-10),W('L','rueckAussen',25,1,'Q'),W('R','rueck',25,1,'Q',30),W('L','seit',25,1,'Q',60),W('R','vorAussen',30,1,'Q')]],
  b_sf_wpp:['Weave aus der Promenade',[W('R','kreuz',30,2,'S',45,'prom'),W('L','vor',25,1,'Q',45),W('R','seit',25,1,'Q',90),W('L','rueckAussen',25,1,'Q',45),W('R','rueck',25,1,'Q'),W('L','seit',25,1,'Q',90),W('R','vorAussen',30,1,'Q')],
    [W('L','kreuz',30,2,'S'),W('R','seit',25,1,'Q',135),W('L','seit',25,1,'Q',135),W('R','vorAussen',30,1,'Q'),W('L','vor',25,1,'Q'),W('R','seit',25,1,'Q',90),W('L','rueckAussen',25,1,'Q',45)]],
  b_sf_otelemark:['Open Telemark',[W('L','vor',35,2,'S',30),fe(W('R','seit',30,1,'Q',135)),tip(W('L','seit',25,1,'Q',45,'prom'),'Öffnen in die Promenade')]],
  b_sf_frsp:['Fallaway Reverse and Slip Pivot',[W('L','vor',30,1,'Q',20),W('R','rueck',20,1,'Q',115,'prom'),W('L','rueckAussen',20,1,'Q',45,'prom'),tip(W('R','rueck',10,1,'Q',135),'Slip Pivot: rechts rück, linker Fuß bleibt in CBMP')],
    [W('R','rueck',30,1,'Q',20),W('L','rueck',20,1,'Q',25),W('R','rueck',10,1,'Q',180),W('L','vor',15,1,'Q',90)]],
  b_sf_bounce:['Bounce Fallaway mit Weave-Ende',[W('L','vor',30,1,'Q',20),W('R','rueck',20,1,'Q',115,'prom'),W('L','rueckAussen',20,1,'Q',0,'prom'),W('R','seit',20,1,'Q'),W('L','rueckAussen',25,1,'Q',45),W('R','rueck',25,1,'Q'),W('L','seit',25,1,'Q',90),W('R','vorAussen',30,1,'Q')],
    [W('R','rueck',30,1,'Q',20),W('L','rueck',20,1,'Q',25),W('R','rueckAussen',20,1,'Q'),W('L','seit',20,1,'Q',90),W('R','vorAussen',25,1,'Q',45),W('L','vor',25,1,'Q'),W('R','seit',25,1,'Q',45),W('L','rueckAussen',25,1,'Q',45)]],
});
tanz('Tango',128,{
  b_t_orev:['Offene Linksdrehung (Open Reverse Turn)',[W('L','vorAussen',30,1,'Q',20),W('R','seit',25,1,'Q',90),W('L','rueckAussen',25,2,'S',45),W('R','rueck',25,1,'Q'),W('L','seit',20,1,'Q',115),W('R','schliessen',0,2,'S')]],
  b_t_bopr:['Rückwärts offene Promenade',[W('L','seit',30,2,'S',0,'prom'),W('R','kreuz',25,1,'Q',0,'prom'),W('L','seit',20,1,'Q',-90),W('R','rueck',25,2,'S')]],
  b_t_oswivel:['Outside Swivel',[tip(W('L','rueckAussen',20,2,'S',-45),'Links rück in CBMP, Spitze einwärts, rechter Fuß bleibt vorn'),W('R','kreuz',20,1,'Q',45,'prom'),W('L','tapSeit',0,1,'Q')],
    [W('R','vorAussen',15,2,'S'),W('L','kreuz',20,1,'Q',-135),W('R','tapSeit',0,1,'Q',135)]],
  b_t_ntwist:['Natural Twist Turn',[W('L','seit',30,2,'S',0,'prom'),W('R','kreuz',25,1,'Q',0,'prom'),W('L','seit',20,1,'Q',-90),tip(W('R','kreuzHinter',10,2,'S',-45),'Rechts kreuzt hinter, Gewicht geteilt'),
    tip(W('L','platz',0,1,'Q',-115),'Twist: auf beiden Füßen rechts aufdrehen, die Füße lösen sich'),W('R','platz',0,1,'Q',-110,'prom')],
    [W('R','seit',30,2,'S'),W('L','kreuz',25,1,'Q',-45),W('R','vor',25,1,'Q'),W('L','vor',15,2,'S',-45),W('R','vorAussen',15,1,'Q',-45),W('L','vor',12,1,'Q',-180)]],
  b_t_npt:['Natural Promenade Turn',[W('L','seit',30,2,'S',0,'prom'),W('R','kreuz',25,1,'Q',0,'prom'),W('L','seit',20,1,'Q',-135),tip(W('R','vor',25,2,'S',-135,'prom'),'Rechts vor und in die Promenade drehen – der Seitschritt links beginnt die nächste Figur')],
    [W('R','seit',30,2,'S'),W('L','kreuz',25,1,'Q'),W('R','vor',25,1,'Q',-45),W('L','seit',20,2,'S',-225)]],
  b_t_contra:['Contra Check',[tip(W('L','vorAussen',20,2,'S',45),'Contra Check: links vor in CBMP, Knie gebeugt'),W('R','platz',0,1,'Q',-45),W('L','tapSeit',0,1,'Q',0,'prom')]],
  b_t_fall4:['Fallaway Four Step',[W('L','vorAussen',25,1,'Q',20),W('R','diagRueck',20,1,'Q',70,'prom'),W('L','rueckAussen',20,1,'Q',0,'prom'),W('R','schliessen',0,1,'Q',0,'prom')]],
});
tanz('Wiener Walzer',174,{
  b_ww_rfleckerl:['Reverse Fleckerl (Drehung am Platz, links)',[W('L','vor',5,1,'1',90),W('R','seit',10,1,'2',135),tip(W('L','kreuz',5,1,'3',135),'Links kreuzt vor rechts'),W('R','seit',10,1,'1',45),W('L','kreuzHinter',5,1,'2',180),W('R','seit',10,1,'3',135)],
    [W('R','seit',10,1,'1',45),W('L','kreuzHinter',5,1,'2',180),W('R','seit',10,1,'3',135),W('L','kreuz',5,1,'1',90),W('R','seit',10,1,'2',135),W('L','kreuz',5,1,'3',135)]],
});
for(const [id,pfad] of Object.entries({b_w_otelemark:'waltz/open_telemark',b_w_wing:'waltz/wing',b_w_contra:'waltz/contra_check',b_w_hcorte:'waltz/hover_corte',b_w_dbl:'waltz/double_reverse',
  b_w_ospin:'waltz/outside_spin',b_w_tlock:'waltz/turning_lock',b_w_drag:'waltz/drag_hesitation',b_w_bwhisk:'waltz/back_whisk',b_w_rcorte:'waltz/reverse_corte',b_w_wpp:'waltz/weave_from_pp',
  b_w_pcr:'waltz/chasse_right',b_w_cross:'waltz/cross_hesitation',b_w_frsp:'waltz/fallaway_reverse',b_w_rpivot:'waltz/reverse_pivot',
  b_q_fishtail:'quickstep/fishtail',b_q_v6:'quickstep/v6',b_q_rrturn:'quickstep/running_right_turn',b_q_rfinish:'quickstep/running_finish',b_q_swivel:'quickstep/cross_swivel',
  b_q_qor:'quickstep/quick_open_reverse',b_q_hcorte:'quickstep/hover_corte',b_sf_oimp:'foxtrot/open_impetus',b_sf_hfeder:'foxtrot/hover_feather',b_sf_nweave:'foxtrot/natural_weave',
  b_sf_wpp:'foxtrot/weave_from_pp',b_sf_otelemark:'foxtrot/open_telemark',b_sf_frsp:'foxtrot/fallaway_reverse',b_sf_bounce:'foxtrot/bounce_fallaway',
  b_t_orev:'tango/open_reverse_turn',b_t_bopr:'tango/back_open_promenade',b_t_oswivel:'tango/outside_swivel',b_t_ntwist:'tango/twist_turn',b_t_npt:'tango/promenade_turn',
  b_t_contra:'tango/contra_check',b_t_fall4:'tango/fallaway_four_step',b_ww_rfleckerl:'viennese/reverse_fleckerl'})) belegt(id,'standard/'+pfad+'.html');
INFO.b_w_rpivot=[2,'dreh','Reverse Pivot: nach den ersten drei Schritten der Linksdrehung auf „&“ ein kleiner Schritt rück in CBMP mit ½ Linksdrehung auf dem Ballen. Endet vorwärts, bereit für die nächste Linksdrehung.'];


/* Fußarbeit aus den Schritttabellen der Quelle (B = Ballen, F = flach, H = Ferse, T = Spitze, W = ganzer Fuß, i/e = Innenkante) */
const fw=(id,H,D=H)=>{ const z=x=>x.split(' ').map(y=>y.replace(/-/g,' ')); TECHNIK_DATEN[id]={H:{fuss:z(H)},D:{fuss:z(D)}}; };
fw('b_j_toeheel','BF BF T H BF T H BF T H BF T H BF');
fw('b_j_link','BF BF B B BF B B BF');
fw('b_j_simplespin','BF BF');
fw('b_j_miami','BF BF B B BF B B BF');
fw('b_j_rolloff','BF BF B B BF T BF B B BF','BF BF B B BF BF BF B B BF');
fw('b_j_spanish','BF BF B B BF B B BF BF BF B B BF B B BF');
fw('b_sa_cjaca','HT H F T F H F BF T F H F T F','BF T F H F T F HT H F T F H F');
fw('b_sa_argcross','BF T BF BF T BF BF T BF BF T BF');
fw('b_sa_maypole','BF i/e-T BF i/e-T BF i/e-T BF');
fw('b_sa_nroll','HF B BF BF B BF');
fw('b_pd_sep','WF HF HB B B B B BF','WF BF BF B B B B BF');
fw('b_pd_twist','WF HF HF BF B B-beider-Füße,-dann-F B/BF B/BF','WF HF HF HF HF HB,-dann-F B/BF B/BF');
fw('b_pd_coup','i/e-T T BF B B');
fw('b_w_fwhisk','TH TH TH','HT TH TH');

/* Standard: Fußarbeit nach BallroomGuide (Herr; Dame) */
fw('b_w_otelemark','TH T TH','TH HT TH'); fw('b_w_wing','HT F F','HT T TH'); fw('b_w_contra','HF T TH','TH T TH'); fw('b_w_hcorte','TH T TH','HT T TH');
fw('b_w_dbl','HT T T TH','TH HT T TH'); fw('b_w_ospin','THT HT TH','HT T TH'); fw('b_w_tlock','T T T TH'); fw('b_w_drag','HT T TH','TH T TH');
fw('b_w_bwhisk','TH T TH','HT T TH'); fw('b_w_rcorte','TH HT TH','HT T TH'); fw('b_w_wpp','HT T TH TH T TH','HT T TH HT T TH'); fw('b_w_pcr','HT T T TH','TH T T TH');
fw('b_w_cross','HT T TH'); fw('b_w_frsp','HT T TH THT','TH T T TH');
fw('b_q_fishtail','HT T T T T TH','T T T T T TH'); fw('b_q_v6','TH T T TH TH T TH','HT T T TH HT T TH');
fw('b_q_rrturn','HT T TH THT Pivot HT T TH T T TH','TH T TH HT Pivot TH HT TH HT T TH'); fw('b_q_rfinish','TH T TH','HT T TH');
fw('b_q_swivel','HT i/e-T','TH i/e-T'); fw('b_q_qor','HT HT T TH','TH TH T TH'); fw('b_q_hcorte','TH T TH','HT T TH');
fw('b_sf_oimp','TH HT TH','HT T TH'); fw('b_sf_hfeder','T TH','TH TH'); fw('b_sf_nweave','HT T T T T T TH','TH HT T T T TH TH');
fw('b_sf_wpp','HT T T T T T TH','HT T T T T TH TH'); fw('b_sf_otelemark','HT T TH','TH HT TH'); fw('b_sf_frsp','HT T TH THT','TH T T TH');
fw('b_sf_bounce','HT T T T T T T TH','THT T T T T T TH TH');
fw('b_t_orev','HF BH BH BH i/e-WF WF','BH WF HF HF i/e-BH WF'); fw('b_t_bopr','HF HF BH BH','HF HF BH WF'); fw('b_t_oswivel','BH HF i/e-B','HB HB i/e-B');
fw('b_t_ntwist','HF HF BH B B/H F','HF HF HF HF HB BH'); fw('b_t_npt','HF HF BHB HF','HF HF HB BH'); fw('b_t_contra','HF BH i/e-B','B F i/e-B'); fw('b_t_fall4','HF BH BH BH','BH BH HB BH');
fw('b_ww_rfleckerl','HB B BH BHB B BH','BHB B BH BHB B BH');
}
