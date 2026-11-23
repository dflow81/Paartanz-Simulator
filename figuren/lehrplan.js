/* Lehrplan-Ergänzung: die Figuren der Abgleichliste (figuren/syllabus.js), die bisher fehlten.
   Alle Schrittfolgen hier sind SCHEMATISCH: Fuß, Richtung, Rhythmus und ungefähre Drehung folgen der üblichen Beschreibung
   der Figur, sie wurden aber nicht mit einem Technikbuch abgeglichen (Kennzeichen „s“ in INFO). Armbewegungen werden über
   Haltungen und Führungshinweise gezeigt. Wird nach figuren/info.js geladen und legt Stufe, Typ und Beschreibung selbst fest. */
const LEHRPLAN_NEU=[];   // IDs der hier ergänzten Figuren (für Tests und Doku)
{
const tip=(st,t)=>({...st,tip:t}), ferse=(st,t='Dame: Fersendrehung')=>({...st,df:'ferse',tip:t});
const info={};   // id: [Stufe, Typ, Beschreibung]

/* ---------- Langsamer Walzer ---------- */
tanz('Langsamer Walzer',90,{
  b_w_frsp:['Fallaway Reverse and Slip Pivot',[S('L','vor',34,1,'1',45),S('R','seit',26,.5,'2',45,'prom'),tip(S('L','kreuzHinter',14,.5,'&',0,'prom'),'Fallaway: beide gehen in der Promenade rückwärts'),
     tip(S('R','rueck',14,1,'3',90),'Slip Pivot: kleiner Schritt rück, die Dame wird vor den Herrn gedreht')]],
  b_w_hinge:['Hinge Line',[S('L','vor',34,1,'1',45),S('R','seit',26,1,'2',45),tip(S('L','seit',12,1,'3'),'Hinge: der Herr bleibt auf dem linken Fuß, die Dame kreuzt den linken Fuß hinter und neigt sich'),S('L','halt',0,3,'1')]],
  b_w_cfeder:['Curved Feather',[S('R','vor',38,1,'1',-30),S('L','vor',34,1,'2',-30),tip(S('R','vorAussen',32,1,'3',-30),'Im Bogen nach rechts, außenseitlich enden')]],
  b_w_nfall:['Natural Fallaway',[S('R','vor',38,1,'1',-45),S('L','seit',26,1,'2',-45,'prom'),tip(S('R','kreuzHinter',14,1,'3',0,'prom'),'Fallaway: beide gehen in der Promenade rückwärts'),
     tip(S('L','rueck',14,1,'1',90),'Slip Pivot zurück in die geschlossene Haltung'),S('R','seit',24,1,'2',45),S('L','schliessen',0,1,'3')]],
});
Object.assign(info,{
  w_frsp:[4,'dreh','Fallaway Reverse and Slip Pivot: Linksdrehung, beide fallen in der Promenade rückwärts (Fallaway), dann dreht ein kleiner Rückschritt (Slip Pivot) die Dame vor den Herrn.'],
  w_hinge:[5,'eff','Hinge Line: Linksdrehung, der Herr hält auf dem linken Fuß an, die Dame kreuzt hinter und neigt sich zur Seite – eine Pose über einen Takt.'],
  w_cfeder:[5,'verb','Curved Feather: drei Schritte vorwärts im Bogen nach rechts, endet außenseitlich wie ein Federschritt.'],
  w_nfall:[6,'dreh','Natural Fallaway: Rechtsdrehung in die Promenade, beide fallen rückwärts, Slip Pivot zurück in die geschlossene Haltung.'],
});

/* ---------- Wiener Walzer ---------- */
tanz('Wiener Walzer',174,{
  b_ww_rfleckerl:['Reverse Fleckerl (Drehung am Platz, links)',[S('L','platz',0,1,'1',60),S('R','kreuzSeitHinter',10,1,'2',60),S('L','platz',0,1,'3',60),S('R','platz',0,1,'1',60),S('L','kreuzSeit',10,1,'2',60),S('R','platz',0,1,'3',60)]],
});
Object.assign(info,{ww_rfleckerl:[3,'dreh','Reverse Fleckerl: schnelle Linksdrehung fast am Platz, der rechte Fuß kreuzt abwechselnd hinter und vor.']});

/* ---------- Slowfox ---------- */
tanz('Slowfox',116,{
  b_sf_frsp:['Fallaway Reverse and Slip Pivot',[S('L','vor',40,2,'S',45),S('R','seit',26,1,'Q',45,'prom'),tip(S('L','kreuzHinter',14,1,'Q',0,'prom'),'Fallaway: beide gehen in der Promenade rückwärts'),
     tip(S('R','rueck',14,2,'S',90),'Slip Pivot: kleiner Schritt rück, die Dame wird vor den Herrn gedreht')]],
  b_sf_erw:['Extended Reverse Wave',[S('L','vor',42,2,'S',45),ferse(S('R','seit',30,1,'Q',45)),S('L','rueck',30,1,'Q'),S('R','rueck',35,2,'S',-15),S('L','rueck',32,1,'Q',-15),S('R','rueck',30,1,'Q',-15),
     S('L','rueck',32,2,'S',-15),S('R','rueck',30,1,'Q'),S('L','rueck',28,1,'Q')]],
  b_sf_c3:['Curved Three Step',[S('R','vor',42,2,'S',-30),S('L','vor',36,1,'Q',-30),tip(S('R','vor',34,1,'Q',-30),'Drei Schritte im Bogen nach rechts')]],
  b_sf_oversway:['Oversway',[S('L','vor',36,2,'S',45),S('R','seit',26,1,'Q',45),tip(S('L','seit',20,1,'Q'),'Oversway: weich ins linke Knie, Oberkörper dehnt sich nach links'),S('L','halt',0,2,'S')]],
  b_sf_hcorte:['Hover Corté',[S('R','rueck',34,2,'S',45),tip(S('L','seit',24,1,'Q',45),'Hover: hoch auf die Ballen'),S('R','platz',0,1,'Q')]],
});
Object.assign(info,{
  sf_frsp:[4,'dreh','Fallaway Reverse and Slip Pivot: Linksdrehung, Fallaway in der Promenade, ein Slip Pivot dreht die Dame zurück vor den Herrn.'],
  sf_erw:[5,'verb','Extended Reverse Wave: wie die Reverse Wave, aber mit längerer Rückwärtskurve über mehrere Takte.'],
  sf_c3:[5,'verb','Curved Three Step: Dreierschritt (rechts, links, rechts) vorwärts im Bogen nach rechts.'],
  sf_oversway:[6,'eff','Oversway: nach einer Linksdrehung hält das Paar auf dem linken Fuß, der Oberkörper dehnt sich – eine Pose.'],
  sf_hcorte:[6,'eff','Hover Corté: Rückschritt mit Linksdrehung, Hover auf den Ballen, Gewicht zurück auf den rechten Fuß.'],
});

/* ---------- Quickstep ---------- */
tanz('Quickstep',200,{
  b_q_tipsyl:['Tipsy nach links',[S('R','rueck',30,2,'S',90),S('L','seit',15,.5,'Q'),tip(S('R','schliessen',0,.5,'&'),'Rechten Fuß halb heranziehen'),tip(S('L','vor',15,1,'Q',90),'Kleiner Schritt vor, scharf senken')]],
  b_q_ffnat:['Fallaway Natural Turn',[S('R','vor',38,2,'S',-45),S('L','seit',26,1,'Q',-45,'prom'),tip(S('R','kreuzHinter',14,1,'Q',0,'prom'),'Fallaway: beide gehen in der Promenade rückwärts'),
     tip(S('L','rueck',14,2,'S',-90),'Auf dem linken Fuß nach rechts weiterdrehen, zurück in die geschlossene Haltung')]],
  b_q_scatter:['Scatter Chassés',[S('R','kreuzSeit',30,2,'S',0,'prom'),S('L','seit',24,1,'Q',0,'prom'),S('R','schliessen',0,1,'Q',0,'prom'),S('L','seit',28,2,'S',0,'prom'),
     S('R','kreuzSeit',28,2,'S',0,'prom'),S('L','seit',22,1,'Q',-45),S('R','schliessen',0,1,'Q')]],
  b_q_oversway:['Oversway',[S('L','vor',36,2,'S',45),S('R','seit',26,1,'Q',45),tip(S('L','seit',20,1,'Q'),'Oversway: weich ins linke Knie, Oberkörper dehnt sich nach links'),S('L','halt',0,2,'S')]],
});
Object.assign(info,{
  q_tipsyl:[4,'eff','Tipsy nach links: kurze, schnelle Schritte mit Linksdrehung und deutlichem Sway, scharfes Senken am Ende.'],
  q_ffnat:[4,'dreh','Fallaway Natural Turn: Rechtsdrehung, Fallaway in der Promenade, auf dem linken Fuß zurück in die geschlossene Haltung drehen.'],
  q_scatter:[5,'prom','Scatter Chassés: mehrere Chassés in der Promenade hintereinander, zuletzt zurück in die geschlossene Haltung.'],
  q_oversway:[6,'eff','Oversway: nach einer Linksdrehung hält das Paar auf dem linken Fuß, der Oberkörper dehnt sich – eine Pose.'],
});

/* ---------- Tango ---------- */
tanz('Tango',128,{
  b_t_lunge:['Same Foot Lunge',[tip(S('R','seit',36,1,'Q'),'Same Foot Lunge: beide stehen auf dem rechten Fuß'),S('R','halt',0,2,'S'),S('L','platz',0,1,'Q'),S('R','schliessen',0,1,'Q'),S('R','halt',0,1,'Q')],
     [S('L','schliessen',0,.5,'Q'),S('R','rueck',32,.5,'&'),S('R','halt',0,2,'S'),S('L','platz',0,1,'Q'),S('R','schliessen',0,1,'Q'),S('L','platz',0,1,'Q')]],
  b_t_throw:['Throwaway Oversway',[S('L','vor',32,1,'Q',45),S('R','seit',24,1,'Q',90),tip(S('L','tapRueck',30,2,'S'),'Throwaway: der linke Fuß streckt sich ohne Gewicht nach hinten')]],
});
Object.assign(info,{
  t_lunge:[6,'eff','Same Foot Lunge: beide stehen in einer tiefen Ausfallstellung auf dem rechten Fuß, dann zurück in die geschlossene Haltung.'],
  t_throw:[6,'eff','Throwaway Oversway: Linksdrehung, die Dame wird in eine Streckung geführt, das freie Bein zeigt weit nach hinten.'],
});

/* ---------- Cha-Cha-Cha und Rumba ----------
   Die Figuren werden im Cha-Cha-Rhythmus geschrieben; für die Rumba wird jedes Chassé „4 & 1“ zu einem langsamen Schritt „4“. */
const zuRumba=st=>{ const out=[]; for(let i=0;i<st.length;i++){ const s=st[i], n=st[i+1], m=st[i+2];
    if(s.c==='4'&&n&&n.c==='&'&&m&&m.c==='1'){ const len=Math.min(30,(s.len||0)+(m.len||0)), t=(s.turn||0)+(n.turn||0)+(m.turn||0);
      out.push({...S(s.f,len?s.dir:(m.len?m.dir:s.dir),len,2,'4',t,s.hold||m.hold),...(s.tip?{tip:s.tip}:{})}); i+=2; } else out.push(s); }
  return out.map(x=>{ const y={...x}; if(y.hold===undefined) delete y.hold; return y; }); };
const T=(f,h)=>[S(f,'seit',12,.5,'4',0,h),S(O(f),'schliessen',0,.5,'&',0,h),S(f,'seit',12,1,'1',0,h)];
const TP=(f,h)=>[S(f,'schliessen',0,.5,'4',0,h),S(O(f),'platz',0,.5,'&',0,h),S(f,'platz',0,1,'1',0,h)];
const TV=f=>[S(f,'vor',14,.5,'4'),S(O(f),'schliessen',0,.5,'&'),S(f,'vor',14,1,'1')];
const TB=(f,t=0)=>[S(f,'rueck',12,.5,'4',t),S(O(f),'schliessen',0,.5,'&'),S(f,'rueck',12,1,'1')];
const vH=(h,len=30)=>[S('L','vor',len,1,'2',0,h),S('R','platz',0,1,'3',0,h)], rH=(h,len=30)=>[S('R','rueck',len,1,'2',0,h),S('L','platz',0,1,'3',0,h)];
const pl=(f,h)=>[S(f,'platz',0,1,'2',0,h),S(O(f),'platz',0,1,'3',0,h)];
/* Dame dreht unter dem Arm: zwei Schritte vor mit je der halben Drehung, dann Chassé */
const dDreh=(f,t,len=15)=>[S(f,'vor',len,1,'2',t/2),S(O(f),'vor',len,1,'3',t/2),...T(f)];
const lat={
  /* Rope Spinning: der Herr bleibt am Platz, die Dame geht unter seinem Arm im Kreis um ihn herum (rechts herum) */
  rope:[[...vH('LR'),...T('L','LR'),...H(pl('R'),'hoch'),...T('R','hoch'),...H(pl('L'),'hoch'),...T('L','hoch'),...rH('LR',12),...T('R','LR')],
        [S('R','rueck',30,1,'2'),S('L','platz',0,1,'3'),...T('R'),tip(S('L','vor',25,1,'2',-45),'Rope Spinning: die Dame geht rechts herum um den Herrn, seine Hand kreist über seinem Kopf'),S('R','vor',25,1,'3',-45),
         S('L','vor',14,.5,'4',-45),S('R','schliessen',0,.5,'&'),S('L','vor',14,1,'1',-45),S('R','vor',25,1,'2',-45),S('L','vor',25,1,'3',-45),S('R','vor',14,.5,'4',-45),S('L','schliessen',0,.5,'&'),S('R','vor',14,1,'1',-45),
         S('L','vor',12,1,'2'),S('R','platz',0,1,'3'),...T('L')]],
  /* Sliding Doors: die Dame wechselt in der Schattenstellung hinter dem Herrn die Seite */
  slide:[[...vH('LR',20),...TP('L','LR'),S('R','seit',20,1,'2',0,'schatten'),S('L','platz',0,1,'3',0,'schatten'),...T('R','schatten'),
          S('L','seit',20,1,'2',0,'schatten'),S('R','platz',0,1,'3',0,'schatten'),...T('L','schatten'),...rH('LR',20),...TP('R','LR')]],
  /* Advanced Hip Twist: der Herr dreht mit Chassé nach rechts, die Dame dreht auf jedem Schritt (Swivel) und geht in den Fächer */
  adv:[[S('L','vor',15,1,'2',-45,'LR'),S('R','platz',0,1,'3',0,'LR'),S('L','schliessen',0,.5,'4',-15,'LR'),S('R','platz',0,.5,'&',-15,'LR'),S('L','platz',0,1,'1',-15,'LR'),
        S('R','rueck',12,1,'2',0,'LR'),S('L','platz',0,1,'3',0,'LR'),S('R','seit',10,.5,'4',0,'faecher'),S('L','schliessen',0,.5,'&',0,'faecher'),S('R','seit',10,1,'1',90,'faecher')],
       [S('R','rueck',20,1,'2',-90),S('L','platz',0,1,'3',90),tip(S('R','schliessen',0,.5,'4',-90),'Advanced Hip Twist: die Dame dreht auf jedem Schritt (Swivel)'),S('L','platz',0,.5,'&',90),S('R','platz',0,1,'1',-90),
        S('L','vor',15,1,'2'),S('R','vor',30,1,'3',135),S('L','rueck',12,.5,'4',45),S('R','kreuz',8,.5,'&'),S('L','rueck',12,1,'1')]],
  /* Hip Twist Spiral: wie der offene Hip Twist, aber die Dame dreht vor dem Fächer eine Spirale */
  spiral:[[...vH('LR',12),...TP('L','LR'),...rH('LR',12),...T('R','faecher')],
          [S('R','rueck',25,1,'2'),S('L','platz',0,1,'3'),...TV('R'),tip(S('L','vor',10,1,'2',315),'Spirale: die Dame dreht auf dem linken Fuß fast ganz nach links'),S('R','diagVor',40,1,'3',90),...TB('L',45)]],
  /* Three Threes: drei Drehungen der Dame hintereinander – rechts, links, rechts unter seiner Hand */
  drei:[[...vH('hoch',20),...T('L','hoch'),...rH('hoch',20),...T('R','hoch'),...vH('hoch',20),...T('L','hoch'),...rH('zu'),...T('R')],
        [...dDreh('R',-360),...dDreh('L',360),...dDreh('R',-360),S('L','vor',30,1,'2'),S('R','platz',0,1,'3'),...T('L')]],
};
const fig=(name,[h,d])=>d?[name,h,d]:[name,h];
const rum=([h,d])=>d?[zuRumba(h),zuRumba(d)]:[zuRumba(h)];
tanz('Cha-Cha-Cha',120,{
  b_c_rope:fig('Rope Spinning',lat.rope), b_c_slide:fig('Sliding Doors',lat.slide), b_c_advhip:fig('Advanced Hip Twist (in den Fächer)',lat.adv),
  b_c_hipspiral:fig('Hip Twist Spiral (in den Fächer)',lat.spiral), b_c_drei3:fig('Three Threes (drei Damendrehungen)',lat.drei),
  /* Turkish Towel: die Dame geht hinter dem Herrn herum, ihre Hand gleitet über seine Schultern (wie ein Handtuch) */
  b_c_towel:['Turkish Towel',[...H(pl('L'),'hoch'),...TP('L','hoch'),...H(pl('R'),'schal'),...TP('R','schal'),...H(pl('L'),'schal'),...TP('L','schal'),...H(pl('R'),'LR'),...TP('R','LR')],
     [tip(S('R','vor',16,1,'2',-45),'Turkish Towel: die Dame geht rechts um den Herrn herum, ihre Hand gleitet über seine Schultern'),S('L','vor',16,1,'3',-45),...TV('R'),S('L','vor',16,1,'2',-45),S('R','vor',16,1,'3',-45),...TV('L'),
      S('R','vor',16,1,'2',-45),S('L','vor',16,1,'3',-45),...TV('R'),S('L','vor',16,1,'2',-45),S('R','vor',16,1,'3',-45),...TV('L')]],
  /* Chase: erst dreht der Herr ½ nach rechts weg und die Dame folgt, dann dreht er zurück */
  b_c_chase:['Chase (Verfolgung)',[tip(S('L','platz',0,1,'2',-180,'frei'),'Chase: der Herr dreht sich weg, die Dame folgt ihm'),S('R','platz',0,1,'3',0,'frei'),S('L','vor',14,.5,'4',0,'frei'),S('R','kreuzHinter',6,.5,'&',0,'frei'),S('L','vor',14,1,'1',0,'frei'),
     tip(S('R','vor',10,1,'2',180,'frei'),'Der Herr dreht sich wieder zur Dame'),S('L','platz',0,1,'3',0,'frei'),S('R','schliessen',0,.5,'4',0,'offen'),S('L','platz',0,.5,'&',0,'offen'),S('R','platz',0,1,'1',0,'offen')],
     [S('R','platz',0,1,'2'),S('L','vor',14,1,'3'),S('R','vor',14,.5,'4'),S('L','kreuzHinter',6,.5,'&'),S('R','vor',14,1,'1'),S('L','platz',0,1,'2'),S('R','platz',0,1,'3'),S('L','schliessen',0,.5,'4'),S('R','platz',0,.5,'&'),S('L','platz',0,1,'1')]],
});
tanz('Rumba',100,{
  b_r_rope:fig('Rope Spinning',rum(lat.rope)), b_r_slide:fig('Sliding Doors',rum(lat.slide)), b_r_advhip:fig('Advanced Hip Twist (in den Fächer)',rum(lat.adv)),
  b_r_hipspiral:fig('Hip Twist Spiral (in den Fächer)',rum(lat.spiral)), b_r_drei3:fig('Three Threes (drei Damendrehungen)',rum(lat.drei)),
  /* Opening Out from Reverse Top: halber Grundschritt, kurzer Reverse Top, die Dame öffnet sich zur Seite, Grundschritt rück */
  b_r_ooroten:['Opening Out from Reverse Top',[S('L','vor',25,1,'2'),S('R','platz',0,1,'3'),S('L','seit',25,2,'4'),S('R','seit',14,1,'2',90),tip(S('L','kreuz',8,1,'3',90),'Reverse Top: eng zusammen nach links drehen'),S('R','seit',14,2,'4',90),
     S('L','seit',12,1,'2',0,'RL'),S('R','platz',0,1,'3',0,'RL'),S('L','schliessen',0,2,'4'),S('R','rueck',25,1,'2'),S('L','platz',0,1,'3'),S('R','seit',25,2,'4')],
     [S('R','rueck',25,1,'2'),S('L','platz',0,1,'3'),S('R','seit',25,2,'4'),S('L','seit',14,1,'2',90),S('R','kreuzHinter',8,1,'3',90),S('L','seit',14,2,'4',90),
      tip(S('R','rueck',25,1,'2',-90),'Opening Out: die Dame öffnet sich zur Seite'),S('L','platz',0,1,'3',90),S('R','schliessen',0,2,'4'),S('L','vor',25,1,'2'),S('R','platz',0,1,'3'),S('L','seit',25,2,'4')]],
  /* Three Alemanas: aus dem Fächer dreht die Dame dreimal unter seinem Arm – rechts, links, rechts */
  b_r_alem3:['Three Alemanas (aus dem Fächer)',[S('L','vor',12,1,'2',0,'faecher'),S('R','platz',0,1,'3',0,'faecher'),S('L','schliessen',0,2,'4',0,'faecher'),S('R','rueck',12,1,'2',0,'hoch'),S('L','platz',0,1,'3',0,'hoch'),S('R','seit',12,2,'4',0,'hoch'),
     S('L','platz',0,1,'2',0,'hoch'),S('R','platz',0,1,'3',0,'hoch'),S('L','schliessen',0,2,'4',0,'hoch'),S('R','platz',0,1,'2',0,'hoch'),S('L','platz',0,1,'3',0,'hoch'),S('R','seit',12,2,'4')],
     [S('R','schliessen',0,1,'2'),S('L','vor',25,1,'3'),S('R','vor',28,2,'4'),S('L','vor',15,1,'2',-225),tip(S('R','vor',15,1,'3',-180),'Erste Alemana: rechts unter seiner Hand'),S('L','seit',20,2,'4',-45),
      S('R','vor',12,1,'2',180),tip(S('L','vor',12,1,'3',180),'Zweite: links herum'),S('R','seit',12,2,'4'),S('L','vor',12,1,'2',-180),tip(S('R','vor',12,1,'3',-180),'Dritte: wieder rechts herum'),S('L','seit',12,2,'4')]],
  /* Continuous Hip Twist: der Herr bleibt am Platz, die Dame dreht in jedem halben Takt die Hüfte auf und zu */
  b_r_conthip:['Continuous Hip Twist',H([S('L','vor',12,1,'2'),S('R','platz',0,1,'3'),S('L','schliessen',0,2,'4'),S('R','rueck',12,1,'2'),S('L','platz',0,1,'3'),S('R','schliessen',0,2,'4'),
     S('L','vor',12,1,'2'),S('R','platz',0,1,'3'),S('L','schliessen',0,2,'4'),S('R','rueck',12,1,'2'),S('L','platz',0,1,'3'),S('R','schliessen',0,2,'4')],'LR'),
     [tip(S('R','rueck',15,1,'2',90),'Hip Twist: die Dame dreht auf jedem Schritt die Hüfte auf und zu'),S('L','platz',0,1,'3',-90),S('R','schliessen',0,2,'4'),S('L','rueck',15,1,'2',-90),S('R','platz',0,1,'3',90),S('L','schliessen',0,2,'4'),
      S('R','rueck',15,1,'2',90),S('L','platz',0,1,'3',-90),S('R','schliessen',0,2,'4'),S('L','rueck',15,1,'2',-90),S('R','platz',0,1,'3',90),S('L','schliessen',0,2,'4')]],
});
for(const p of ['c','r']) Object.assign(info,{
  [p+'_rope']:[4,'solo','Rope Spinning: der Herr bleibt am Platz und führt seine Hand über seinem Kopf im Kreis, die Dame geht rechts herum ganz um ihn herum.'],
  [p+'_slide']:[4,'pos','Sliding Doors: in der Schattenstellung wechselt die Dame hinter dem Herrn von einer Seite auf die andere und zurück.'],
  [p+'_advhip']:[4,'pos','Advanced Hip Twist: der Herr dreht mit einem Chassé nach rechts, die Dame dreht auf jedem Schritt die Hüfte auf und geht in den Fächer.'],
  [p+'_hipspiral']:[4,'solo','Hip Twist Spiral: wie der offene Hip Twist, die Dame dreht vor dem Weg in den Fächer eine Spirale nach links.'],
  [p+'_drei3']:[5,'solo','Three Threes: drei Drehungen der Dame hintereinander unter seiner Hand – rechts, links, rechts –, dann ein halber Grundschritt.'],
});
Object.assign(info,{
  c_towel:[3,'pos','Turkish Towel: die Dame geht einmal ganz um den Herrn herum, ihre Hand gleitet dabei über seine Schultern wie ein Handtuch.'],
  c_chase:[5,'solo','Chase: der Herr dreht sich weg und die Dame folgt ihm, dann dreht er zurück – ohne Fassung, „Verfolgung“.'],
  r_ooroten:[3,'pos','Opening Out from Reverse Top: nach einem kurzen Reverse Top öffnet sich die Dame zur Seite, dann Grundschritt rück.'],
  r_alem3:[4,'solo','Three Alemanas: aus dem Fächer dreht die Dame dreimal hintereinander unter seiner Hand – rechts, links, rechts.'],
  r_conthip:[5,'pos','Continuous Hip Twist: der Herr tanzt am Platz, die Dame dreht in jedem halben Takt die Hüfte auf und zu.'],
});

/* ---------- Samba: „1 a 2“ = ¾, ¼, 1 Schlag ---------- */
const sa=(f,dir,len,mid,t=0,h)=>[S(f,dir,len,.75,'1',t,h),S(O(f),mid,mid==='kreuzHinter'?8:0,.25,'a',0,h),S(f,'platz',0,1,'2',0,h)];
const volta=f=>[1,2,3].flatMap(n=>[S(f,'kreuzSeit',15,.75,String(n),0,'LR'),S(O(f),'seit',10,.25,'a',0,'LR')]).concat([S(f,'kreuzSeit',15,1,'4',0,'LR')]);
const voltaD=f=>[1,2,3].flatMap(n=>[S(f,'kreuzSeit',15,.75,String(n)),S(O(f),'seit',10,.25,'a')]).concat([S(f,'kreuzSeit',15,1,'4')]);
tanz('Samba',100,{
  b_sa_cjaca:['Corta Jaca (vereinfacht)',[S('L','vor',25,1,'1'),tip(S('R','vor',12,.5,'2'),'Ferse vor, dann mit der Spitze zurück – rasch im Wechsel'),S('L','platz',0,.5,'&'),S('R','rueck',12,.5,'3'),S('L','platz',0,.5,'&'),S('R','schliessen',0,1,'4')]],
  b_sa_ccvolta:['Criss Cross Volta',[...volta('L'),...volta('R')],[...voltaD('R'),...voltaD('L')]],
  b_sa_rolloff:['Rolling off the Arm',[...sa('L','platz',0,'schliessen',0,'hoch'),...sa('R','platz',0,'schliessen',0,'LR'),...sa('L','platz',0,'schliessen',0,'hoch'),...sa('R','platz',0,'schliessen',0,'zu')],
     [tip(S('R','vor',15,.75,'1',-180),'Die Dame rollt rechts vom Arm ab'),S('L','vor',12,.25,'a',-180),S('R','platz',0,1,'2'),...sa('L','rueck',15,'schliessen'),
      tip(S('R','vor',15,.75,'1',180),'und rollt links zurück'),S('L','vor',12,.25,'a',180),S('R','platz',0,1,'2'),...sa('L','rueck',15,'schliessen')]],
  b_sa_plait:['Plait (Zopf, rückwärts)',[S('L','rueck',28,1,'1',0,'LR'),S('R','rueck',28,1,'2',0,'LR'),S('L','rueck',20,.5,'3',0,'LR'),S('R','rueck',20,.5,'&',0,'LR'),S('L','rueck',20,.5,'4',0,'LR'),S('R','rueck',20,.5,'&',0,'LR')]],
  b_sa_3turn:['Three Step Turn',[tip(S('L','platz',0,1,'1',180,'frei'),'Beide drehen in drei Schritten einmal ganz herum'),S('R','platz',0,1,'2',180,'frei'),S('L','platz',0,1,'3',0,'LR'),S('R','schliessen',0,1,'4',0,'LR')],
     [S('R','platz',0,1,'1',-180),S('L','platz',0,1,'2',-180),S('R','platz',0,1,'3'),S('L','schliessen',0,1,'4')]],
  b_sa_argcross:['Argentine Crosses',[S('L','kreuz',18,.75,'1',-45),S('R','seit',12,.25,'a'),S('L','kreuzHinter',10,1,'2',-45),S('R','kreuz',18,.75,'1',-45),S('L','seit',12,.25,'a'),S('R','kreuzHinter',10,1,'2',-45),
     S('L','kreuz',18,.75,'1',-45),S('R','seit',12,.25,'a'),S('L','kreuzHinter',10,1,'2',-45),S('R','kreuz',18,.75,'1',-45),S('L','seit',12,.25,'a'),S('R','kreuzHinter',10,1,'2',-45)]],
  b_sa_maypole:['Maypole',[...sa('L','platz',0,'schliessen',-45,'hoch'),...sa('R','platz',0,'schliessen',-45,'hoch'),...sa('L','platz',0,'schliessen',-45,'hoch'),...sa('R','platz',0,'schliessen',-45,'LR')],
     [tip(S('R','kreuzSeit',12,.75,'1',-45),'Maypole: die Dame dreht unter seinem Arm rechts um ihn herum'),S('L','seit',8,.25,'a'),S('R','kreuzSeit',10,1,'2',-90),S('L','kreuzSeit',12,.75,'1',-45),S('R','seit',8,.25,'a'),S('L','kreuzSeit',10,1,'2',-90),
      S('R','kreuzSeit',12,.75,'1',-45),S('L','seit',8,.25,'a'),S('R','kreuzSeit',15,1,'2'),S('L','kreuzSeit',12,.75,'1'),S('R','seit',12,.25,'a'),S('L','platz',0,1,'2')]],
  b_sa_contrabota:['Contra Botafogos',[S('L','kreuz',22,.75,'1',-30,'LR'),S('R','seit',18,.25,'a',0,'LR'),S('L','platz',0,1,'2',30,'LR'),S('R','kreuz',22,.75,'1',30,'RL'),S('L','seit',18,.25,'a',0,'RL'),S('R','platz',0,1,'2',-30,'RL'),
     S('L','kreuz',22,.75,'1',-30,'LR'),S('R','seit',18,.25,'a',0,'LR'),S('L','platz',0,1,'2',30,'LR'),S('R','kreuz',22,.75,'1',30,'RL'),S('L','seit',18,.25,'a',0,'RL'),S('R','platz',0,1,'2',-30)]],
  b_sa_locks:['Samba Locks (Herr rückwärts)',[S('L','rueck',20,.75,'1',0,'LR'),S('R','kreuz',8,.25,'a',0,'LR'),S('L','rueck',15,1,'2',0,'LR'),S('R','rueck',20,.75,'1',0,'LR'),S('L','kreuz',8,.25,'a',0,'LR'),S('R','rueck',15,1,'2',0,'LR'),
     S('L','rueck',20,.75,'1',0,'LR'),S('R','kreuz',8,.25,'a',0,'LR'),S('L','rueck',15,1,'2',0,'LR'),S('R','rueck',20,.75,'1',0,'LR'),S('L','kreuz',8,.25,'a',0,'LR'),S('R','rueck',15,1,'2')]],
  b_sa_nroll:['Natural Roll (Rechtsrollen)',[...sa('L','vor',15,'schliessen',-45),...sa('R','rueck',15,'schliessen',-45),...sa('L','vor',15,'schliessen',-45),...sa('R','rueck',15,'schliessen',-45)]],
});
Object.assign(info,{
  sa_cjaca:[2,'eff','Corta Jaca: rasche Schritte mit Ferse vor und Spitze zurück im Wechsel; hier vereinfacht über einen Takt.'],
  sa_ccvolta:[3,'prom','Criss Cross Volta: Voltas nach links und rechts, Herr und Dame wandern dabei in entgegengesetzte Richtungen aneinander vorbei.'],
  sa_rolloff:[3,'solo','Rolling off the Arm: die Dame rollt unter seinem Arm nach rechts ab und wieder links zurück, der Herr tanzt am Platz.'],
  sa_plait:[3,'verb','Plait: der Herr geht rückwärts in schnellen Schritten (langsam, langsam, schnell, schnell …), die Dame folgt vorwärts.'],
  sa_3turn:[4,'solo','Three Step Turn: beide drehen in drei Schritten einmal ganz herum, ohne Fassung, dann wieder Hand in Hand.'],
  sa_argcross:[4,'dreh','Argentine Crosses: Kreuzschritte mit Rechtsdrehung, eine ganze Drehung über zwei Takte.'],
  sa_maypole:[4,'solo','Maypole: der Herr dreht am Platz, die Dame geht unter seinem Arm wie um einen Maibaum herum.'],
  sa_contrabota:[4,'pos','Contra Botafogos: Botafogos im Wechsel mit Kreuzschritt, das Paar öffnet sich abwechselnd zur einen und zur anderen Seite.'],
  sa_locks:[5,'verb','Samba Locks: Kreuzschritte (Locks) im Samba-Rhythmus, der Herr rückwärts, die Dame vorwärts.'],
  sa_nroll:[5,'dreh','Natural Roll: Rollen mit Rechtsdrehung, der Körper schwingt in Wellen vor und zurück.'],
});

/* ---------- Jive ---------- */
const rock=h=>[S('L','rueck',22,1,'1',0,h),S('R','platz',0,1,'2',0,h)];
const ch=(f,c1,c2,len=24,h)=>[S(f,'seit',len,.75,c1,0,h),S(O(f),'schliessen',0,.25,'a',0,h),S(f,'seit',len/2,1,c2,0,h)];
const tri=(f,c1,c2,h)=>[S(f,'platz',0,.75,c1,0,h),S(O(f),'schliessen',0,.25,'a',0,h),S(f,'platz',0,1,c2,0,h)];
tanz('Jive',150,{
  b_j_link:['Link (aus der offenen Haltung zurück in die geschlossene)',[...rock('LR'),tip(S('L','vor',12,.75,'3'),'Link: die Dame kommt heran, zurück in die geschlossene Haltung'),S('R','schliessen',0,.25,'a'),S('L','platz',0,1,'4'),...ch('R','5','6',16)]],
  b_j_windmill:['Windmill',[...rock('offen'),...ch('L','3','4',20,'hochB'),...ch('R','5','6',20,'offen')]],
  b_j_spanish:['Spanish Arms',[...rock('RL'),...tri('L','3','4','hoch'),...tri('R','5','6','RL')],
     [S('R','vor',22,1,'1'),S('L','platz',0,1,'2'),tip(S('R','vor',10,.75,'3',180),'Spanish Arms: die Dame dreht links unter den gefassten rechten Händen'),S('L','vor',10,.25,'a',180),S('R','platz',0,1,'4'),...tri('L','5','6')]],
  b_j_rolloff:['Rolling off the Arm',[...rock('LR'),...tri('L','3','4','hoch'),...tri('R','5','6','LR')],
     [S('R','vor',22,1,'1'),S('L','platz',0,1,'2'),tip(S('R','vor',20,.75,'3',-180),'Die Dame rollt rechts vom Arm ab'),S('L','vor',15,.25,'a',-180),S('R','platz',0,1,'4'),S('L','rueck',20,.75,'5'),S('R','schliessen',0,.25,'a'),S('L','platz',0,1,'6')]],
  b_j_curly:['Curly Whip',[...rock(),...ch('L','3','4',14),tip(S('R','kreuzHinter',10,1,'5',-90,'hoch'),'Curly Whip: kräftig nach rechts drehen, die Dame dreht dabei unter seinem Arm'),S('L','seit',20,1,'6',-90,'hoch'),...ch('R','7','8',14)]],
  b_j_toeheel:['Toe Heel Swivels',[...rock(),tip(S('L','tap',0,1,'3'),'Spitze tippen, auf dem rechten Fuß drehen'),tip(S('L','tapSeit',15,1,'4'),'Ferse tippen'),...ch('L','5','6',16),S('R','tap',0,1,'7'),S('R','tapSeit',15,1,'8'),...ch('R','9','10',16)]],
  b_j_simplespin:['Simple Spin (Dame dreht ganz rechts)',[S('L','platz',0,1,'1',0,'frei'),S('R','platz',0,1,'2',0,'frei'),...ch('L','3','4',14),...ch('R','5','6',14)],
     [tip(S('R','vor',8,1,'1',-360),'Simple Spin: die Dame dreht auf dem rechten Fuß einmal ganz nach rechts'),S('L','platz',0,1,'2'),S('R','seit',14,.75,'3'),S('L','schliessen',0,.25,'a'),S('R','seit',7,1,'4'),S('L','seit',14,.75,'5'),S('R','schliessen',0,.25,'a'),S('L','seit',7,1,'6')]],
  b_j_miami:['Miami Special',[...rock('LR'),...tri('L','3','4','schal'),...tri('R','5','6','schal'),S('L','rueck',22,1,'7',0,'LR'),S('R','platz',0,1,'8',0,'LR')],
     [S('R','vor',22,1,'1'),S('L','platz',0,1,'2'),tip(S('R','vor',20,.75,'3',-90),'Miami Special: die Dame geht hinter dem Herrn herum, ihre Hand gleitet über seinen Nacken'),S('L','vor',12,.25,'a',-45),S('R','vor',20,1,'4',-45),
      S('L','vor',20,.75,'5',-90),S('R','vor',12,.25,'a',-45),S('L','vor',20,1,'6',-45),S('R','vor',22,1,'7'),S('L','platz',0,1,'8')]],
  b_j_chugging:['Chugging',[...rock('offen'),tip(S('L','seit',12,1,'3',0,'offen'),'Chug: Füße geschlossen, mit kleinem Ruck seitwärts'),S('R','schliessen',0,1,'4',0,'offen'),S('L','seit',12,1,'5',0,'offen'),S('R','schliessen',0,1,'6',0,'offen')]],
  b_j_catapult:['Catapult (Dame wird hinaus- und zurückgeschleudert)',[...rock('LR'),S('L','kreuz',30,.75,'3',0,'hoch'),S('R','seit',25,.25,'a',0,'hoch'),S('L','vor',35,1,'4',180,'hoch'),
     S('R','kreuz',30,.75,'5',0,'hoch'),S('L','seit',25,.25,'a',0,'hoch'),S('R','vor',35,1,'6',180,'LR')],
     [S('R','vor',22,1,'1'),S('L','platz',0,1,'2'),tip(S('R','seit',45,.75,'3'),'Catapult: die Dame wird an ihm vorbei hinausgeschleudert …'),S('L','vor',35,.25,'a'),S('R','schliessen',0,1,'4',180),
      tip(S('L','seit',45,.75,'5'),'… und wieder zurück'),S('R','vor',35,.25,'a'),S('L','schliessen',0,1,'6',180)]],
  b_j_stalking:['Stalking Walks',[S('L','vor',25,1,'1',0,'LR'),tip(S('R','kick',20,1,'2',0,'LR'),'Stalking: das freie Knie hebt sich langsam'),S('R','vor',25,1,'3',0,'LR'),S('L','kick',20,1,'4',0,'LR'),...ch('L','5','6',20,'LR'),...ch('R','7','8',20,'LR')]],
});
Object.assign(info,{
  j_link:[2,'verb','Link: Rückschritt, dann holt der Herr die Dame mit zwei Chassés zurück in die geschlossene Haltung.'],
  j_windmill:[3,'eff','Windmill: beide Hände gefasst, die Arme schwingen bei den Chassés hoch wie Windmühlenflügel.'],
  j_spanish:[3,'solo','Spanish Arms: die Dame dreht links unter den gefassten rechten Händen.'],
  j_rolloff:[3,'solo','Rolling off the Arm: die Dame rollt rechts vom Arm ab, der Herr tanzt am Platz.'],
  j_curly:[4,'dreh','Curly Whip: Peitsche (Whip) mit kräftiger Rechtsdrehung, die Dame dreht dabei unter seinem Arm.'],
  j_toeheel:[4,'eff','Toe Heel Swivels: der freie Fuß tippt Spitze und Ferse, während der Standfuß dreht, dann ein Chassé – auf beiden Seiten.'],
  j_simplespin:[4,'solo','Simple Spin: die Dame dreht auf dem rechten Fuß einmal ganz nach rechts, ohne Fassung, dann zwei Chassés.'],
  j_miami:[4,'pos','Miami Special: die Dame geht hinter dem Herrn herum, ihre Hand gleitet über seinen Nacken, dann wieder gegenüber.'],
  j_chugging:[5,'eff','Chugging: mit geschlossenen Füßen in kleinen Rucken seitwärts.'],
  j_catapult:[5,'pos','Catapult: die Dame wird am Herrn vorbei hinausgeschleudert und sofort wieder zurückgeholt.'],
  j_stalking:[5,'eff','Stalking Walks: langsame, schleichende Schritte mit gehobenem Knie, dann zwei Chassés.'],
});

/* ---------- Paso Doble: ein Schritt pro Schlag, beginnt rechts ---------- */
const sepH=[tip(S('R','platz',0,1,'1'),'Appell: kräftig mit dem rechten Fuß aufstampfen'),S('L','vor',25,1,'2'),S('R','schliessen',0,1,'3',0,'LR'),S('L','platz',0,1,'4',0,'LR'),S('R','rueck',25,1,'5',0,'LR'),S('L','schliessen',0,1,'6',0,'LR'),S('R','platz',0,1,'7'),S('L','platz',0,1,'8')];
const sepD=[S('L','platz',0,1,'1'),S('R','rueck',25,1,'2'),tip(S('L','rueck',25,1,'3'),'Separation: die Dame geht vom Herrn weg …'),S('R','schliessen',0,1,'4'),tip(S('L','vor',25,1,'5'),'… und wieder heran'),S('R','vor',25,1,'6'),S('L','schliessen',0,1,'7'),S('R','platz',0,1,'8')];
tanz('Paso Doble',120,{
  b_pd_sep:['Separation',sepH,sepD],
  b_pd_sixteen:['Sixteen (Separation mit Damendrehung)',[...sepH,...[9,10,11,12,13,14,15,16].map(n=>S(n%2?'R':'L','platz',0,1,String(n),0,n<13?'hoch':n<15?'LR':'zu'))],
     [...sepD,tip(S('L','vor',12,1,'9',-90),'Die Dame dreht rechts unter seinem Arm'),S('R','vor',12,1,'10',-90),S('L','vor',12,1,'11',-90),S('R','vor',12,1,'12',-90),S('L','rueck',24,1,'13'),S('R','schliessen',0,1,'14'),S('L','platz',0,1,'15'),S('R','platz',0,1,'16')]],
  b_pd_gcircle:['Grand Circle',[tip(S('R','platz',0,1,'1',0,'prom'),'Appell, dann dreht der Herr am Platz, die Dame läuft in der Promenade um ihn herum'),...[2,3,4,5,6,7,8].map(n=>S(n%2?'R':'L','platz',0,1,String(n),-360/7,n<8?'prom':'zu'))]],
  b_pd_lapasse:['La Passe',[tip(S('R','platz',0,1,'1'),'Appell'),S('L','seit',30,1,'2',0,'prom'),S('R','kreuzSeit',25,1,'3',0,'prom'),S('L','seit',25,1,'4',0,'prom'),S('R','kreuzSeit',25,1,'5',-45,'prom'),S('L','seit',20,1,'6',-45),S('R','schliessen',0,1,'7',-45),S('L','platz',0,1,'8',-45)]],
  b_pd_twist:['Twist Turn',[tip(S('R','kreuzHinter',12,1,'1'),'Der rechte Fuß kreuzt hinter den linken'),tip(S('L','platz',0,1,'2',-120,'hoch'),'Twist: auf beiden Füßen nach rechts aufdrehen'),S('R','platz',0,1,'3',-120,'hoch'),S('L','platz',0,1,'4',-120),
     ...[5,6,7,8].map(n=>S(n%2?'R':'L','platz',0,1,String(n)))]],
  b_pd_spanish:['Spanish Lines',[tip(S('R','platz',0,1,'1'),'Appell'),S('L','vor',25,1,'2'),S('R','platz',0,1,'3',0,'hoch'),S('L','platz',0,1,'4',0,'hoch'),tip(S('R','rueck',25,1,'5',0,'LR'),'Spanische Linie: beide strecken sich zur Seite'),S('L','schliessen',0,1,'6',0,'LR'),tip(S('R','schliessen',0,1,'7'),'Füße schließen, zurück in die geschlossene Haltung'),S('L','platz',0,1,'8')],
     [S('L','platz',0,1,'1'),S('R','rueck',25,1,'2'),tip(S('L','vor',10,1,'3',-180),'Die Dame dreht unter seinem Arm in die Linie'),S('R','vor',10,1,'4',-180),S('L','platz',0,1,'5'),S('R','platz',0,1,'6'),S('L','platz',0,1,'7'),S('R','platz',0,1,'8')]],
  b_pd_coup:['Coup de Pique',[tip(S('R','tap',0,1,'1'),'Coup de Pique: die Fußspitze sticht kurz in den Boden'),S('R','seit',20,1,'2'),S('L','schliessen',0,1,'3'),S('R','platz',0,1,'4'),S('L','tap',0,1,'5'),S('L','seit',20,1,'6'),S('R','schliessen',0,1,'7'),S('L','platz',0,1,'8')]],
  b_pd_flamenco:['Flamenco Taps',[tip(S('R','platz',0,1,'1'),'Appell'),tip(S('L','tapRueck',12,1,'2'),'Die Fußspitze tippt hinten (Flamenco-Tap)'),S('L','tap',0,1,'3'),S('L','platz',0,1,'4'),S('R','tapRueck',12,1,'5'),S('R','tap',0,1,'6'),S('R','platz',0,1,'7'),S('L','platz',0,1,'8')]],
  b_pd_farol:['Farol',[tip(S('R','platz',0,1,'1'),'Appell'),S('L','vor',25,1,'2'),S('R','platz',0,1,'3',0,'hoch'),S('L','platz',0,1,'4',0,'hoch'),S('R','rueck',25,1,'5',0,'LR'),S('L','schliessen',0,1,'6',0,'LR'),S('R','platz',0,1,'7'),S('L','platz',0,1,'8')],
     [S('L','platz',0,1,'1'),S('R','rueck',25,1,'2'),tip(S('L','vor',10,1,'3',-180),'Farol: die Dame dreht rechts unter seinem Arm wie ein Leuchtfeuer'),S('R','vor',10,1,'4',-180),S('L','platz',0,1,'5'),S('R','platz',0,1,'6'),S('L','platz',0,1,'7'),S('R','platz',0,1,'8')]],
  b_pd_fregolina:['Fregolina',[tip(S('R','platz',0,1,'1'),'Appell'),S('L','seit',25,1,'2',0,'prom'),S('R','kreuzSeit',20,1,'3',0,'prom'),S('L','platz',0,1,'4',0,'hoch'),S('R','platz',0,1,'5',0,'hoch'),S('L','platz',0,1,'6',0,'LR'),S('R','platz',0,1,'7'),S('L','platz',0,1,'8')],
     [S('L','platz',0,1,'1'),S('R','seit',25,1,'2'),S('L','kreuzSeit',20,1,'3'),tip(S('R','vor',10,1,'4',180),'Fregolina: die Dame dreht links unter seinem Arm'),S('L','vor',10,1,'5',180),S('R','platz',0,1,'6'),S('L','platz',0,1,'7'),S('R','platz',0,1,'8')]],
  b_pd_syncsep:['Syncopated Separation',sepH,
     [S('L','platz',0,1,'1'),S('R','rueck',25,1,'2'),S('L','rueck',25,1,'3'),S('R','schliessen',0,1,'4'),tip(S('L','vor',25,.5,'5'),'Synkopiert: vor mit Kreuzschritt auf „&“'),S('R','kreuzHinter',8,.5,'&'),S('L','vor',17,1,'6'),S('R','schliessen',0,.5,'7'),S('L','platz',0,.5,'&'),S('R','platz',0,1,'8')]],
});
Object.assign(info,{
  pd_sep:[2,'pos','Separation: nach dem Appell geht die Dame vom Herrn weg und wieder heran, der Herr bleibt fast am Platz.'],
  pd_sixteen:[2,'solo','Sixteen: 16 Schläge – eine Separation, dann dreht die Dame rechts unter seinem Arm.'],
  pd_gcircle:[3,'dreh','Grand Circle: der Herr dreht am Platz, die Dame läuft in der Promenade einmal um ihn herum.'],
  pd_lapasse:[3,'prom','La Passe: Promenadenschritte seitwärts, die zweite Hälfte mit halber Rechtsdrehung.'],
  pd_twist:[3,'dreh','Twist Turn: der rechte Fuß kreuzt hinter, das Paar dreht auf beiden Füßen ganz nach rechts auf.'],
  pd_spanish:[3,'eff','Spanish Lines: die Dame dreht unter seinem Arm in eine gestreckte Linie zur Seite.'],
  pd_coup:[4,'eff','Coup de Pique: die Fußspitze sticht kurz in den Boden, dann Chassé – auf beiden Seiten.'],
  pd_flamenco:[4,'eff','Flamenco Taps: die Fußspitze tippt hinten und vorn wie im Flamenco, auf beiden Seiten.'],
  pd_farol:[4,'solo','Farol: die Dame dreht rechts unter seinem Arm, der Herr geht vor und zurück.'],
  pd_fregolina:[4,'solo','Fregolina: Promenade, dann dreht die Dame links unter seinem Arm.'],
  pd_syncsep:[4,'pos','Syncopated Separation: wie die Separation, die Dame kommt mit einem schnellen Kreuzschritt zurück.'],
});

/* ---------- Salsa: 1-2-3, Pause, 5-6-7, Pause ---------- */
const ench=[[S('L','vor',20,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3',0,'hoch'),S('R','seit',50,1,'5',0,'hoch'),S('L','vor',60,1,'6',180,'hoch'),S('R','schliessen',0,2,'7',0,'LR')],
            [S('R','rueck',20,1,'1'),S('L','platz',0,1,'2'),S('R','schliessen',0,2,'3'),S('L','vor',50,1,'5'),S('R','vor',45,1,'6',180),S('L','schliessen',0,2,'7')]];
const s2=[S('R','rueck',25,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')];
tanz('Salsa',170,{
  b_s_setenta:['Setenta (Platzwechsel mit Drehung, dann Damendrehung rechts)',[...ench[0],S('L','vor',20,1,'1',0,'LR'),S('R','platz',0,1,'2',0,'LR'),S('L','schliessen',0,2,'3',0,'hoch'),S('R','rueck',25,1,'5',0,'hoch'),S('L','platz',0,1,'6',0,'hoch'),S('R','schliessen',0,2,'7',0,'LR')],
     [...ench[1],S('R','rueck',20,1,'1'),S('L','platz',0,1,'2'),S('R','schliessen',0,2,'3'),tip(S('L','vor',20,1,'5',-180),'Die Dame dreht rechts unter seinem Arm'),S('R','vor',20,1,'6',-180),S('L','schliessen',0,2,'7')]],
  b_s_sacala:['Sácala',[S('L','vor',20,1,'1'),S('R','seit',45,1,'2',90,'LR'),S('L','schliessen',0,2,'3',0,'hoch'),S('R','platz',0,1,'5',0,'hoch'),S('L','vor',35,1,'6',90,'hoch'),S('R','schliessen',0,2,'7',0,'LR')],
     [S('R','rueck',20,1,'1'),S('L','platz',0,1,'2'),S('R','vor',25,2,'3'),S('L','vor',40,1,'5'),tip(S('R','vor',20,1,'6',-180),'Sácala: die Dame dreht rechts unter seinem Arm hinaus'),S('L','schliessen',0,2,'7')]],
  b_s_exhibela:['Exhíbela',[...H([S('L','rueck',20,1,'1'),S('R','platz',0,1,'2')],'hoch'),S('L','schliessen',0,2,'3',0,'LR'),...H(s2,'LR')],
     [tip(S('R','vor',20,1,'1',180),'Exhíbela: die Dame dreht links und zeigt sich'),S('L','vor',20,1,'2',180),S('R','schliessen',0,2,'3'),S('L','vor',25,1,'5'),S('R','platz',0,1,'6'),S('L','schliessen',0,2,'7')]],
  b_s_kentucky:['Kentucky',[S('L','platz',0,1,'1',0,'hoch'),S('R','platz',0,1,'2',0,'hoch'),S('L','schliessen',0,2,'3',0,'hoch'),tip(S('R','vor',12,1,'5',-180,'hoch'),'Jetzt dreht der Herr rechts unter den Armen'),S('L','vor',12,1,'6',-180,'hoch'),S('R','schliessen',0,2,'7',0,'LR')],
     [tip(S('R','vor',18,1,'1',180),'Erst dreht die Dame links'),S('L','vor',18,1,'2',180),S('R','schliessen',0,2,'3'),S('L','platz',0,1,'5'),S('R','platz',0,1,'6'),S('L','schliessen',0,2,'7')]],
  b_s_adios:['Adiós (Herrendrehung links)',[S('L','vor',20,1,'1',0,'LR'),S('R','platz',0,1,'2',0,'LR'),S('L','schliessen',0,2,'3',0,'LR'),tip(S('R','kreuz',12,1,'5',180,'frei'),'Adiós: der Herr dreht links weg'),S('L','vor',12,1,'6',180,'frei'),S('R','schliessen',0,2,'7',0,'offen')],
     [S('R','rueck',20,1,'1'),S('L','platz',0,1,'2'),S('R','schliessen',0,2,'3'),S('L','platz',0,1,'5'),S('R','platz',0,1,'6'),S('L','schliessen',0,2,'7')]],
  b_s_tumba:['Tumba Francesa',[S('L','platz',0,1,'1',0,'hoch'),S('R','platz',0,1,'2',0,'hoch'),S('L','schliessen',0,2,'3',0,'LR'),tip(S('R','kreuz',12,1,'5',180,'frei'),'Jetzt dreht der Herr links'),S('L','vor',12,1,'6',180,'frei'),S('R','schliessen',0,2,'7',0,'offen')],
     [tip(S('R','vor',18,1,'1',-180),'Erst dreht die Dame rechts unter seinem Arm'),S('L','vor',18,1,'2',-180),S('R','schliessen',0,2,'3'),S('L','platz',0,1,'5'),S('R','platz',0,1,'6'),S('L','schliessen',0,2,'7')]],
  b_s_montana:['Montaña',[S('L','vor',20,1,'1'),S('R','platz',0,1,'2',0,'korb'),S('L','schliessen',0,2,'3',0,'korb'),S('R','rueck',25,1,'5',0,'korb'),S('L','platz',0,1,'6',0,'hoch'),S('R','schliessen',0,2,'7',0,'LR')],
     [S('R','rueck',20,1,'1'),tip(S('L','vor',34,1,'2',180),'Montaña: die Dame dreht links ein, an seine rechte Seite'),S('R','platz',0,2,'3'),S('L','vor',18,1,'5'),tip(S('R','vor',18,1,'6',-180),'und rechts wieder hinaus'),S('L','schliessen',0,2,'7')]],
});
Object.assign(info,{
  s_setenta:[3,'pos','Setenta: Platzwechsel mit Damendrehung (wie Enchufla), danach dreht die Dame rechts unter seinem Arm.'],
  s_sacala:[3,'solo','Sácala: der Herr macht die Bahn frei, die Dame geht vorbei und dreht rechts unter seinem Arm hinaus.'],
  s_exhibela:[3,'solo','Exhíbela: die Dame dreht auf 1-2-3 links und „zeigt sich“, dann Grundschritt.'],
  s_kentucky:[4,'solo','Kentucky: erst dreht die Dame links, dann der Herr rechts unter den gefassten Händen.'],
  s_adios:[4,'solo','Adiós: Grundschritt, dann dreht der Herr auf 5-6-7 links weg und fasst wieder beide Hände.'],
  s_tumba:[4,'solo','Tumba Francesa: die Dame dreht auf 1-2-3 rechts, der Herr auf 5-6-7 links.'],
  s_montana:[4,'pos','Montaña: die Dame dreht links ein an seine rechte Seite und rechts wieder hinaus.'],
});

/* ---------- Discofox: drei Schläge „Schritt, Schritt, Tap“ ---------- */
const Z=[['1','2','3'],['4','5','6'],['7','8','9'],['10','11','12']];
const amPl=(z,h,h2=h,t=0)=>[S('L','platz',0,1,z[0],t,h),S('R','platz',0,1,z[1],t,h),S('L','tap',0,1,z[2],0,h2)];
const vorH=(z,h,l=22)=>[S('L','vor',l,1,z[0],0,h),S('R','vor',l,1,z[1],0,h),S('L','tap',0,1,z[2],0,h)];
const rueckH=(z,h,l=22)=>[S('L','rueck',l,1,z[0],0,h),S('R','rueck',l,1,z[1],0,h),S('L','tap',0,1,z[2],0,h)];
const dDrehD=(z,t,l=18)=>[S('R','vor',l,1,z[0],t/2),S('L','vor',l,1,z[1],t/2),S('R','tap',0,1,z[2])];
const dVor=(z,l=22,t=0)=>[S('R','vor',l,1,z[0],t),S('L','vor',l,1,z[1],t),S('R','tap',0,1,z[2])];
const dRueck=(z,l=22)=>[S('R','rueck',l,1,z[0]),S('L','rueck',l,1,z[1]),S('R','tap',0,1,z[2])];
tanz('Discofox',120,{
  b_d_lasso:['Lasso (Dame geht um den Herrn herum)',[...amPl(Z[0],'hoch','hoch',-45),...amPl(Z[1],'hoch','hoch',-45),...amPl(Z[2],'hoch','hoch',-45),...amPl(Z[3],'hoch','LR',-45)],
     [tip(S('R','vor',20,1,'1',-45),'Lasso: die Dame geht rechts herum um den Herrn, seine Hand kreist über seinem Kopf'),S('L','vor',20,1,'2',-45),S('R','tap',0,1,'3'),...dVor(Z[1],20,-45),...dVor(Z[2],20,-45),...dVor(Z[3],20,-45)]],
  b_d_seilwurf:['Seilwurf (Dame dreht hinaus und wieder herein)',[...amPl(Z[0],'hoch','LR'),...amPl(Z[1],'LR'),...amPl(Z[2],'hoch','LR'),...amPl(Z[3],'LR')],
     [...dDrehD(Z[0],-360),...dRueck(Z[1],18),...dDrehD(Z[2],360),...dRueck(Z[3],18)]],
  b_d_sliding:['Sliding Doors (Dame wechselt hinter dem Herrn die Seite)',[...vorH(Z[0],'LR',15),...amPl(Z[1],'schatten'),...amPl(Z[2],'schatten'),...rueckH(Z[3],'LR',15)]],
});
Object.assign(info,{
  d_lasso:[4,'solo','Lasso: der Herr dreht am Platz und führt seine Hand über seinem Kopf im Kreis, die Dame geht rechts herum um ihn herum.'],
  d_seilwurf:[4,'solo','Seilwurf: die Dame dreht rechts hinaus, geht zurück, dreht links wieder herein – wie ein geworfenes Seil.'],
  d_sliding:[4,'pos','Sliding Doors: in der Schattenstellung wechselt die Dame hinter dem Herrn von einer Seite auf die andere.'],
});

/* Lasso, Turkish Towel, Alemana: Die Dame geht um den Herrn herum bzw. dreht unter seinem Arm – endet die vorige Figur eng, gleicht sie den Abstand in den ersten Schritten ganz aus */
BUILTIN.b_d_lasso.ganz=BUILTIN.b_c_towel.ganz=BUILTIN.b_c_alemana.ganz=BUILTIN.b_r_alemana.ganz=true;
for(const [k,[st,art,text]] of Object.entries(info)){ INFO['b_'+k]=[st,art,text,'s']; LEHRPLAN_NEU.push('b_'+k); }
}

/* Discofox Push & Pull (schematisch): Auf 1-2-3 schiebt der Herr die Dame weg (sie geht zwei Schritte rück), auf 4-5-6 zieht er sie
   wieder heran (zwei Schritte vor). Der Herr tanzt am Platz. Mit einer Hand (Hand L–R) und mit beiden Händen (offene Haltung).
   Armführung: Stopp (Hand hält dagegen, schiebt) und Zug (Hand holt heran), siehe figuren/arme.js. */
{
const z1=['1','2','3'], z2=['4','5','6'];
const herr=h=>[{...S('L','platz',0,1,z1[0],0,h),tip:'Push: die Hand gibt einen kleinen Impuls nach vorn, die Dame geht zurück',arm:'stopp'},S('R','platz',0,1,z1[1],0,h),S('L','tap',0,1,z1[2],0,h),
  {...S('L','platz',0,1,z2[0],0,h),tip:'Pull: die Hand holt die Dame wieder heran',arm:'zug'},S('R','platz',0,1,z2[1],0,h),S('L','tap',0,1,z2[2],0,h)];
const dame=[S('R','rueck',12,1,z1[0]),S('L','rueck',12,1,z1[1]),S('R','tap',0,1,z1[2]),S('R','vor',12,1,z2[0]),S('L','vor',12,1,z2[1]),S('R','tap',0,1,z2[2])];
tanz('Discofox',120,{
  b_d_pushpull1:['Push & Pull (mit einer Hand)',herr('LR'),dame],
  b_d_pushpull2:['Push & Pull (mit beiden Händen)',herr('offen'),dame],
});
BUILTIN.b_d_pushpull1.ganz=BUILTIN.b_d_pushpull2.ganz=true;   // Abstand am Anfang an die offene Haltung anpassen
INFO.b_d_pushpull1=[2,'eff','Push & Pull mit einer Hand (Hand L–R): Auf 1-2-3 schiebt der Herr die Dame mit einem kleinen Impuls weg, sie geht zwei Schritte zurück; auf 4-5-6 holt er sie wieder heran. Der Herr bleibt am Platz.','s'];
INFO.b_d_pushpull2=[2,'eff','Push & Pull mit beiden Händen (offene Haltung): Auf 1-2-3 schiebt der Herr die Dame weg, auf 4-5-6 zieht er sie wieder heran. Beide Hände geben den Impuls gleichzeitig.','s'];
}

/* Discofox Körbchen mit Drehung (schematisch): eindrehen, im Körbchen gemeinsam eine ganze Drehung (rechts herum, die Dame innen),
   ausdrehen. 4 × 6 Zählzeiten. */
{
const t=['1','2','3','4','5','6'];
const ein=[{...S('L','vor',28,1,t[0],0,'korb'),tip:'Körbchen: die Dame dreht links ein, seine linke Hand führt'},S('R','vor',28,1,t[1],0,'korb'),S('L','tap',0,1,t[2],0,'korb'),
  S('L','rueck',28,1,t[3],0,'korb'),S('R','rueck',28,1,t[4],0,'korb'),S('L','tap',0,1,t[5],0,'korb')];
const dreh=[{...S('L','vor',15,1,t[0],-90,'korb'),tip:'Im Körbchen gemeinsam rechts herum drehen – der Herr geht außen, die Dame innen'},S('R','vor',15,1,t[1],-90,'korb'),S('L','tap',0,1,t[2],0,'korb'),
  S('L','vor',15,1,t[3],-90,'korb'),S('R','vor',15,1,t[4],-90,'korb'),S('L','tap',0,1,t[5],0,'korb')];
const aus=[{...S('L','rueck',28,1,t[0],0,'LR'),tip:'Ausdrehen: die Dame dreht rechts heraus, der Herr gibt ihr Platz'},S('R','rueck',28,1,t[1],0,'LR'),S('L','tap',0,1,t[2],0,'LR'),
  S('L','vor',28,1,t[3],0,'LR'),S('R','vor',28,1,t[4],0,'LR'),S('L','tap',0,1,t[5],0,'LR')];
tanz('Discofox',120,{ b_d_korbdreh:['Körbchen mit Drehung (eindrehen, gemeinsam drehen, ausdrehen)',[...ein,...dreh,...aus]] });
INFO.b_d_korbdreh=[2,'pos','Körbchen mit Drehung: Der Herr dreht die Dame links ein ins Körbchen, beide drehen darin gemeinsam eine ganze Drehung rechts herum (der Herr geht außen, die Dame innen), dann dreht die Dame rechts wieder aus.','s'];
}
