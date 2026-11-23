/* Aufbaufiguren für Medaillen- und Turnierniveau: Slowfox, Quickstep, Langsamer Walzer, Tango, Cha-Cha-Cha, Rumba, Salsa.
   Die Schrittfolgen sind schematisch: Fuß, Richtung, Rhythmus und ungefähre Drehung folgen der üblichen Beschreibung der Figur,
   wurden aber nicht mit einem Technikbuch abgeglichen. Einordnung siehe figuren/syllabus.js. */
{
const ferse=(st,tip='Dame: Fersendrehung – Füße schließen, auf den Fersen drehen')=>({...st,df:'ferse',tip});
const T_=(st,tip)=>({...st,tip});

/* ---------- Slowfox: S = 2 Schläge, Q = 1 Schlag ---------- */
tanz('Slowfox',116,{
  b_sf_ffinish:['Feather Finish',[S('R','rueck',40,2,'S',45),S('L','seit',28,1,'Q',90),T_(S('R','vorAussen',36,1,'Q'),'Außenseitlich: rechts an der Dame vorbei')]],
  b_sf_oimp:['Open Impetus (in die Promenade)',[S('L','rueck',38,2,'S',-45),T_(S('R','ferse',0,1,'Q',-90),'Herr: Fersendrehung, Füße geschlossen'),S('L','diagVor',28,1,'Q',0,'prom')]],
  b_sf_cfeder:['Curved Feather',[S('R','vor',45,2,'S',-45),S('L','vor',38,1,'Q',-45),T_(S('R','vorAussen',34,1,'Q',-45),'Im Bogen nach rechts, außenseitlich enden')]],
  b_sf_hfeder:['Hover Feather',[T_(S('R','vor',42,2,'S'),'Hover: hoch auf die Ballen, kurz schweben'),S('L','diagVor',30,1,'Q'),S('R','vorAussen',34,1,'Q')]],
  b_sf_tumble:['Tumble Turn',[S('L','vor',42,2,'S',45),S('R','seit',28,1,'Q',60),T_(S('L','diagRueck',26,1,'Q',45),'Tumble: Körper fällt in die Drehung, Knie weich'),S('R','rueck',34,2,'S',30),S('L','seit',26,1,'Q',30),S('R','vorAussen',34,1,'Q')]],
  b_sf_bounce:['Bounce Fallaway mit Weave-Ende',[S('L','vor',40,2,'S',45),S('R','seit',26,1,'Q',0,'prom'),T_(S('L','kreuzHinter',14,1,'Q',0,'prom'),'Fallaway: beide gehen in der Promenade rückwärts'),S('R','rueck',30,1,'Q',45),S('L','seit',26,1,'Q',45),S('R','vorAussen',34,2,'S')]],
  b_sf_nweave:['Natural Weave',[S('R','vor',45,2,'S',-45),S('L','seit',28,1,'Q',-45),S('R','rueck',30,1,'Q',-45),S('L','rueck',32,1,'Q'),S('R','rueck',30,1,'Q',45),S('L','seit',26,1,'Q',45),S('R','vorAussen',34,1,'Q')]],
  b_sf_wpp:['Weave aus der Promenade',[S('R','kreuzSeit',30,2,'S',0,'prom'),S('L','vor',28,1,'Q',45),S('R','seit',26,1,'Q',45),S('L','rueck',30,1,'Q'),S('R','rueck',30,1,'Q',45),S('L','seit',26,1,'Q',45),S('R','vorAussen',34,1,'Q')]],
  b_sf_topspin:['Top Spin',[S('L','rueck',32,1,'Q',45),S('R','rueck',28,1,'Q',45),S('L','seit',26,1,'Q',45),S('R','vorAussen',32,1,'Q')]],
  b_sf_otelemark:['Open Telemark',[S('L','vor',42,2,'S',45),ferse(S('R','seit',28,1,'Q',90)),S('L','diagVor',26,1,'Q',0,'prom')]],
  b_sf_ntwist:['Natural Twist Turn',[S('R','vor',42,2,'S',-45),S('L','seit',28,1,'Q',-45),S('R','kreuzHinter',14,1,'Q',-45),T_(S('L','platz',0,2,'S',-60),'Twist: auf beiden Füßen nach rechts aufdrehen'),S('R','seit',24,1,'Q',-45),S('L','diagVor',26,1,'Q',-30,'prom')]],
});

/* ---------- Quickstep ---------- */
tanz('Quickstep',200,{
  b_q_fishtail:['Fishtail',[S('R','vorAussen',36,2,'S'),T_(S('L','kreuzHinter',12,1,'Q'),'Der linke Fuß kreuzt hinter dem rechten'),S('R','diagVor',20,1,'Q'),S('L','diagVor',22,1,'Q'),S('R','kreuzHinter',10,1,'Q'),S('L','diagVor',30,2,'S')]],
  b_q_v6:['V6',[S('L','rueck',36,2,'S'),S('R','rueck',30,1,'Q'),S('L','kreuz',10,1,'Q'),S('R','rueck',34,2,'S'),S('L','rueck',34,2,'S',-45),S('R','seit',26,1,'Q',-45),S('L','diagVor',28,1,'Q'),S('R','vorAussen',34,2,'S')]],
  b_q_6run:['Six Quick Run',[0,1,2,3,4,5].map(i=>S(i%2?'L':'R','vor',32,1,'Q',15))],
  b_q_rrturn:['Running Right Turn',[S('R','vor',40,2,'S',-45),S('L','seit',26,1,'Q',-45),S('R','schliessen',0,1,'Q',-45),T_(S('L','rueck',32,2,'S',-90),'Auf dem linken Fuß nach rechts drehen'),S('R','vor',30,2,'S',-90),S('L','seit',26,1,'Q',-45),S('R','rueck',28,1,'Q'),S('L','rueck',30,2,'S')]],
  b_q_rfinish:['Running Finish',[S('R','rueck',34,2,'S',45),S('L','seit',26,1,'Q',45),S('R','vorAussen',32,1,'Q')]],
  b_q_swivel:['Cross Swivel',[S('L','vor',36,2,'S',45),T_(S('R','kreuzHinter',12,2,'S',45),'Swivel: auf dem Ballen drehen, die Füße bleiben gekreuzt')]],
  b_q_qor:['Quick Open Reverse',[S('L','vor',38,2,'S',45),S('R','seit',26,1,'Q',60),S('L','rueck',30,1,'Q',30),S('R','rueckAussen',32,2,'S')]],
  b_q_hcorte:['Hover Corté',[S('R','rueck',34,2,'S',45),T_(S('L','seit',26,2,'S',45),'Hover: hoch auf die Ballen'),S('R','platz',0,2,'S')]],
});

/* ---------- Langsamer Walzer ---------- */
tanz('Langsamer Walzer',90,{
  b_w_otelemark:['Open Telemark',[S('L','vor',40,1,'1',45),ferse(S('R','seit',28,1,'2',90)),S('L','diagVor',26,1,'3',0,'prom')]],
  b_w_wing:['Wing',[S('R','vor',20,1,'1',0,'prom'),T_(S('L','tap',0,1,'2'),'Der linke Fuß schließt langsam ohne Gewicht, die Dame geht um den Herrn'),S('L','halt',0,1,'3')],
     [S('L','kreuzSeit',30,1,'1',-30),S('R','seit',30,1,'2',-30),S('L','kreuzSeit',22,1,'3',-30)]],
  b_w_contra:['Contra Check',[T_(S('L','vor',30,1,'1'),'Kontra-Check: Körper dreht gegen die Schrittrichtung, Knie weich'),S('R','platz',0,1,'2'),S('L','seit',24,1,'3',0,'prom')]],
  b_w_hcorte:['Hover Corté',[S('R','rueck',34,1,'1',45),T_(S('L','seit',24,1,'2',45),'Hover: hoch auf die Ballen'),S('R','platz',0,1,'3')]],
  b_w_dbl:['Double Reverse Spin',[S('L','vor',38,1,'1',75),S('R','seit',26,1,'2',105),T_(S('L','tap',0,1,'3',30),'Der linke Fuß schließt ohne Gewicht, auf dem rechten Ballen weiterdrehen')]],
  b_w_ospin:['Outside Spin',[S('L','rueck',20,1,'1',-60),S('R','vor',30,1,'2',-75),S('L','seit',22,1,'3',-45)]],
  b_w_tlock:['Turning Lock',[S('R','rueck',30,1,'1'),S('L','rueck',24,.5,'2'),S('R','kreuz',10,.5,'&',45),S('L','seit',26,1,'3',45)]],
  b_w_drag:['Drag Hesitation',[S('L','vor',36,1,'1',45),S('R','seit',28,1,'2',45),T_(S('L','tap',0,1,'3'),'Der linke Fuß wird ohne Gewicht herangezogen')]],
  b_w_bwhisk:['Back Whisk',[S('L','rueck',34,1,'1'),S('R','seit',24,1,'2',0,'prom'),S('L','kreuzHinter',12,1,'3',0,'prom')]],
  b_w_rcorte:['Reverse Corté',[S('R','rueck',30,1,'1',45),S('L','schliessen',0,1,'2',45),T_(S('R','tap',0,1,'3'),'Der rechte Fuß schließt ohne Gewicht')]],
  b_w_wpp:['Weave aus der Promenade',[S('R','kreuzSeit',30,1,'1',0,'prom'),S('L','vor',28,1,'2',45),S('R','seit',24,1,'3',45),S('L','rueck',28,1,'1'),S('R','rueck',26,1,'2',45),S('L','seit',24,1,'3',45)]],
  b_w_pcr:['Progressives Chassé nach rechts',[S('L','vor',34,1,'1',-45),S('R','seit',24,.5,'2',-45),S('L','schliessen',0,.5,'&'),S('R','seit',24,1,'3')]],
  b_w_cross:['Cross Hesitation',[S('R','kreuzSeit',30,1,'1',0,'prom'),S('L','seit',20,1,'2',45),T_(S('R','tap',0,1,'3'),'Der rechte Fuß schließt ohne Gewicht')]],
  b_w_oversway:['Oversway',[T_(S('L','seit',30,1,'1'),'Oversway: weich ins linke Knie, Oberkörper dehnt sich nach links'),S('L','halt',0,2,'2')]],
  b_w_throw:['Throwaway Oversway',[S('L','vor',34,1,'1',45),S('R','seit',26,1,'2',90),T_(S('L','tapRueck',30,1,'3'),'Throwaway: der linke Fuß streckt sich ohne Gewicht nach hinten')]],
  b_w_chair:['Chair',[T_(S('R','kreuzSeit',30,1,'1',0,'prom'),'Chair: tief ins rechte Knie, Oberkörper aufrecht'),S('L','platz',0,1,'2',0,'prom'),S('R','rueck',20,1,'3')]],
  b_w_lunge:['Same Foot Lunge',[T_(S('R','seit',40,1,'1'),'Same Foot Lunge: beide stehen auf dem rechten Fuß'),S('R','halt',0,2,'2'),S('L','platz',0,1,'1'),S('R','schliessen',0,1,'2'),S('R','halt',0,1,'3')],
     [S('L','schliessen',0,.5,'1'),S('R','rueck',35,.5,'&'),S('R','halt',0,2,'2'),S('L','platz',0,1,'1'),S('R','schliessen',0,1,'2'),S('L','platz',0,1,'3')]],
});

/* ---------- Tango ---------- */
tanz('Tango',128,{
  b_t_drag:['Spanish Drag',[T_(S('L','seit',45,2,'S',0,'prom'),'Langer Schritt zur Seite'),T_(S('R','tap',0,2,'S',0,'zu'),'Der rechte Fuß wird langsam ohne Gewicht herangezogen, zurück in die geschlossene Haltung')]],
  b_t_orev:['Offene Linksdrehung (Open Reverse Turn)',[S('L','vor',35,1,'Q',45),S('R','seit',26,1,'Q',45),S('L','rueck',28,2,'S',45),S('R','rueck',30,1,'Q'),S('L','seit',26,1,'Q',45),S('R','vorAussen',32,2,'S')]],
  b_t_bopr:['Rückwärts offene Promenade',[S('L','rueck',32,2,'S'),S('R','rueck',26,1,'Q'),S('L','seit',28,1,'Q',0,'prom'),S('R','kreuzSeit',24,2,'S',0,'prom')]],
  b_t_oswivel:['Outside Swivel',[S('L','rueck',30,2,'S'),T_(S('R','kreuz',12,2,'S',0,'prom'),'Swivel: die Dame dreht zur Promenade, der rechte Fuß kreuzt ohne Eile')]],
  b_t_ntwist:['Natural Twist Turn',[S('R','kreuzSeit',30,2,'S',0,'prom'),S('L','seit',26,1,'Q',-60),S('R','kreuzHinter',12,1,'Q',-30),T_(S('L','platz',0,2,'S',-60),'Twist: auf beiden Füßen nach rechts aufdrehen')]],
  b_t_npt:['Natural Promenade Turn',[S('L','seit',38,2,'S',0,'prom'),S('R','vor',30,2,'S',-75),S('L','seit',24,1,'Q',-60,'prom'),S('R','schliessen',0,1,'Q',0,'prom')]],
  b_t_contra:['Contra Check',[T_(S('L','vor',30,2,'S'),'Kontra-Check: tief und ruhig, Körper dreht gegen die Schrittrichtung'),S('R','platz',0,1,'Q'),S('L','seit',25,1,'Q',0,'prom')]],
  b_t_fall4:['Fallaway Four Step',[S('L','vor',30,1,'Q'),S('R','seit',24,1,'Q'),S('L','kreuzHinter',12,1,'Q',0,'prom'),S('R','rueck',20,1,'Q',0,'prom')]],
  b_t_oversway:['Oversway',[T_(S('L','seit',34,2,'S'),'Oversway: weich ins linke Knie, Oberkörper dehnt sich'),S('L','halt',0,2,'S')]],
});

/* ---------- Cha-Cha-Cha und Rumba ---------- */
const lat=cha=>{
  const T=f=>cha?[S(f,'seit',12,.5,'4'),S(O(f),'schliessen',0,.5,'&'),S(f,'seit',12,1,'1')]:[S(f,'seit',25,2,'4')];
  const h1=[S('L','vor',30,1,'2'),S('R','platz',0,1,'3'),...T('L')], h2=[S('R','rueck',30,1,'2'),S('L','platz',0,1,'3'),...T('R')];
  return {
    cross:[S('L','kreuz',14,1,'2'),S('R','platz',0,1,'3'),...T('L'),S('R','kreuz',14,1,'2'),S('L','platz',0,1,'3'),...T('R')],
    aida:{steps:[S('L','rueck',30,1,'2',-45,'LR'),S('R','platz',0,1,'3',45,'LR'),...H(T('L'),'offen'),S('R','rueck',30,1,'2',45,'RL'),S('L','platz',0,1,'3',-45,'RL'),...H(T('R'),'offen')],
          dame:[S('R','rueck',30,1,'2',45),S('L','platz',0,1,'3',-45),...T('R'),S('L','rueck',30,1,'2',-45),S('R','platz',0,1,'3',45),...T('L')]},
    fence:H([T_(S('L','vor',32,1,'2'),'Fencing: Ausfallschritt wie beim Fechten'),S('R','platz',0,1,'3'),...T('L'),S('R','rueck',30,1,'2'),S('L','platz',0,1,'3'),...T('R')],'LR'),
    spiral:{steps:[...h1,S('R','rueck',12,1,'2',0,'hoch'),S('L','platz',0,1,'3',0,'hoch'),...H(T('R'),'LR')],
            dame:[...spiegel(h1),T_(S('L','vor',14,1,'2',-360),'Spiral: die Dame dreht auf dem linken Fuß eine ganze Drehung nach rechts'),S('R','vor',14,1,'3'),...T('L')]},
  };
};
const c=lat(true), r=lat(false);
tanz('Cha-Cha-Cha',120,{ b_c_cross:['Cross Basic',c.cross], b_c_aida:['Aida',c.aida.steps,c.aida.dame], b_c_fence:['Fencing',c.fence], b_c_spiral:['Spiral',c.spiral.steps,c.spiral.dame] });
tanz('Rumba',100,{ b_r_cross:['Cross Basic',r.cross], b_r_aida:['Aida',r.aida.steps,r.aida.dame], b_r_fence:['Fencing',r.fence], b_r_spiral:['Spiral',r.spiral.steps,r.spiral.dame] });

/* ---------- Salsa: 1-2-3, Pause, 5-6-7, Pause ---------- */
const s1=[S('L','vor',25,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3')], s2=[S('R','rueck',25,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')];
tanz('Salsa',170,{
  b_s_dile:['Dile que no',[S('L','rueck',20,1,'1'),S('R','platz',0,1,'2'),S('L','seit',12,2,'3',0,'offen'),S('R','vor',15,1,'5',0,'offen'),S('L','platz',0,1,'6',0,'offen'),S('R','schliessen',0,2,'7',0,'LR')]],
  b_s_vacilala:['Vacílala (Damendrehung auf 1-2-3)',[S('L','rueck',20,1,'1',0,'hoch'),S('R','platz',0,1,'2',0,'hoch'),S('L','schliessen',0,2,'3',0,'LR'),...H(s2,'LR')],
     [S('R','vor',20,1,'1',-180),S('L','vor',20,1,'2',-180),S('R','schliessen',0,2,'3'),...spiegel(s2)]],
  b_s_sombrero:['Sombrero',[...H(s1,'hoch'),...H(s2,'kreuz'),...H(s1,'hoch'),...H(s2,'offen')],
     [S('R','vor',18,1,'1',-180),S('L','vor',18,1,'2',-180),S('R','schliessen',0,2,'3'),...spiegel(s2),S('R','vor',18,1,'1',180),S('L','vor',18,1,'2',180),S('R','schliessen',0,2,'3'),...spiegel(s2)]],
  b_s_kreuzgs:['Grundschritt in Kreuzhandfassung',H([...s1,...s2],'kreuz')],
});
}
