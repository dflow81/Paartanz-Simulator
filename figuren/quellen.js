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
}
