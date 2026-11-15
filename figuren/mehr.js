/* Weitere Figuren für alle Tänze – übliche Tanzschul- und Grundfiguren, vereinfacht auf die Schritte.
   Wird nach den anderen Figurendateien geladen und ergänzt die dort angelegten Tänze. */
{
const wechsel=(f,dir,a,b)=>[S(f,dir,a,1,'1'),S(O(f),'seit',b,1,'2'),S(f,'schliessen',0,1,'3')];
const nat3=(a,b,c=['1','2','3'],d=[1,1,1])=>[S('R','vor',a,d[0],c[0],-45),S('L','seit',b,d[1],c[1],-45),S('R','schliessen',0,d[2],c[2],-45)];   // erste Hälfte der Rechtsdrehung

/* ---------- Langsamer Walzer ---------- */
tanz('Langsamer Walzer',90,{
  b_w_kreisel:['Rechtskreisel (Spin Turn)',[...nat3(38,24),{...S('L','rueck',32,1,'4',-90),tip:'Kreisel: auf dem linken Fuß eine halbe Drehung nach rechts'},S('R','vor',22,1,'5',-90),S('L','diagRueck',28,1,'6',-45)]],
  b_w_zwechsel:['Zögerwechsel (Rechtsdrehung mit Zögern)',[...nat3(38,24),S('L','rueck',35,1,'4',-45),S('R','seit',25,1,'5',-45),{...S('L','tap',0,1,'6'),tip:'Zögern: der linke Fuß schließt ohne Gewicht'}]],
  b_w_aussen:['Außenseitlicher Wechsel',[S('L','rueck',35,1,'1'),S('R','rueck',30,1,'2',45),S('L','seit',25,1,'3',45)]],
  b_w_vlock:['Kreuzschritt vorwärts (1, 2 und 3)',[S('R','vorAussen',36,1,'1'),S('L','vor',28,.5,'2'),S('R','kreuzHinter',10,.5,'&'),S('L','vor',32,1,'3')]],
  b_w_rlock:['Kreuzschritt rückwärts (1, 2 und 3)',[S('L','rueck',36,1,'1'),S('R','rueck',28,.5,'2'),S('L','kreuz',10,.5,'&'),S('R','rueck',32,1,'3')]],
});

/* ---------- Wiener Walzer ---------- */
tanz('Wiener Walzer',174,{
  b_ww_rwr:['Wechselschritt rückwärts mit rechts',wechsel('R','rueck',30,20)],
  b_ww_rwl:['Wechselschritt rückwärts mit links',wechsel('L','rueck',30,20)],
  b_ww_check:['Kontra-Check (vor, halten, zurück)',[{...S('L','vor',30,2,'1'),tip:'Kontra-Check: weich ins linke Knie, die Dame lehnt sich leicht zurück'},S('R','platz',0,1,'3')]],
});

/* ---------- Tango ---------- */
tanz('Tango',128,{
  b_t_pss:['Progressiver Seitschritt',[S('L','vor',35,1,'Q'),S('R','seit',18,1,'Q'),S('L','vor',38,2,'S')]],
  b_t_link:['Progressive Link (in die Promenade)',[S('L','vor',35,1,'Q'),{...S('R','seit',20,1,'Q',0,'prom'),tip:'Link: mit einem kurzen Ruck in die Promenade öffnen'}]],
  b_t_vier:['Viererschritt (Four Step)',[S('L','vor',35,1,'Q'),S('R','seit',25,1,'Q'),S('L','rueck',25,1,'Q'),S('R','schliessen',0,1,'Q',0,'prom')]],
  b_t_oprom:['Offene Promenade',[S('L','seit',40,2,'S',0,'prom'),S('R','kreuzSeit',35,1,'Q',0,'prom'),S('L','seit',28,1,'Q'),{...S('R','vorAussen',35,2,'S'),tip:'Außenseitlich: rechts an der Dame vorbei'}]],
  b_t_rock:['Rechts-Wiegedrehung (Natural Rock Turn)',[S('R','vor',35,2,'S',-45),S('L','diagRueck',20,1,'Q',-45),S('R','platz',0,1,'Q'),S('L','rueck',30,2,'S'),
     S('R','rueck',30,1,'Q',45),S('L','seit',25,1,'Q',45),S('R','schliessen',0,2,'S')]],
});

/* ---------- Slowfox ---------- */
tanz('Slowfox',116,{
  b_sf_geh:['Gehschritte',[S('L','vor',48,2,'S'),S('R','vor',48,2,'S')]],
  b_sf_cod:['Richtungswechsel (Change of Direction)',[S('L','vor',42,2,'S',45),{...S('R','diagVor',30,2,'S',45),tip:'Der rechte Fuß wird weich herangezogen'},S('L','vor',40,2,'S')]],
  b_sf_rfeder:['Rückwärts-Federschritt',[S('L','rueck',45,2,'S'),S('R','rueck',40,1,'Q'),S('L','rueckAussen',36,1,'Q')]],
  b_sf_rdreier:['Rückwärts-Dreierschritt',[S('R','rueck',45,2,'S'),S('L','rueck',40,1,'Q'),S('R','rueck',36,1,'Q')]],
});

/* ---------- Quickstep ---------- */
tanz('Quickstep',200,{
  b_q_chasse:['Progressives Chassé',[S('R','rueck',35,2,'S',45),S('L','seit',28,1,'Q',45),S('R','schliessen',0,1,'Q'),S('L','diagVor',30,2,'S')]],
  b_q_rlock:['Kreuzschritt rückwärts',[S('L','rueck',38,2,'S'),S('R','rueck',32,1,'Q'),S('L','kreuz',10,1,'Q'),S('R','rueck',36,2,'S')]],
  b_q_kreisel:['Rechtskreisel (Spin Turn)',[...nat3(40,26,['S','Q','Q'],[2,1,1]),{...S('L','rueck',32,2,'S',-90),tip:'Kreisel: auf dem linken Fuß eine halbe Drehung nach rechts'},S('R','vor',22,2,'S',-90),S('L','diagRueck',28,2,'S',-45)]],
  b_q_zoeger:['Rechtsdrehung mit Zögern',[...nat3(40,26,['S','Q','Q'],[2,1,1]),S('L','rueck',36,2,'S',-45),S('R','seit',25,2,'S',-45),{...S('L','tap',0,2,'S'),tip:'Zögern: der linke Fuß schließt ohne Gewicht'}]],
  b_q_links:['Linksdrehung mit Chassé (erste Hälfte)',[S('L','vor',40,2,'S',45),S('R','seit',26,1,'Q',45),S('L','schliessen',0,1,'Q',45)]],
});

/* ---------- Samba: „1 a 2“ = ¾, ¼, 1 Schlag ---------- */
tanz('Samba',100,{
  b_sa_walk:['Samba-Gehschritte am Platz',
     [S('L','schliessen',0,.75,'1'),S('R','tapRueck',18,.25,'a'),S('L','platz',0,1,'2'),S('R','schliessen',0,.75,'1'),S('L','tapRueck',18,.25,'a'),S('R','platz',0,1,'2')],
     [S('R','schliessen',0,.75,'1'),S('L','tapRueck',18,.25,'a'),S('R','platz',0,1,'2'),S('L','schliessen',0,.75,'1'),S('R','tapRueck',18,.25,'a'),S('L','platz',0,1,'2')]],
  b_sa_bota:['Botafogos (im Wechsel)',[S('L','vor',22,.75,'1'),S('R','seit',18,.25,'a'),S('L','platz',0,1,'2'),S('R','vor',22,.75,'1'),S('L','seit',18,.25,'a'),S('R','platz',0,1,'2')]],
  b_sa_links:['Linksdrehung',[S('L','vor',22,.75,'1',45),S('R','seit',20,.25,'a',45),S('L','kreuz',10,1,'2',45),S('R','rueck',22,.75,'1',45),S('L','seit',15,.25,'a',45),S('R','schliessen',0,1,'2',45)]],
});

/* ---------- Jive ---------- */
const rock=[S('L','rueck',22,1,'1'),S('R','platz',0,1,'2')];
const ch=(f,c1,c2,len=28)=>[S(f,'seit',len,.75,c1),S(O(f),'schliessen',0,.25,'a'),S(f,'seit',len/2,1,c2)];
const tripel=(f,c1,c2)=>[S(f,'platz',0,.75,c1),S(O(f),'platz',0,.25,'a'),S(f,'platz',0,1,c2)];
tanz('Jive',150,{
  b_j_tap:['Grundschritt für den Anfang (Schritt–Tap)',[...rock,S('L','seit',20,1,'3'),S('R','tap',0,1,'4'),S('R','seit',20,1,'5'),S('L','tap',0,1,'6')]],
  b_j_fall:['Fallaway Rock (Rückschritt in der Promenade)',[S('L','rueck',22,1,'1',0,'prom'),S('R','platz',0,1,'2',0,'prom'),...ch('L','3','4'),...ch('R','5','6')]],
  b_j_whip:['Link und Peitsche (Whip)',[...rock,...ch('L','3','4',14),{...S('R','kreuzHinter',10,1,'5',-90),tip:'Peitsche: das Paar dreht kräftig nach rechts'},S('L','seit',20,1,'6',-90),...ch('R','7','8',14)]],
});

/* ---------- Paso Doble: ein Schritt pro Schlag, beginnt rechts ---------- */
const n8=fn=>[1,2,3,4,5,6,7,8].map(n=>fn(n%2?'R':'L',String(n)));
tanz('Paso Doble',120,{
  b_pd_chassel:['Chassés nach links',n8((f,c)=>S(f,f==='L'?'seit':'schliessen',f==='L'?25:0,1,c))],
  b_pd_drehr:['Rechtsdrehung am Platz',n8((f,c)=>S(f,'platz',0,1,c,-45))],
  b_pd_prom:['Promenade',[{...S('R','platz',0,1,'1'),tip:'Appell: kräftig mit dem rechten Fuß aufstampfen'},S('L','seit',30,1,'2',0,'prom'),S('R','kreuzSeit',25,1,'3',0,'prom'),S('L','seit',25,1,'4',0,'prom'),
     S('R','kreuzSeit',25,1,'5',0,'prom'),S('L','seit',25,1,'6'),S('R','schliessen',0,1,'7'),S('L','platz',0,1,'8')]],
  b_pd_ecart:['Ecart (Appell, vor, seit, kreuzen)',[{...S('R','platz',0,1,'1'),tip:'Appell: kräftig mit dem rechten Fuß aufstampfen'},S('L','vor',35,1,'2'),S('R','seit',25,1,'3',0,'prom'),S('L','kreuzHinter',12,1,'4',0,'prom')]],
});

/* ---------- Foxtrott ---------- */
tanz('Foxtrott',120,{
  b_f_viertel:['Vierteldrehungen (rechts und links)',[S('L','vor',38,2,'S'),S('R','vor',38,2,'S',-45),S('L','seit',25,1,'Q',-45),S('R','schliessen',0,1,'Q'),
     S('L','rueck',38,2,'S'),S('R','rueck',38,2,'S',45),S('L','seit',25,1,'Q',45),S('R','schliessen',0,1,'Q')]],
  b_f_box:['Karree (lang, schnell, schnell)',[S('L','vor',35,2,'S'),S('R','seit',25,1,'Q'),S('L','schliessen',0,1,'Q'),S('R','rueck',35,2,'S'),S('L','seit',25,1,'Q'),S('R','schliessen',0,1,'Q')]],
  b_f_rwiege:['Wiegeschritt rückwärts',[S('L','rueck',35,2,'S'),S('R','platz',0,2,'S'),S('L','seit',25,1,'Q'),S('R','schliessen',0,1,'Q')]],
});

/* ---------- Discofox ---------- */
tanz('Discofox',120,{
  b_d_platz:['Grundschritt am Platz',[S('L','platz',0,1,'1'),S('R','platz',0,1,'2'),S('L','tap',0,1,'3')]],
  b_d_prom:['Promenade (seitlich hin und zurück)',[S('L','seit',28,1,'1',0,'prom'),S('R','kreuzSeit',25,1,'2',0,'prom'),S('L','tap',0,1,'3',0,'prom'),S('L','kreuzSeit',25,1,'4'),S('R','seit',28,1,'5'),S('L','tap',0,1,'6')]],
  b_d_wickel:['Wickler (Dame eindrehen und unter dem Arm wieder ausdrehen)',[S('L','platz',0,1,'1',0,'korb'),S('R','platz',0,1,'2',0,'korb'),S('L','tap',0,1,'3',0,'korb'),
     S('L','platz',0,1,'4',0,'hoch'),S('R','platz',0,1,'5',0,'hoch'),S('L','tap',0,1,'6',0,'offen')]],
  b_d_herrr:['Herrensolo (Rechtsdrehung)',
     [S('L','vor',15,1,'1',-180,'frei'),S('R','vor',15,1,'2',-180,'frei'),S('L','tap',0,1,'3',0,'offen')],
     [S('R','platz',0,1,'1'),S('L','platz',0,1,'2'),S('R','tap',0,1,'3')]],
});

/* ---------- Blues ---------- */
tanz('Blues',80,{
  b_bl_drehr:['Grundschritt mit Rechtsdrehung',[S('L','seit',25,1,'1',-45),S('R','tap',0,1,'2'),S('R','seit',25,1,'3',-45),S('L','tap',0,1,'4')]],
  b_bl_wiege:['Wiegeschritt (vor, Platz, rück, Platz)',[S('L','vor',22,1,'1'),S('R','platz',0,1,'2'),S('L','rueck',22,1,'3'),S('R','platz',0,1,'4')]],
  b_bl_lang:['Seit, ran, seit, Tap (links und rechts)',[S('L','seit',25,1,'1'),S('R','schliessen',0,1,'2'),S('L','seit',25,1,'3'),S('R','tap',0,1,'4'),S('R','seit',25,1,'5'),S('L','schliessen',0,1,'6'),S('R','seit',25,1,'7'),S('L','tap',0,1,'8')]],
  b_bl_solo:['Damendrehung rechts unter dem Arm',
     [S('L','seit',25,1,'1',0,'hoch'),S('R','tap',0,1,'2',0,'hoch'),S('R','seit',25,1,'3'),S('L','tap',0,1,'4')],
     [S('R','seit',25,1,'1',-360),S('L','tap',0,1,'2'),S('L','seit',25,1,'3'),S('R','tap',0,1,'4')]],
});

/* ---------- Rock'n'Roll ---------- */
const rr=(t,h)=>[S('L','rueck',20,1,'1',t,h),S('R','platz',0,1,'2',t,h),S('L','kick',30,1,'3',0,h),S('L','schliessen',0,1,'4',0,h),S('R','kick',30,1,'5',0,h),S('R','schliessen',0,1,'6',0,h)];
tanz("Rock'n'Roll",150,{
  b_rr_dreh:['Grundschritt mit Rechtsdrehung',rr(-22.5)],
  b_rr_kbc:['Kick-Ball-Change, Kick, Kick',[S('L','kick',25,.75,'1'),S('L','rueck',8,.25,'a'),S('R','platz',0,1,'2'),S('L','kick',30,1,'3'),S('L','schliessen',0,1,'4'),S('R','kick',30,1,'5'),S('R','schliessen',0,1,'6')]],
  b_rr_solo:['Damendrehung rechts unter dem Arm',
     [S('L','rueck',20,1,'1'),S('R','platz',0,1,'2'),S('L','kick',30,1,'3',0,'hoch'),S('L','schliessen',0,1,'4',0,'hoch'),S('R','kick',30,1,'5',0,'offen'),S('R','schliessen',0,1,'6',0,'offen')],
     [S('R','rueck',20,1,'1'),S('L','platz',0,1,'2'),S('R','vor',12,1,'3',-180),S('L','vor',12,1,'4',-180),S('R','schliessen',0,1,'5'),S('L','platz',0,1,'6')]],
});

/* ---------- Polka ---------- */
const polka=(dir,t)=>[S('L',dir,22,.5,'1',t),S('R','schliessen',0,.5,'&',t),S('L',dir,22,1,'2',t),S('R',dir,22,.5,'1',t),S('L','schliessen',0,.5,'&',t),S('R',dir,22,1,'2',t)];
tanz('Polka',120,{
  b_p_rueck:['Polkaschritt rückwärts',polka('rueck',0)],
  b_p_drehl:['Polka mit Linksdrehung',polka('vor',30)],
  b_p_hacke:['Hacke, Spitze und Polkaschritt',[{...S('L','tap',18,1,'1'),tip:'Hacke vorn aufsetzen, dann die Spitze hinten'},S('L','tapRueck',15,1,'2'),S('L','vor',22,.5,'3'),S('R','schliessen',0,.5,'&'),S('L','vor',22,1,'4'),
     S('R','tap',18,1,'1'),S('R','tapRueck',15,1,'2'),S('R','vor',22,.5,'3'),S('L','schliessen',0,.5,'&'),S('R','vor',22,1,'4')]],
});

/* ---------- Salsa: 1-2-3, Pause auf 4, 5-6-7, Pause auf 8 ---------- */
const s1=[S('L','vor',25,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3')];
tanz('Salsa',170,{
  b_s_cumbia:['Cumbia-Schritt (beide kreuzen hinten)',
     H([S('L','kreuzHinter',15,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3'),S('R','kreuzHinter',15,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')],'offen'),
     [S('R','kreuzHinter',15,1,'1'),S('L','platz',0,1,'2'),S('R','schliessen',0,2,'3'),S('L','kreuzHinter',15,1,'5'),S('R','platz',0,1,'6'),S('L','schliessen',0,2,'7')]],
  b_s_drehl:['Damendrehung links (auf 5-6-7)',
     [S('L','vor',25,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3',0,'hoch'),S('R','rueck',25,1,'5',0,'hoch'),S('L','platz',0,1,'6',0,'hoch'),S('R','schliessen',0,2,'7')],
     [...spiegel(s1),S('L','vor',20,1,'5',180),S('R','vor',20,1,'6',180),S('L','schliessen',0,2,'7')]],
  b_s_ench:['Platzwechsel mit Damendrehung (Enchufla)',
     [S('L','vor',20,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3',0,'hoch'),S('R','seit',50,1,'5',0,'hoch'),S('L','vor',60,1,'6',180,'hoch'),S('R','schliessen',0,2,'7',0,'LR')],
     [S('R','rueck',20,1,'1'),S('L','platz',0,1,'2'),S('R','schliessen',0,2,'3'),S('L','vor',50,1,'5'),S('R','vor',45,1,'6',180),S('L','schliessen',0,2,'7')]],
});

/* ---------- Bachata: drei Schritte und ein Tap ---------- */
const b4=(f,dir,len,c0)=>[S(f,dir,len,1,String(c0)),S(O(f),'schliessen',0,1,String(c0+1)),S(f,dir,len,1,String(c0+2)),S(O(f),'tap',0,1,String(c0+3))];
tanz('Bachata',125,{
  b_b_rechts:['Grundschritt mit Rechtsdrehung',[S('L','seit',25,1,'1',-30),S('R','schliessen',0,1,'2',-30),S('L','seit',25,1,'3',-30),S('R','tap',0,1,'4'),
     S('R','seit',25,1,'5',-30),S('L','schliessen',0,1,'6',-30),S('R','seit',25,1,'7',-30),S('L','tap',0,1,'8')]],
  b_b_kreuz:['Seitschritt mit Kreuzen hinten',[S('L','seit',25,1,'1'),S('R','kreuzSeitHinter',15,1,'2'),S('L','seit',25,1,'3'),S('R','tap',0,1,'4'),
     S('R','seit',25,1,'5'),S('L','kreuzSeitHinter',15,1,'6'),S('R','seit',25,1,'7'),S('L','tap',0,1,'8')]],
  b_b_drehl:['Damendrehung links (auf 5-6-7)',
     [...b4('L','seit',25,1),...H(b4('R','seit',25,5),'hoch')],
     [...b4('R','seit',25,1),S('L','seit',25,1,'5',180),S('R','seit',25,1,'6',180),S('L','seit',25,1,'7'),S('R','tap',0,1,'8')]],
});

/* ---------- Merengue: auf jeden Schlag ein Schritt ---------- */
const m8=fn=>[1,2,3,4,5,6,7,8].map(n=>fn(n%2?'L':'R',String(n),n));
tanz('Merengue',130,{
  b_m_seitr:['Seitschritte nach rechts',m8((f,c)=>S(f,f==='R'?'seit':'schliessen',f==='R'?20:0,1,c))],
  b_m_paarr:['Paardrehung rechts',m8((f,c)=>S(f,f==='R'?'vor':'schliessen',f==='R'?12:0,1,c,-22.5))],
  b_m_solol:['Damendrehung links unter dem Arm',
     m8((f,c,n)=>S(f,'platz',0,1,c,0,n<=4?'hoch':'offen')),
     m8((f,c,n)=>n<=4?S(O(f),'vor',10,1,c,90):S(O(f),'platz',0,1,c))],
});

/* ---------- Boogie-Woogie ---------- */
const bt=t=>[S('L','seit',14,1,'1',t),S('R','tap',0,1,'2'),S('R','seit',14,1,'3',t),S('L','tap',0,1,'4'),S('L','rueck',20,1,'5',t),S('R','platz',0,1,'6',t)];
tanz('Boogie-Woogie',160,{
  b_bw_drehl:['Grundschritt mit Linksdrehung',bt(20)],
  b_bw_solo:['Damensolo am Platz (Rechtsdrehung)',
     [S('L','seit',14,1,'1',0,'hoch'),S('R','tap',0,1,'2',0,'hoch'),S('R','seit',14,1,'3',0,'hoch'),S('L','tap',0,1,'4',0,'hoch'),S('L','rueck',20,1,'5',0,'offen'),S('R','platz',0,1,'6',0,'offen')],
     [S('R','vor',10,1,'1',-180),S('L','tap',0,1,'2'),S('L','vor',10,1,'3',-180),S('R','tap',0,1,'4'),S('R','rueck',20,1,'5'),S('L','platz',0,1,'6')]],
});

/* ---------- Tango Argentino ---------- */
tanz('Tango Argentino',110,{
  b_ta_gehr:['Caminata rückwärts (der Herr geht rückwärts)',[S('L','rueck',38,1,'1'),S('R','rueck',38,1,'2'),S('L','rueck',38,1,'3'),S('R','rueck',38,1,'4')]],
  b_ta_giro:['Giro (Paardrehung links am Platz)',[S('L','vor',12,1,'1',45),S('R','schliessen',0,1,'2',45),S('L','vor',12,1,'3',45),S('R','schliessen',0,1,'4',45)]],
});

/* ---------- West Coast Swing ---------- */
const anker=(f,c1,c2)=>[S(f,'kreuzHinter',6,.5,c1),S(O(f),'platz',0,.5,'&'),S(f,'platz',0,1,c2)];
tanz('West Coast Swing',105,{
  b_wc_start:['Starter Step (Anfang in geschlossener Haltung)',[S('L','seit',12,.5,'1'),S('R','schliessen',0,.5,'&'),S('L','platz',0,1,'2'),S('R','seit',12,.5,'3'),S('L','schliessen',0,.5,'&'),S('R','platz',0,1,'4')]],
  b_wc_tuck:['Sugar Tuck (Sugar Push mit Damendrehung)',
     [...H([S('L','rueck',22,1,'1'),S('R','rueck',12,1,'2'),S('L','tap',0,1,'3')],'offen'),S('L','vor',40,1,'4',0,'hoch'),...H(anker('R','5','6'),'LR')],
     [S('R','vor',22,1,'1'),S('L','vor',12,1,'2'),S('R','tap',0,1,'3'),{...S('R','rueck',40,1,'4',-360),tip:'Dame dreht rechts unter seiner erhobenen Hand'},...anker('L','5','6')]],
});
}
