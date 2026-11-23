/* Noch mehr Figuren für alle Tänze – übliche Tanzschul- und Grundfiguren, vereinfacht auf die Schritte.
   Wird nach den anderen Figurendateien geladen und ergänzt die dort angelegten Tänze.
   Ohne eigene Schritte tanzt die Dame gegengleich. */
{
const n4=fn=>['1','2','3','4'].map((c,i)=>fn(i%2?'R':'L',c));
const w3=(f,a,b,c,t=0,h)=>[S(f,a[0],a[1],1,c[0],t,h),S(O(f),b[0],b[1],1,c[1],t,h),S(f,'schliessen',0,1,c[2],t,h)];
const SQQ=(f,dir,len,t=0)=>[S(f,dir,len,2,'S',t),S(O(f),'seit',22,1,'Q',t),S(f,'schliessen',0,1,'Q',t)];

/* ---------- Langsamer Walzer ---------- */
tanz('Langsamer Walzer',90,{
  b_w_wiege:['Wiegeschritt (vor, zurück)',[S('L','vor',35,1,'1'),S('R','platz',0,1,'2'),S('L','tap',0,1,'3'),S('L','rueck',35,1,'1'),S('R','platz',0,1,'2'),S('L','tap',0,1,'3')]],
  b_w_balance:['Seitliche Balance (links und rechts)',[S('L','seit',30,1,'1'),S('R','tap',0,1,'2'),S('R','tap',0,1,'3'),S('R','seit',30,1,'1'),S('L','tap',0,1,'2'),S('L','tap',0,1,'3')]],
  b_w_prom:['Promenade mit Chassé',[S('L','seit',35,1,'1',0,'prom'),S('R','kreuzSeit',30,1,'2',0,'prom'),S('L','seit',15,.5,'3',0,'prom'),S('R','schliessen',0,.5,'&',0,'prom'),S('L','seit',25,1,'1',0,'prom'),{...S('R','vorAussen',30,1,'2'),tip:'Aus der Promenade zurück in die geschlossene Haltung'},S('L','tap',0,1,'3')]],
  b_w_weave:['Flechtschritt (Weave)',[S('R','vor',35,1,'1',45),S('L','seit',25,1,'2',45),S('R','rueck',30,1,'3'),S('L','rueck',30,1,'1',-45),S('R','seit',25,1,'2',-45),S('L','schliessen',0,1,'3')]],
  b_w_telemark:['Telemark (offene Linksdrehung)',[S('L','vor',38,1,'1',45),S('R','seit',28,1,'2',45),{...S('L','diagVor',25,1,'3',0,'prom'),tip:'Telemark: Herr dreht links und öffnet zur Promenade'},S('R','kreuzSeit',25,1,'1',0,'prom'),S('L','seit',20,1,'2'),{...S('R','schliessen',0,1,'3'),tip:'zurück in die geschlossene Haltung'}]],
  b_w_hover:['Schwebeschritt (Hover)',[S('L','vor',38,1,'1'),{...S('R','seit',25,1,'2'),tip:'Hover: auf 2 hoch auf die Ballen, kurz schweben'},S('L','tap',0,1,'3')]],
});

/* ---------- Wiener Walzer ---------- */
tanz('Wiener Walzer',174,{
  b_ww_balance:['Balance seitwärts',[S('L','seit',28,1,'1'),S('R','tap',0,1,'2'),S('R','tap',0,1,'3'),S('R','seit',28,1,'1'),S('L','tap',0,1,'2'),S('L','tap',0,1,'3')]],
  b_ww_vor:['Vorwärts-Wechsel (gerade)',[S('L','vor',30,1,'1'),S('R','seit',20,1,'2'),S('L','schliessen',0,1,'3'),S('R','vor',30,1,'1'),S('L','seit',20,1,'2'),S('R','schliessen',0,1,'3')]],
  b_ww_fleckerl:['Fleckerl-Ansatz (Drehung am Platz, rechts)',[S('R','platz',0,1,'1',-60),S('L','kreuzSeitHinter',10,1,'2',-60),S('R','platz',0,1,'3',-60),S('L','platz',0,1,'1',-60),S('R','kreuzSeit',10,1,'2',-60),S('L','platz',0,1,'3',-60)]],
});

/* ---------- Tango ---------- */
tanz('Tango',128,{
  b_t_fallaway:['Fallaway-Promenade',[S('L','seit',35,2,'S',0,'prom'),S('R','kreuzSeit',30,1,'Q',0,'prom'),S('L','rueck',25,1,'Q',0,'prom'),{...S('R','rueck',25,2,'S'),tip:'Fallaway: beide gehen rückwärts in der Promenade'},S('L','seit',20,1,'Q'),S('R','schliessen',0,1,'Q')]],
  b_t_wiegel:['Wiegeschritt mit Linksdrehung',[S('L','vor',30,1,'Q',45),S('R','platz',0,1,'Q',0),S('L','rueck',28,2,'S',0),S('R','rueck',28,1,'Q',45),S('L','seit',20,1,'Q'),S('R','schliessen',0,2,'S')]],
  b_t_staccato:['Stakkato-Gehschritte (schnell, schnell, lang)',[S('L','vor',28,1,'Q'),S('R','vor',28,1,'Q'),S('L','vor',35,2,'S'),S('R','vor',28,1,'Q'),S('L','vor',28,1,'Q'),S('R','vor',35,2,'S')]],
  b_t_brush:['Brush Tap (Wischer)',[S('L','vor',35,1,'Q'),S('R','seit',20,1,'Q'),{...S('L','tap',0,1,'&'),tip:'Brush: linker Fuß streift kurz an den rechten heran'},S('L','seit',20,1,'Q'),S('R','schliessen',0,2,'S')]],
});

/* ---------- Slowfox ---------- */
tanz('Slowfox',116,{
  b_sf_wellen:['Wellenschritt (Wave)',[S('L','vor',42,2,'S',45),S('R','seit',30,1,'Q',45),S('L','rueck',30,1,'Q'),S('R','rueck',35,2,'S'),S('L','rueck',30,1,'Q',-45),S('R','rueck',28,1,'Q',-45)]],
  b_sf_hover:['Hover-Telemark',[S('L','vor',42,2,'S'),{...S('R','seit',28,1,'Q',0,'prom'),tip:'Hover: hoch auf die Ballen, dann zur Promenade öffnen'},S('L','diagVor',25,1,'Q',0,'prom'),S('R','kreuzSeit',25,2,'S',0,'prom'),S('L','seit',20,1,'Q'),S('R','vorAussen',30,1,'Q')]],
  b_sf_impetus:['Rechtsdrehung mit Fersendrehung (Impetus)',[S('R','vor',42,2,'S',-45),S('L','seit',28,1,'Q',-45),S('R','schliessen',0,1,'Q',-45),S('L','rueck',32,2,'S',-45),{...S('R','ferse',0,1,'Q',-90),tip:'Fersendrehung: auf der Ferse drehen, Füße geschlossen'},S('L','diagRueck',28,1,'Q')]],
});

/* ---------- Quickstep ---------- */
tanz('Quickstep',200,{
  b_q_tipple:['Tipple-Chassé rechts',[S('R','vor',35,2,'S',-45),S('L','seit',25,1,'Q',-45),S('R','schliessen',0,1,'Q',-45),S('L','seit',25,2,'S'),S('R','seit',20,1,'Q'),S('L','schliessen',0,1,'Q')]],   // letzter Schritt war 2 Schläge lang, obwohl als Q gezählt (9 statt 8 Schläge)
  b_q_hops:['Hüpfer vorwärts (Hops)',[S('L','vor',35,2,'S'),S('R','vor',35,2,'S'),{...S('L','vor',25,1,'Q'),tip:'kleine Hüpfer auf den Ballen'},S('R','vor',25,1,'Q'),S('L','vor',25,1,'Q'),S('R','vor',25,1,'Q')]],
  b_q_pepper:['Pfeffermühle (Running Steps)',[S('L','vor',30,1,'Q'),S('R','vor',30,1,'Q'),S('L','vor',30,1,'Q'),S('R','vor',30,1,'Q'),S('L','seit',20,2,'S'),S('R','schliessen',0,2,'S')]],
  b_q_rumpf:['Fortschreitendes Chassé',[S('L','vor',35,2,'S'),S('R','seit',25,1,'Q'),S('L','schliessen',0,1,'Q'),S('R','seit',25,2,'S')]],
});

/* ---------- Cha-Cha-Cha ---------- */
{
const T=f=>[S(f,'seit',12,.5,'4'),S(O(f),'schliessen',0,.5,'&'),S(f,'seit',12,1,'1')];
const TP=f=>[S(f,'schliessen',0,.5,'4'),S(O(f),'platz',0,.5,'&'),S(f,'platz',0,1,'1')];
const TV=f=>[S(f,'vor',14,.5,'4'),S(O(f),'schliessen',0,.5,'&'),S(f,'vor',14,1,'1')];
const TR=f=>[S(f,'rueck',14,.5,'4'),S(O(f),'schliessen',0,.5,'&'),S(f,'rueck',14,1,'1')];
tanz('Cha-Cha-Cha',120,{
  b_c_seit:['Seitliches Chassé (links und rechts)',[S('L','seit',20,1,'2'),S('R','platz',0,1,'3'),...T('L'),S('R','seit',20,1,'2'),S('L','platz',0,1,'3'),...T('R')]],
  b_c_platz:['Grundschritt am Platz',[S('L','platz',0,1,'2'),S('R','platz',0,1,'3'),...TP('L'),S('R','platz',0,1,'2'),S('L','platz',0,1,'3'),...TP('R')]],
  b_c_vor:['Vorwärts-Chassé (gehend)',[S('L','vor',25,1,'2'),S('R','vor',25,1,'3'),...TV('L'),S('R','rueck',25,1,'2'),S('L','rueck',25,1,'3'),...TR('R')]],
  b_c_rueckl:['Rückwärts-Lock (Dame vorwärts)',[S('L','rueck',25,1,'2'),S('R','platz',0,1,'3'),...TR('L'),S('R','vor',25,1,'2'),S('L','platz',0,1,'3'),...TV('R')]],
  b_c_offen2:['Offene Basic (beide Hände)',H([S('L','vor',22,1,'2'),S('R','platz',0,1,'3'),...T('L'),S('R','rueck',22,1,'2'),S('L','platz',0,1,'3'),...T('R')],'offen')],
});
}

/* ---------- Rumba ---------- */
tanz('Rumba',100,{
  b_r_seitl:['Seitschritte (Cucaracha-Schritt seitlich, links und rechts)',[S('L','seit',25,1,'2'),S('R','platz',0,1,'3'),S('L','schliessen',0,2,'4'),S('R','seit',25,1,'2'),S('L','platz',0,1,'3'),S('R','schliessen',0,2,'4')]],
  b_r_vorgeh:['Vorwärts-Gehschritte',[S('L','vor',28,1,'2'),S('R','vor',28,1,'3'),S('L','vor',28,2,'4'),S('R','rueck',28,1,'2'),S('L','rueck',28,1,'3'),S('R','rueck',28,2,'4')]],
  b_r_offen:['Offene Basic (beide Hände)',H([S('L','vor',25,1,'2'),S('R','platz',0,1,'3'),S('L','seit',25,2,'4'),S('R','rueck',25,1,'2'),S('L','platz',0,1,'3'),S('R','seit',25,2,'4')],'offen')],
  b_r_platz:['Grundschritt am Platz',[S('L','platz',0,1,'2'),S('R','platz',0,1,'3'),S('L','platz',0,2,'4'),S('R','platz',0,1,'2'),S('L','platz',0,1,'3'),S('R','platz',0,2,'4')]],
});

/* ---------- Samba ---------- */
{
const sa=(f,dir,len,mid,t=0)=>[S(f,dir,len,.75,'1',t),S(O(f),mid,mid==='kreuzHinter'?8:0,.25,'a'),S(f,'platz',0,1,'2')];
tanz('Samba',100,{
  b_sa_platz:['Grundschritt am Platz',[...sa('L','platz',0,'schliessen'),...sa('R','platz',0,'schliessen')]],
  b_sa_prog:['Fortschreitender Grundschritt',[...sa('L','vor',22,'schliessen'),...sa('R','vor',22,'schliessen')]],
  b_sa_rolle:['Rollen (Samba-Drehung am Platz, links)',[...sa('L','vor',15,'schliessen',45),...sa('R','rueck',15,'schliessen',45),...sa('L','vor',15,'schliessen',45),...sa('R','rueck',15,'schliessen',45)]],
  b_sa_prom:['Promenaden-Läufe',[S('L','seit',22,.75,'1',0,'prom'),S('R','kreuzSeit',15,.25,'a',0,'prom'),S('L','seit',15,1,'2',0,'prom'),S('R','kreuzSeit',22,.75,'1',0,'prom'),S('L','seit',15,.25,'a',0,'prom'),{...S('R','platz',0,1,'2'),tip:'zurück in die geschlossene Haltung'}]],
});
}

/* ---------- Jive ---------- */
{
const rock=[S('L','rueck',22,1,'1'),S('R','platz',0,1,'2')];
const ch=(f,dir,len,c1,c2,t=0,h)=>[S(f,dir,len,.75,c1,t,h),S(O(f),'schliessen',0,.25,'a',0,h),S(f,dir,len/2,1,c2,t,h)];
tanz('Jive',150,{
  b_j_offen2:['Grundschritt in offener Haltung (kleine Chassés)',H([...rock,...ch('L','seit',22,'3','4'),...ch('R','seit',22,'5','6')],'offen')],
  b_j_walk:['Gehschritte (Jive Walks)',[S('L','vor',25,1,'1'),S('R','vor',25,1,'2'),...ch('L','vor',20,'3','4'),...ch('R','vor',20,'5','6')]],
  b_j_chicken:['Chicken Walks (Dame geht rückwärts)',[S('L','rueck',20,1,'1'),S('R','rueck',20,1,'2'),S('L','rueck',20,1,'3'),S('R','rueck',20,1,'4'),...ch('L','seit',20,'5','6'),...ch('R','seit',20,'7','8')]],
  b_j_flicks:['Flicks (Kicks seitlich)',[...rock,S('L','kick',30,1,'3'),S('L','schliessen',0,1,'4'),S('R','kick',30,1,'5'),S('R','schliessen',0,1,'6')]],
  b_j_prom:['Promenaden-Chassé',[...rock,...ch('L','seit',22,'3','4',0,'prom'),...ch('R','seit',22,'5','6',0,'zu')]],
});
}

/* ---------- Paso Doble ---------- */
{
const n8=fn=>[1,2,3,4,5,6,7,8].map(n=>fn(n%2?'R':'L',String(n)));
tanz('Paso Doble',120,{
  b_pd_seit:['Seitschritte (Chassé nach rechts)',n8((f,c)=>f==='R'?S(f,'seit',25,1,c):S(f,'schliessen',0,1,c))],
  b_pd_huit:['Huit (Dame schwingt vor dem Herrn)',n8((f,c)=>S(f,'platz',0,1,c,0,+c>2&&+c<7?'prom':'zu'))],
  b_pd_banderillas:['Banderillas (am Platz mit Kicks)',[S('R','platz',0,1,'1'),S('L','platz',0,1,'2'),S('R','kick',25,1,'3'),S('R','schliessen',0,1,'4'),S('L','kick',25,1,'5'),S('L','schliessen',0,1,'6'),S('R','platz',0,1,'7'),S('L','platz',0,1,'8')]],
});
}

/* ---------- Foxtrott ---------- */
tanz('Foxtrott',120,{
  b_f_check:['Rückwärts-Check und vor',[S('L','vor',35,2,'S'),{...S('R','rueck',35,2,'S'),tip:'Check: kurz stoppen und zurück'},S('L','seit',22,1,'Q'),S('R','schliessen',0,1,'Q')]],
  b_f_promdreh:['Promenade mit Damendrehung',[S('L','seit',35,2,'S',0,'prom'),S('R','kreuzSeit',30,2,'S',0,'prom'),S('L','seit',22,1,'Q',0,'hoch'),S('R','schliessen',0,1,'Q')],
     [S('R','seit',35,2,'S'),S('L','kreuzSeit',30,2,'S'),S('R','rueck',20,1,'Q',-180),S('L','vor',5,1,'Q',-180)]],
  b_f_viertelr:['Viertelkarree rechts herum',[S('L','vor',35,2,'S',-45),S('R','seit',25,2,'S',-45),S('L','rueck',30,1,'Q'),S('R','schliessen',0,1,'Q')]],
});

/* ---------- Discofox ---------- */
{
const df=(h,t=0)=>[S('L','rueck',22,1,'1',t,h),S('R','platz',0,1,'2',t,h),S('L','tap',0,1,'3',t,h)];
const dfV=(h,t=0)=>[S('L','vor',22,1,'1',t,h),S('R','vor',22,1,'2',t,h),S('L','tap',0,1,'3',t,h)];
const amPlatz=[S('L','platz',0,1,'1',0,'hoch'),S('R','platz',0,1,'2',0,'hoch'),S('L','tap',0,1,'3',0,'LR')];
tanz('Discofox',120,{
  b_d_rueckgs:['Grundschritt rückwärts (Herr rück, Dame vor)',[S('L','rueck',22,1,'1'),S('R','rueck',22,1,'2'),S('L','tap',0,1,'3'),S('L','vor',22,1,'4'),S('R','vor',22,1,'5'),S('L','tap',0,1,'6')]],
  b_d_platzw:['Grundschritt am Platz (seit, ran, tap)',[S('L','seit',18,1,'1'),S('R','schliessen',0,1,'2'),S('L','tap',0,1,'3'),S('L','seit',18,1,'4'),S('R','schliessen',0,1,'5'),S('L','tap',0,1,'6')]],
  b_d_drehl2:['Damendrehung links (Unterarmdrehung)',amPlatz,[S('R','vor',20,1,'1',180),S('L','vor',20,1,'2',180),S('R','tap',0,1,'3')]],
  b_d_offenrueck:['Offene Haltung rückwärts',H([S('L','rueck',20,1,'1'),S('R','platz',0,1,'2'),S('L','tap',0,1,'3')],'offen')],
  b_d_seitr:['Seitschritt nach rechts',[S('L','tap',0,1,'1'),S('L','seit',18,1,'2'),S('R','schliessen',0,1,'3')]],
  b_d_handwechsel:['Handwechsel hinter dem Rücken (Herrendrehung)',[S('L','vor',15,1,'1',-180,'frei'),S('R','vor',15,1,'2',-180,'frei'),S('L','tap',0,1,'3',0,'LR')],[S('R','platz',0,1,'1'),S('L','platz',0,1,'2'),S('R','tap',0,1,'3')]],
});
}

/* ---------- Blues ---------- */
tanz('Blues',80,{
  b_bl_vorr:['Vorwärts und rückwärts (Schritt, Tap)',[S('L','vor',25,1,'1'),S('R','tap',0,1,'2'),S('R','rueck',25,1,'3'),S('L','tap',0,1,'4')]],
  b_bl_prom:['Promenade',[S('L','seit',25,1,'1',0,'prom'),S('R','kreuzSeit',20,1,'2',0,'prom'),S('L','seit',20,1,'3'),{...S('R','schliessen',0,1,'4'),tip:'zurück in die geschlossene Haltung'}]],
  b_bl_platz:['Wiegen am Platz',[S('L','platz',0,1,'1'),S('R','tap',0,1,'2'),S('R','platz',0,1,'3'),S('L','tap',0,1,'4')]],
});

/* ---------- Rock'n'Roll ---------- */
tanz("Rock'n'Roll",150,{
  b_rr_platz:['Grundschritt am Platz (Rück, Platz, Tap, Tap)',[S('L','rueck',20,1,'1'),S('R','platz',0,1,'2'),S('L','tap',0,1,'3'),S('L','platz',0,1,'4'),S('R','tap',0,1,'5'),S('R','platz',0,1,'6')]],
  b_rr_kreuz:['Kreuzhand-Grundschritt',H([S('L','rueck',20,1,'1'),S('R','platz',0,1,'2'),S('L','kick',30,1,'3'),S('L','schliessen',0,1,'4'),S('R','kick',30,1,'5'),S('R','schliessen',0,1,'6')],'kreuz')],
});

/* ---------- Polka ---------- */
{
const pk=(dir,t)=>[S('L',dir,22,.5,'1',t),S('R','schliessen',0,.5,'&',t),S('L',dir,22,1,'2',t),S('R',dir,22,.5,'1',t),S('L','schliessen',0,.5,'&',t),S('R',dir,22,1,'2',t)];
tanz('Polka',120,{
  b_p_seit:['Seitwärts-Polka',pk('seit',0).map(s=>s.f==='R'&&s.dir==='seit'?{...s,dir:'schliessen',len:0}:s)],
  b_p_prom:['Polka in der Promenade',H(pk('vor',0),'prom')],
  b_p_offen:['Polka in offener Haltung',H(pk('vor',0),'offen')],
});
}

/* ---------- Salsa ---------- */
{
const s1=[S('L','vor',25,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3')], s2=[S('R','rueck',25,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')];
tanz('Salsa',170,{
  b_s_platz:['Grundschritt am Platz',[S('L','platz',0,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3'),S('R','platz',0,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')]],
  b_s_offen:['Grundschritt in offener Haltung',H([...s1,...s2],'offen')],
  b_s_rueckb:['Rückwärts-Grundschritt (Back Basic)',[S('L','rueck',25,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3'),S('R','vor',25,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')]],
  b_s_suzie:['Suzie Q (Kreuzen am Platz)',[S('L','kreuz',15,1,'1'),S('R','platz',0,1,'2'),S('L','seit',15,2,'3'),S('R','kreuz',15,1,'5'),S('L','platz',0,1,'6'),S('R','seit',15,2,'7')]],
  b_s_copa:['Copa (Dame dreht ein und aus)',[...s1,S('R','rueck',20,1,'5',0,'hoch'),S('L','platz',0,1,'6',0,'hoch'),S('R','schliessen',0,2,'7',0,'offen')],
     [...spiegel(s1),S('L','vor',20,1,'5',-180),S('R','vor',20,1,'6',-180),S('L','schliessen',0,2,'7')]],
});
}

/* ---------- Bachata ---------- */
{
const b4=(f,dir,len,c0)=>[S(f,dir,len,1,String(c0)),S(O(f),dir==='platz'?'platz':'schliessen',0,1,String(c0+1)),S(f,dir,len,1,String(c0+2)),S(O(f),'tap',0,1,String(c0+3))];
tanz('Bachata',125,{
  b_b_box:['Karree (Box)',[S('L','seit',20,1,'1'),S('R','schliessen',0,1,'2'),S('L','vor',20,1,'3'),S('R','tap',0,1,'4'),S('R','seit',20,1,'5'),S('L','schliessen',0,1,'6'),S('R','rueck',20,1,'7'),S('L','tap',0,1,'8')]],
  b_b_offen:['Grundschritt in offener Haltung',H([...b4('L','seit',22,1),...b4('R','seit',22,5)],'offen')],
  b_b_rueck:['Rückwärts-Grundschritt',[...b4('L','rueck',20,1),...b4('R','vor',20,5)]],
  b_b_sensual:['Wellenbewegung am Platz (Sensual)',[...b4('L','platz',0,1),...b4('R','platz',0,5)]],
});
}

/* ---------- Merengue ---------- */
{
const m8=fn=>[1,2,3,4,5,6,7,8].map(n=>fn(n%2?'L':'R',String(n),n));
tanz('Merengue',130,{
  b_m_rueck:['Rückwärts gehen',m8((f,c)=>S(f,'rueck',15,1,c))],
  b_m_dreh:['Paardrehung links am Platz',m8((f,c)=>S(f,'platz',0,1,c,22.5))],
  b_m_offen:['Grundschritt in offener Haltung',m8((f,c)=>S(f,'platz',0,1,c,0,'offen'))],
  b_m_kreuz:['Kreuzhand-Grundschritt',m8((f,c)=>S(f,'platz',0,1,c,0,'kreuz'))],
});
}

/* ---------- Boogie-Woogie ---------- */
{
const bt=(t,h)=>[S('L','seit',14,1,'1',t,h),S('R','tap',0,1,'2',0,h),S('R','seit',14,1,'3',t,h),S('L','tap',0,1,'4',0,h),S('L','rueck',20,1,'5',t,h),S('R','platz',0,1,'6',t,h)];
tanz('Boogie-Woogie',160,{
  b_bw_kreuz:['Kreuzhand-Grundschritt',bt(0,'kreuz')],
  b_bw_platz:['Rock-Step mit Kick-Ball-Change',[S('L','rueck',20,1,'1'),S('R','platz',0,1,'2'),S('L','kick',25,.5,'3'),S('L','schliessen',0,.5,'&'),S('R','platz',0,1,'4'),S('L','seit',14,1,'5'),S('R','schliessen',0,1,'6')]],
  b_bw_rechts:['Grundschritt mit stärkerer Rechtsdrehung',bt(-30)],
});
}

/* ---------- Tango Argentino ---------- */
tanz('Tango Argentino',110,{
  b_ta_ocho:['Ocho adelante (Dame vorwärts in Achten)',[S('L','rueck',18,1,'1',20),S('R','rueck',18,1,'2',-20),S('L','rueck',18,1,'3',20),S('R','rueck',18,1,'4',-20)],
     [S('R','kreuz',20,1,'1',60),S('L','kreuz',20,1,'2',-60),S('R','kreuz',20,1,'3',60),S('L','kreuz',20,1,'4',-60)]],
  b_ta_ochor:['Ocho atrás (Dame rückwärts in Achten)',[S('L','vor',18,1,'1',-20),S('R','vor',18,1,'2',20),S('L','vor',18,1,'3',-20),S('R','vor',18,1,'4',20)],
     [S('R','kreuzHinter',20,1,'1',-60),S('L','kreuzHinter',20,1,'2',60),S('R','kreuzHinter',20,1,'3',-60),S('L','kreuzHinter',20,1,'4',60)]],
  b_ta_seit:['Seitschritt (Salida lateral)',[S('L','seit',30,1,'1'),S('R','schliessen',0,1,'2'),S('L','seit',30,1,'3'),S('R','schliessen',0,1,'4')]],
  b_ta_ruecksal:['Kleine Salida rückwärts',[S('R','rueck',30,1,'1'),S('L','seit',30,1,'2'),S('R','vor',30,1,'3'),S('L','tap',0,1,'4'),S('L','vor',30,1,'5'),S('R','tap',0,1,'6')]],
});

/* ---------- West Coast Swing ---------- */
{
const anker=(f,c1,c2,h)=>[S(f,'kreuzHinter',6,.5,c1,0,h),S(O(f),'platz',0,.5,'&',0,h),S(f,'platz',0,1,c2,0,h)];
tanz('West Coast Swing',105,{
  // Dame mit eigenen Schritten: vorher tanzte sie gegengleich und machte dabei einen Schritt von 1,3 m
  b_wc_passR:['Right Side Pass (Dame geht rechts vorbei)',
     [S('L','kreuzSeit',25,1,'1',0,'LR'),{...S('R','seit',20,1,'2',-45,'LR'),tip:'Herr öffnet nach rechts, die Dame geht rechts an ihm vorbei'},S('L','platz',0,.5,'3',-45,'LR'),S('R','platz',0,.5,'&',-45,'LR'),S('L','platz',0,1,'4',-45,'LR'),...anker('R','5','6','LR')],
     [S('R','vor',40,1,'1'),S('L','vor',40,1,'2'),S('R','vor',30,.5,'3'),S('L','vor',15,.5,'&',-90),S('R','rueck',15,1,'4',-90),...anker('L','5','6')]],
  b_wc_start2:['Grundschritt mit Anker (am Platz)',H([S('L','platz',0,1,'1'),S('R','platz',0,1,'2'),...anker('L','3','4'),...anker('R','5','6')],'LR')],
});
}

/* ---------- Walzer-Musette ---------- */
tanz('Walzer-Musette',180,{
  b_mu_balance:['Balance seitwärts',[S('L','seit',20,1,'1'),S('R','tap',0,1,'2'),S('R','tap',0,1,'3'),S('R','seit',20,1,'1'),S('L','tap',0,1,'2'),S('L','tap',0,1,'3')]],
  b_mu_vor:['Vorwärts gehend',[...w3('L',['vor',22],['seit',12],['1','2','3']),...w3('R',['vor',22],['seit',12],['1','2','3'])]],
  b_mu_prom:['Promenade',[S('L','seit',20,1,'1',0,'prom'),S('R','kreuzSeit',18,1,'2',0,'prom'),S('L','seit',12,1,'3',0,'prom'),S('R','vorAussen',18,1,'1'),S('L','seit',12,1,'2'),S('R','schliessen',0,1,'3')]],
});

/* ---------- Tangowalzer ---------- */
tanz('Tangowalzer',180,{
  b_tw_corte:['Corté (Rückwärts-Ausfall)',[{...S('L','rueck',30,2,'1'),tip:'Corté: weich ins linke Knie, Dame geht vor'},S('R','platz',0,1,'3'),S('L','vor',25,1,'1'),S('R','seit',18,1,'2'),S('L','tap',0,1,'3')]],
  b_tw_rechts:['Rechtsdrehung',[S('R','vor',28,1,'1',-45),S('L','seit',20,1,'2',-45),S('R','schliessen',0,1,'3',-45),S('L','rueck',28,1,'1',-45),S('R','seit',20,1,'2',-45),S('L','schliessen',0,1,'3',-45)]],
  b_tw_seit:['Seitliches Chassé',[S('L','seit',25,1,'1'),S('R','schliessen',0,1,'2'),S('L','seit',20,1,'3'),S('R','seit',25,1,'1'),S('L','schliessen',0,1,'2'),S('R','seit',20,1,'3')]],
});

/* ---------- Disco-Samba ---------- */
{
const ds=(f,dir,len,mid,c1,c2,t=0)=>[S(f,dir,len,.75,c1,t),S(O(f),mid,mid==='kreuzHinter'?8:0,.25,'a'),S(f,'platz',0,1,c2)];
tanz('Disco-Samba',120,{
  b_ds_platz:['Grundschritt am Platz',[...ds('L','platz',0,'schliessen','1','2'),...ds('R','platz',0,'schliessen','3','4')]],
  b_ds_vor:['Fortschreitend vorwärts',[...ds('L','vor',20,'schliessen','1','2'),...ds('R','vor',20,'schliessen','3','4')]],
  b_ds_offen:['Grundschritt in offener Haltung',H([...ds('L','vor',18,'schliessen','1','2'),...ds('R','rueck',18,'schliessen','3','4')],'offen')],
});
}

/* ---------- Two Step ---------- */
tanz('Two Step',160,{
  b_ts_seit:['Seitschritte (schnell, schnell, lang, lang)',[S('L','seit',22,1,'Q'),S('R','schliessen',0,1,'Q'),S('L','seit',25,2,'S'),S('R','schliessen',0,2,'S')]],
  b_ts_rechts:['Drehung rechts',[S('L','vor',28,1,'Q',-30),S('R','vor',28,1,'Q',-30),S('L','vor',32,2,'S',-30),S('R','vor',32,2,'S',-30)]],
  b_ts_offen:['Grundschritt in offener Haltung',H([S('L','vor',28,1,'Q'),S('R','vor',28,1,'Q'),S('L','vor',32,2,'S'),S('R','vor',32,2,'S')],'offen')],
});

/* ---------- Bugg ---------- */
tanz('Bugg',140,{
  b_bg_seit:['Seitschritt und Wiegen',H([S('L','seit',20,1,'1'),S('R','schliessen',0,1,'2'),S('L','platz',0,1,'3'),S('R','platz',0,1,'4')],'offen')],
  b_bg_kreuz:['Kreuzhand-Grundschritt',H([S('L','rueck',20,1,'1'),S('R','rueck',20,1,'2'),S('L','vor',20,1,'3'),S('R','vor',20,1,'4')],'kreuz')],
  b_bg_zu:['Grundschritt geschlossen',[S('L','rueck',18,1,'1'),S('R','rueck',18,1,'2'),S('L','vor',18,1,'3'),S('R','vor',18,1,'4')]],
});

/* ---------- Cumbia ---------- */
{
const cu1=[S('L','vor',22,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3')], cu2=[S('R','rueck',22,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')];
tanz('Cumbia',100,{
  b_cu_rueck:['Grundschritt rückwärts beginnend',[S('L','rueck',22,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3'),S('R','vor',22,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')]],
  b_cu_offen:['Grundschritt in offener Haltung',H([...cu1,...cu2],'offen')],
  b_cu_platz:['Am Platz',[S('L','platz',0,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3'),S('R','platz',0,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')]],
});
}

/* ---------- Tango Americano ---------- */
{
const tgo=[S('L','vor',28,1,'Q'),S('R','seit',25,1,'Q'),{...S('L','tap',0,2,'S'),tip:'Der linke Fuß wird ohne Gewicht herangezogen'}];
tanz('Tango Americano',120,{
  b_tam_geh:['Gehschritte und Abschluss',[S('L','vor',35,2,'S'),S('R','vor',35,2,'S'),S('L','vor',35,2,'S'),S('R','vor',35,2,'S'),...tgo]],
  b_tam_rueck:['Rückwärts (Herr rück, Dame vor)',[S('L','rueck',30,2,'S'),S('R','rueck',30,2,'S'),S('L','rueck',25,1,'Q'),S('R','seit',22,1,'Q'),S('L','tap',0,2,'S')]],
  b_tam_seit:['Seitschritt (T-A-N-G-O seitlich)',[S('L','seit',30,2,'S'),S('R','schliessen',0,2,'S'),...tgo]],
});
}

/* ---------- Nordic Tango ---------- */
tanz('Nordic Tango',116,{
  b_nt_geh:['Gehschritte',[S('L','vor',35,2,'S'),S('R','vor',35,2,'S'),S('L','vor',35,2,'S'),S('R','vor',35,2,'S')]],
  b_nt_rechts:['Drehung rechts',[S('L','vor',35,2,'S',-30),S('R','vor',35,2,'S',-30),S('L','vor',28,1,'Q',-30),S('R','schliessen',0,1,'Q')]],
  b_nt_platz:['Wiegen am Platz',[S('L','platz',0,2,'S'),S('R','platz',0,2,'S'),S('L','platz',0,1,'Q'),S('R','platz',0,1,'Q')]],
});

/* ---------- Mambo ---------- */
{
const ma1=[S('L','vor',25,1,'2'),S('R','platz',0,1,'3'),S('L','schliessen',0,2,'4')], ma2=[S('R','rueck',25,1,'2'),S('L','platz',0,1,'3'),S('R','schliessen',0,2,'4')];
tanz('Mambo',190,{
  b_ma_offen:['Grundschritt in offener Haltung',H([...ma1,...ma2],'offen')],
  b_ma_platz:['Grundschritt am Platz',[S('L','platz',0,1,'2'),S('R','platz',0,1,'3'),S('L','schliessen',0,2,'4'),S('R','platz',0,1,'2'),S('L','platz',0,1,'3'),S('R','schliessen',0,2,'4')]],
  b_ma_kreuz:['Kreuzschritt (Cross Over)',[S('L','kreuz',20,1,'2'),S('R','platz',0,1,'3'),S('L','seit',15,2,'4'),S('R','kreuz',20,1,'2'),S('L','platz',0,1,'3'),S('R','seit',15,2,'4')]],
  b_ma_rechts:['Linksdrehung des Paares (offener Grundschritt)',[S('L','vor',25,1,'2',30),S('R','platz',0,1,'3',30),S('L','schliessen',0,2,'4'),S('R','rueck',25,1,'2',30),S('L','platz',0,1,'3',30),S('R','schliessen',0,2,'4')]],
});
}

/* ---------- Marschfox ---------- */
tanz('Marschfox',120,{
  b_mf_links:['Linksdrehung gehend',n4((f,c)=>S(f,'vor',28,1,c,22.5))],
  b_mf_rechts:['Rechtsdrehung gehend',n4((f,c)=>S(f,'vor',28,1,c,-22.5))],
  b_mf_prom:['Promenade',H(n4((f,c)=>f==='L'?S(f,'seit',25,1,c):S(f,'kreuzSeit',22,1,c)),'prom')],
  b_mf_platz:['Am Platz',n4((f,c)=>S(f,'platz',0,1,c))],
});
}
