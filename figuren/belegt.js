/* Figuren mit überprüfbarer Quelle: Schrittfolge, Zählung, Drehung und Fußarbeit nach den Figurendiagrammen von
   BallroomGuide (Djurre de Boer, http://dance.djurredeboer.nl/ – früher ballroomguide.github.io), abgerufen am 2026-11-22.
   Die Darstellung in der Engine ist vereinfacht (Schrittlängen geschätzt, Drehung auf die Schritte verteilt);
   die Fußarbeit steht unverändert in TECHNIK_DATEN und wird in der Technikanzeige statt der abgeleiteten Werte gezeigt. */
const QUELLEN={}, TECHNIK_DATEN={};
{
const Q='http://dance.djurredeboer.nl/';
const q=(id,pfad,td)=>{ QUELLEN[id]=Q+pfad; if(td) TECHNIK_DATEN[id]=td; };

/* Slowfox Basic Weave (Bronze): beginnt gegen die Tanzrichtung diagonal zur Mitte, ½ Linksdrehung, endet DW außenseitlich */
tanz('Slowfox',116,{
  b_sf_bweave:['Basic Weave',[S('L','vor',38,1,'Q',45),S('R','seit',28,1,'Q',45),S('L','rueckAussen',30,1,'Q'),S('R','rueck',30,1,'Q',45),S('L','seit',26,1,'Q',45),{...S('R','vorAussen',34,1,'Q'),tip:'Außenseitlich enden (CBMP)'}]],
});
q('b_sf_bweave','standard/foxtrot/basic_weave.html',{H:{fuss:['HT','T','T','T','T','TH'],sway:['gerade','links','links','gerade','rechts','rechts']},D:{fuss:['HT','T','T','T','TH','TH'],sway:['gerade','rechts','rechts','gerade','links','links']}});

/* Quickstep Natural Pivot Turn (PreBronze/Bronze) und Reverse Pivot (Bronze) */
tanz('Quickstep',200,{
  b_q_npivot:['Natural Pivot Turn',[S('R','vor',38,2,'S',-45),S('L','seit',26,1,'Q',-60),S('R','schliessen',0,1,'Q',-30),{...S('L','rueck',18,1,'S',-90),tip:'Pivot: linker Fuß zurück, Spitze einwärts, ½ Rechtsdrehung'},S('L','platz',0,1,'S',-90)]],   // der Pivot wird als ein Schritt mit fortgesetzter Drehung dargestellt
  b_q_rpivot:['Reverse Pivot',[{...S('R','rueckAussen',15,1,'S',90),tip:'Kleiner Schritt rück in CBMP, Spitze einwärts, ½ Linksdrehung'},S('R','platz',0,1,'S',90)]],
});
q('b_q_npivot','standard/quickstep/pivot_turn.html',{H:{fuss:['HT','T','TH','THT','(Pivot)'],sway:['gerade','rechts','rechts','gerade','gerade']},D:{fuss:['TH','T','TH','HTH','(Pivot)'],sway:['gerade','links','links','gerade','gerade']}});
q('b_q_rpivot','standard/quickstep/reverse_pivot.html',{H:{fuss:['THT','(Pivot)'],sway:['gerade','gerade']},D:{fuss:['TH','(Pivot)'],sway:['gerade','gerade']}});

/* Tango: Rock auf dem linken und auf dem rechten Fuß (Bronze) – rück, Gewicht vor, kleiner Schritt rück (Q Q S) */
tanz('Tango',128,{
  b_t_rockl:['Rock zurück (linker Fuß)',[S('L','rueck',30,1,'Q'),S('R','platz',0,1,'Q'),S('L','rueck',18,2,'S')]],
  b_t_rockr:['Rock zurück (rechter Fuß, in CBMP)',[S('R','kreuzHinter',26,1,'Q'),S('L','platz',0,1,'Q'),S('R','kreuzHinter',16,2,'S')]],
});
q('b_t_rockl','standard/tango/rock_LF.html',{H:{fuss:['BH (Innenkante)','HF','BH (Innenkante)'],sway:['–','–','–']},D:{fuss:['HF','BH (Innenkante)','HF'],sway:['–','–','–']}});
q('b_t_rockr','standard/tango/rock_RF.html',{H:{fuss:['BH','HF','BH'],sway:['–','–','–']},D:{fuss:['HF','BH','HF'],sway:['–','–','–']}});

/* Cha-Cha-Cha Closed Hip Twist (Bronze): endet im Fächer. Herr: vor (checked), Platz, Ronde-Chassé; rück, Platz, Hip-Twist-Chassé.
   Dame: rück, Platz, Hip-Twist-Chassé mit ½ links und ¼ rechts; vor, vor mit ⅜ links, Rück-Lock in den Fächer. */
tanz('Cha-Cha-Cha',120,{
  b_c_closedhip:['Closed Hip Twist (in den Fächer)',
    [S('L','vor',15,1,'2',-45),S('R','platz',0,1,'3'),S('L','schliessen',0,.5,'4'),S('R','platz',0,.5,'&'),S('L','platz',0,1,'1',45),
     S('R','rueck',12,1,'2'),S('L','platz',0,1,'3'),S('R','seit',10,.5,'4',0,'faecher'),S('L','schliessen',0,.5,'&',0,'faecher'),S('R','seit',10,1,'1',-45,'faecher')],
    [S('R','rueck',20,1,'2',-135),S('L','platz',0,1,'3',-90),S('R','schliessen',0,.5,'4',90),S('L','platz',0,.5,'&',90),S('R','platz',0,1,'1',-90),
     S('L','vor',15,1,'2'),{...S('R','vor',30,1,'3',135),tip:'Dame dreht ⅜ links und geht in den Fächer'},S('L','rueck',12,.5,'4',45),S('R','kreuz',8,.5,'&'),S('L','rueck',12,1,'1')]],
});
q('b_c_closedhip','latin/cha_cha/closed_hip.html');

/* ---------- Zweiter Satz ---------- */
const tip=(st,t)=>({...st,tip:t}), ferse=(st,t='Dame: Fersendrehung')=>({...st,df:'ferse',tip:t});
const sw=(f,s)=>({fuss:f,sway:s});

/* Langsamer Walzer */
tanz('Langsamer Walzer',90,{
  // Die Dame wird hier vom Herrn um ihn herumgeführt (gegengleich); ihre eigenen kleinen Schritte vorwärts stehen in der Technikanzeige
  b_w_lwhisk:['Left Whisk',[S('R','rueck',30,1,'1',90),S('L','seit',26,1,'2',45),tip(S('R','kreuzHinter',12,1,'3',0,'prom'),'Rechter Fuß kreuzt hinter den linken'),
     tip(S('R','platz',0,.5,'1',-90,'prom'),'Twist: auf beiden Füßen nach rechts aufdrehen, die Dame geht mit kleinen Schritten um den Herrn'),S('R','platz',0,.5,'&',-90),S('R','platz',0,1,'2',-90),S('R','platz',0,1,'3',-90)]],
  b_w_oimpetus:['Open Impetus',[S('L','rueck',34,1,'1',-90),{...S('R','ferse',0,1,'2',-45),df:'seit',tip:'Herr: Fersendrehung'},S('L','seit',24,1,'3',-45,'prom')]],
  b_w_cwing:['Closed Wing',[S('R','vorAussen',30,1,'1'),tip(S('L','tap',0,1,'2'),'Linken Fuß langsam heranziehen'),tip(S('L','tap',0,1,'3'),'Linker Fuß schließt ohne Gewicht')],
    [S('L','rueckAussen',28,1,'1'),S('R','seit',12,1,'2'),S('L','kreuz',20,1,'3',45)]],
  b_w_tlockr:['Turning Lock nach rechts',[S('R','rueck',30,.5,'1',-90),S('L','kreuz',10,.5,'&',-90),S('R','seit',24,1,'2'),S('L','seit',24,1,'3',0,'prom')]],
});
q('b_w_lwhisk','standard/waltz/left_whisk.html',{H:sw(['TH','TH','T','F (L), T (R)','F (L), T (R)','F (L), T (R)','TH'],['gerade','rechts','rechts','gerade','gerade','gerade','gerade']),D:sw(['HT','T','TH','HT','T','T','TH'],['gerade','links','links','gerade','gerade','gerade','gerade'])});
q('b_w_oimpetus','standard/waltz/open_impetus.html',{H:sw(['TH','HT','TH'],['gerade','links','gerade']),D:sw(['HT','T','TH'],['gerade','rechts','gerade'])});
q('b_w_cwing','standard/waltz/closed_wing.html',{H:sw(['HT','F','F'],['gerade','rechts','rechts']),D:sw(['HT','T','TH'],['gerade','links','links'])});
q('b_w_tlockr','standard/waltz/turning_lock_right.html',{H:sw(['T','T','T','TH'],['rechts','rechts','gerade','gerade']),D:sw(['T','T','T','TH'],['links','links','gerade','gerade'])});

/* Slowfox */
tanz('Slowfox',116,{
  b_sf_ntelemark:['Natural Telemark',[S('R','vor',42,2,'S',-90),ferse(S('L','seit',28,1,'Q',-90)),S('R','seit',15,1,'Q',-90),S('L','diagVor',26,1,'Q'),S('R','vorAussen',34,1,'Q')]],
  b_sf_hcross:['Hover Cross',[S('R','vor',42,2,'S',-90),ferse(S('L','seit',28,1,'Q',-90)),S('R','seit',24,1,'Q',-90),tip(S('L','kreuz',15,1,'Q'),'Kleiner Schritt vor in CBMP, die Dame außen links'),S('R','platz',0,1,'Q'),S('L','seit',26,1,'Q',90),S('R','vorAussen',34,1,'Q')]],
  b_sf_zigzag:['Natural Zig-Zag aus der Promenade',[S('R','kreuzSeit',30,2,'S',-45,'prom'),S('L','seit',26,1,'Q',-45),S('R','rueckAussen',28,1,'Q'),S('L','seit',26,1,'Q',90),S('R','vorAussen',34,1,'Q')]],
});
q('b_sf_ntelemark','standard/foxtrot/natural_telemark.html',{H:sw(['HT','T','T','T','TH'],['gerade','rechts','gerade','rechts','rechts']),D:sw(['TH','HT','T','TH','TH'],['gerade','links','gerade','links','links'])});
q('b_sf_hcross','standard/foxtrot/hover_cross.html',{H:sw(['HT','T','T','T','T','T','TH'],['gerade','rechts','gerade','links','gerade','rechts','rechts']),D:sw(['TH','HT','T','T','T','TH','TH'],['gerade','links','gerade','rechts','gerade','links','links'])});
q('b_sf_zigzag','standard/foxtrot/zig_zag.html',{H:sw(['HT','T','T','T','TH'],['gerade','gerade','gerade','rechts','rechts']),D:sw(['HT','T','T','TH','TH'],['gerade','gerade','gerade','links','links'])});

/* Quickstep */
tanz('Quickstep',200,{
  b_q_tipsy:['Tipsy nach rechts',[S('L','rueck',30,2,'S',-90),S('R','seit',15,.5,'Q'),tip(S('L','schliessen',0,.5,'&'),'Linken Fuß halb heranziehen'),tip(S('R','vor',15,1,'Q',-90),'Kleiner Schritt vor, scharf senken')]],
  b_q_rcross:['Rumba Cross',[S('R','vor',38,2,'S'),S('L','vor',42,1,'Q'),S('R','schliessen',0,1,'Q',-90),tip(S('L','rueck',18,1,'S',-90),'Pivot: linker Fuß seitlich zurück, Spitze einwärts'),S('L','platz',0,.5,'S',-90),S('L','platz',0,.5,'S',-90)]],
});
q('b_q_tipsy','standard/quickstep/tipsy_to_R.html',{H:sw(['TH','T','T','T'],['gerade','rechts','rechts','rechts']),D:sw(['HT','T','T','T'],['gerade','links','links','links'])});
q('b_q_rcross','standard/quickstep/rumba_cross.html',{H:sw(['HT','HT','T','TH','(Pivot)','(Pivot)'],['links','gerade','rechts','gerade','gerade','gerade']),D:sw(['TH','T','T','TH','(Pivot)','(Pivot)'],['rechts','gerade','links','gerade','gerade','gerade'])});

/* Tango */
tanz('Tango',128,{
  b_t_plink:['Promenade Link',[S('L','seit',38,2,'S',0,'prom'),S('R','kreuzSeit',30,1,'Q',0,'prom'),tip(S('L','tapSeit',20,1,'Q'),'Linken Fuß ohne Gewicht zur Seite, Knie nach innen – geschlossen')]],
  b_t_chase:['The Chase',[S('L','seit',38,2,'S',0,'prom'),S('R','kreuzSeit',30,1,'Q',0,'prom'),S('L','seit',26,1,'Q',-45),S('R','vorAussen',30,1,'Q',-45),S('L','rueckAussen',28,1,'Q',-45),S('R','seit',15,1,'S',-135,'prom'),tip(S('L','tapSeit',20,1,'S',0,'prom'),'Linken Fuß ohne Gewicht zur Seite, Knie nach innen')]],
  b_t_roswivel:['Reverse Outside Swivel',[S('L','kreuz',30,1,'Q',45),S('R','seit',26,1,'Q',90),tip(S('L','rueckAussen',26,2,'S',90,'prom'),'Swivel auf dem linken Fuß, rechter Fuß vorn in CBMP gehalten'),S('R','kreuzSeit',26,1,'Q',45,'prom'),tip(S('L','tapSeit',20,1,'Q'),'Linken Fuß ohne Gewicht zur Seite')]],
});
q('b_t_plink','standard/tango/promenade_link.html',{H:sw(['HF','HF','i/e of B'],['–','–','–']),D:sw(['HF','HB','i/e of B'],['–','–','–'])});
q('b_t_chase','standard/tango/chase.html',{H:sw(['HF','HF','i/e of BH','BH','BH','BH','i/e of B'],['–','–','–','–','–','–','–']),D:sw(['HF','HF','i/e of BH','BH','HF','BH','i/e of B'],['–','–','–','–','–','–','–'])});
q('b_t_roswivel','standard/tango/reverse_outside_swivel.html',{H:sw(['HF','BH','BH','HF','i/e of B'],['–','–','–','–','–']),D:sw(['BH','WF','HF (R), i/e of B (L)','HF','i/e of BH'],['–','–','–','–','–'])});

/* Cha-Cha-Cha und Rumba */
const cT=f=>[S(f,'seit',12,.5,'4'),S(O(f),'schliessen',0,.5,'&'),S(f,'seit',12,1,'1')];
const rtop=(cha)=>{ const c=cha?['2','3','4','&','1','2','3','4','&','1','2','3']:['2','3','4','2','3','4','2','3'], d=cha?[1,1,.5,.5,1,1,1,.5,.5,1,1,1]:[1,1,2,1,1,2,1,1], t=720/c.length;
  const intro=cha?[S('L','vor',25,1,'2'),S('R','platz',0,1,'3'),...cT('L')]:[S('L','vor',25,1,'2'),S('R','platz',0,1,'3'),S('L','seit',25,2,'4')];
  const top=c.map((z,i)=>i%2?tip(S('L','kreuz',8,d[i],z,t),i===1?'Reverse Top: der linke Fuß kreuzt vor den rechten, das Paar dreht nach links':undefined):S('R','seit',14,d[i],z,t));
  return [...intro,...top,...(cha?[S('R','seit',12,.5,'4'),S('L','schliessen',0,.5,'&'),S('R','seit',12,1,'1')]:[S('R','seit',25,2,'4')])]; };
const curl=cha=>({steps:[S('L','vor',12,1,'2',0,'LR'),S('R','platz',0,1,'3',0,'LR'),...(cha?H([S('L','schliessen',0,.5,'4'),S('R','platz',0,.5,'&'),S('L','platz',0,1,'1')],'hoch'):[S('L','schliessen',0,2,'4',0,'hoch')]),
    S('R','rueck',12,1,'2'),S('L','platz',0,1,'3',90),...(cha?H([S('R','seit',10,.5,'4'),S('L','schliessen',0,.5,'&'),S('R','seit',10,1,'1',-45)],'faecher'):[S('R','seit',12,2,'4',-45,'faecher')])],
  dame:[S('R','rueck',20,1,'2'),S('L','platz',0,1,'3'),...(cha?[S('R','vor',12,.5,'4'),S('L','kreuzHinter',6,.5,'&'),tip(S('R','vor',10,1,'1',225),'Curl: Spiraldrehung ⅝ links unter seinem Arm')]:[tip(S('R','vor',25,2,'4',225),'Curl: Spiraldrehung ⅝ links unter seinem Arm')]),
    S('L','vor',15,1,'2',45),S('R','vor',30,1,'3',135),...(cha?[S('L','rueck',12,.5,'4',90),S('R','kreuz',6,.5,'&'),S('L','rueck',12,1,'1')]:[S('L','rueck',22,2,'4',90)])]});
const cc=curl(true), rc=curl(false);
tanz('Cha-Cha-Cha',120,{
  b_c_rtop:['Reverse Top (aus dem Grundschritt)',rtop(true)],
  b_c_curl:['Curl (in den Fächer)',cc.steps,cc.dame],
});
tanz('Rumba',100,{
  b_r_rtop:['Reverse Top (aus dem Grundschritt)',rtop(false)],
  b_r_curl:['Curl (in den Fächer)',rc.steps,rc.dame],
  /* Closed Hip Twist: Die Quelle nennt für den Herrn auf Schritt 3 „RF back“ und auf Schritt 4 erneut „RF back“ – zweimal derselbe Fuß.
     Übernommen nach dem Curl derselben Quelle (dort: Schritt 3 „Close LF to RF“, „Man steps identical to Open Hip Twist“). */
  b_r_closedhip:['Closed Hip Twist (in den Fächer)',[S('L','vor',15,1,'2',-45),S('R','platz',0,1,'3'),S('L','schliessen',0,2,'4'),S('R','rueck',12,1,'2'),S('L','platz',0,1,'3'),S('R','seit',12,2,'4',45,'faecher')],
    [S('R','rueck',20,1,'2',-135),S('L','platz',0,1,'3',-90),tip(S('R','vor',25,2,'4',180),'Dame dreht ½ links und geht vor dem Herrn vorbei'),S('L','vor',15,1,'2',-90),S('R','vor',30,1,'3',135),S('L','rueck',20,2,'4',90)]],
});
q('b_c_rtop','latin/cha_cha/reverse_top.html'); q('b_c_curl','latin/cha_cha/curl.html'); q('b_r_rtop','latin/rumba/reverse_top.html'); q('b_r_curl','latin/rumba/curl.html'); q('b_r_closedhip','latin/rumba/closed_hip.html');

/* Fußarbeit vorhandener Walzerfiguren laut Quelle */
q('b_w_vw','standard/waltz/closed_change_LF.html',{H:sw(['HT','T','TH'],['gerade','links','links']),D:sw(['TH','T','TH'],['gerade','rechts','rechts'])});
q('b_w_vwr','standard/waltz/closed_change_RF.html',{H:sw(['HT','T','TH'],['gerade','rechts','rechts']),D:sw(['TH','T','TH'],['gerade','links','links'])});
q('b_w_nat','standard/waltz/natural_turn.html',{H:sw(['HT','T','TH','TH','T','TH'],['gerade','rechts','rechts','gerade','links','links']),D:sw(['TH','T','TH','HT','T','TH'],['gerade','links','links','gerade','rechts','rechts'])});
q('b_w_rev','standard/waltz/reverse_turn.html',{H:sw(['HT','T','TH','TH','T','TH'],['gerade','links','links','gerade','rechts','rechts']),D:sw(['TH','T','TH','HT','T','TH'],['gerade','rechts','rechts','gerade','links','links'])});
q('b_w_kreisel','standard/waltz/spin_turn.html',{H:sw(['HT','T','TH','THT','HT','TH'],['gerade','rechts','rechts','gerade','gerade','gerade']),D:sw(['TH','T','TH','HT','T','TH'],['gerade','links','links','gerade','gerade','gerade'])});
}
