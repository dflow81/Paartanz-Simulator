/* Standardtänze: Langsamer Walzer, Wiener Walzer, Tango, Slowfox, Quickstep */
{
const box=t=>[S('L','vor',38,1,'1',t),S('R','seit',22,1,'2',t),S('L','schliessen',0,1,'3',t),
              S('R','rueck',38,1,'1',t),S('L','seit',22,1,'2',t),S('R','schliessen',0,1,'3',t)];
/* Drehung über 6 Schritte: vor, seit, schließen, rück, seit, schließen */
const turn6=(f,t,a,b)=>[S(f,'vor',a,1,'1',t),S(O(f),'seit',b,1,'2',t),S(f,'schliessen',0,1,'3',t),
              S(O(f),'rueck',a,1,'4',t),S(f,'seit',b,1,'5',t),S(O(f),'schliessen',0,1,'6',t)];
const wechsel=(f,dir,a,b)=>[S(f,dir,a,1,'1'),S(O(f),'seit',b,1,'2'),S(f,'schliessen',0,1,'3')];

tanz('Langsamer Walzer',90,{
  b_w_box:['Grundschritt (Karree)',box(0)],
  b_w_links:['Karree mit Linksdrehung (¼)',box(15)],
  b_w_rechts:['Karree mit Rechtsdrehung (¼)',box(-15)],
  b_w_vw:['Vorwärts-Wechsel mit links',wechsel('L','vor',40,22)],
  b_w_vwr:['Vorwärts-Wechsel mit rechts',wechsel('R','vor',40,22)],
  b_w_rw:['Rückwärts-Wechsel mit rechts',wechsel('R','rueck',40,22)],
  b_w_rwl:['Rückwärts-Wechsel mit links',wechsel('L','rueck',40,22)],
  b_w_nat:['Rechtsdrehung (6 Schritte)',turn6('R',-45,38,24)],
  b_w_rev:['Linksdrehung (6 Schritte)',turn6('L',45,38,24)],
  b_w_wisch:['Wischer (in die Promenade)',[S('L','vor',35,1,'1'),S('R','seit',25,1,'2',0,'prom'),S('L','kreuzHinter',12,1,'3',0,'prom')]],
  b_w_chasse:['Chassé aus der Promenade',[S('R','kreuzSeit',30,1,'1',0,'prom'),S('L','seit',20,.5,'2'),S('R','schliessen',0,.5,'&'),S('L','seit',25,1,'3')]],
  b_w_zoeger:['Zögerschritt',[S('L','vor',35,1,'1'),S('R','seit',22,1,'2'),S('L','tap',0,1,'3')]],
  b_w_pendel:['Pendelschritt (seit, ran)',[S('L','seit',28,1,'1'),S('R','tap',0,2,'2'),S('R','seit',28,1,'1'),S('L','tap',0,2,'2')]],
});

tanz('Wiener Walzer',174,{
  b_ww_rechts:['Rechtsdrehung',turn6('R',-60,32,22)],
  b_ww_links:['Linksdrehung',turn6('L',60,32,22)],
  b_ww_wr:['Wechselschritt mit rechts',wechsel('R','vor',32,20)],
  b_ww_wl:['Wechselschritt mit links',wechsel('L','vor',32,20)],
  b_ww_pendel:['Pendelschritt (seit, ran)',[S('L','seit',26,1,'1'),S('R','tap',0,2,'2'),S('R','seit',26,1,'1'),S('L','tap',0,2,'2')]],
});

tanz('Tango',128,{
  b_t_geh:['Gehschritte vorwärts',[S('L','vor',45,2,'S'),S('R','vor',45,2,'S')]],
  b_t_gehr:['Gehschritte rückwärts',[S('L','rueck',42,2,'S'),S('R','rueck',42,2,'S')]],
  b_t_gs:['Grundschritt (vor, vor, vor–seit–ran)',[S('L','vor',40,2,'S'),S('R','vor',40,2,'S'),S('L','vor',30,1,'Q'),S('R','seit',25,1,'Q'),S('L','tap',0,2,'S')]],
  b_t_wiege:['Wiegeschritt',[S('L','vor',35,1,'Q'),S('R','platz',0,1,'Q'),S('L','rueck',30,2,'S'),S('R','schliessen',0,2,'S')]],
  b_t_prom:['Promenade',[S('L','seit',40,2,'S',0,'prom'),S('R','kreuzSeit',35,1,'Q',0,'prom'),S('L','seit',30,1,'Q',0,'prom'),S('R','schliessen',0,2,'S')]],
  b_t_links:['Linksdrehung',[S('L','vor',35,1,'Q',45),S('R','seit',28,1,'Q',45),S('L','rueck',30,2,'S',45),S('R','rueck',30,1,'Q',45),S('L','seit',25,1,'Q'),S('R','schliessen',0,2,'S')]],
  b_t_corte:['Rück-Corté',[S('L','rueck',35,2,'S'),S('R','rueck',30,1,'Q'),S('L','seit',25,1,'Q'),S('R','schliessen',0,2,'S')]],
});

tanz('Slowfox',116,{
  // Tanzschul-Folge nach Beschreibung (Entwurf): Rechts-seit-ran mit Rechtsdrehung ×3, ein Schritt rück, Federschritt,
  // links vorbei mit Linksdrehung, zwei Schritte zurück mit Linksdrehung – danach wieder von vorn
  b_sf_rsr:['Rechts, seit, ran mit Rechtsdrehung (3×)',[S('R','vor',38,2,'S',-30),S('L','seit',24,1,'Q',-30),S('R','schliessen',0,1,'Q',-30),
     S('L','rueck',38,2,'S',-30),S('R','seit',24,1,'Q',-30),S('L','schliessen',0,1,'Q',-30),
     S('R','vor',38,2,'S',-30),S('L','seit',24,1,'Q',-30),S('R','schliessen',0,1,'Q',-30)]],
  b_sf_rf:['Ein Schritt rück, dann Federschritt',[S('L','rueck',38,2,'S'),S('R','vor',45,2,'S'),S('L','vor',40,1,'Q'),{...S('R','vorAussen',36,1,'Q'),tip:'Dritter Schritt außenseitlich: rechts an der Dame vorbei'}]],
  b_sf_lv:['Links vorbei mit Linksdrehung, dann zurück',[S('L','vor',42,2,'S',30),S('R','seit',28,1,'Q',60),{...S('L','rueck',32,1,'Q',45),tip:'Links vorbei: der linke Fuß geht am rechten vorbei nach hinten, nicht schließen'},
     S('R','rueck',40,2,'S',30),S('L','rueck',40,2,'S',30)]],
  b_sf_feder:['Federschritt',[S('R','vor',50,2,'S'),S('L','vor',42,1,'Q'),{...S('R','vorAussen',38,1,'Q'),tip:'Dritter Schritt außenseitlich: rechts an der Dame vorbei'}]],
  b_sf_dreier:['Dreierschritt',[S('L','vor',50,2,'S'),S('R','vor',42,1,'Q'),S('L','vor',38,1,'Q')]],
  // Die Dame tanzt auf 2 eine Fersendrehung (df:'ferse'): Sie schließt die Füße und dreht auf den Fersen, statt zur Seite zu gehen
  b_sf_links:['Linksdrehung',[S('L','vor',45,2,'S',30),{...S('R','seit',30,1,'Q',60),df:'ferse',tip:'Dame: Fersendrehung – Füße schließen, auf den Fersen drehen'},S('L','rueck',32,1,'Q',45),
     S('R','rueck',42,2,'S',30),S('L','seit',30,1,'Q',60),S('R','vorAussen',36,1,'Q',45)]],
  b_sf_rechts:['Rechtsdrehung',[S('R','vor',45,2,'S',-30),{...S('L','seit',30,1,'Q',-60),df:'ferse',tip:'Dame: Fersendrehung – Füße schließen, auf den Fersen drehen'},S('R','rueck',32,1,'Q',-45),
     S('L','rueck',42,2,'S',-30),S('R','seit',30,1,'Q',-60),S('L','vor',36,1,'Q',-45)]],
});

tanz('Quickstep',200,{
  b_q_viertel:['Vierteldrehung und Chassé (Grundschritt)',[S('R','vor',40,2,'S',-45),S('L','seit',28,1,'Q',-45),S('R','schliessen',0,1,'Q'),S('L','diagRueck',30,2,'S'),
     S('R','rueck',35,2,'S',45),S('L','seit',28,1,'Q',45),S('R','schliessen',0,1,'Q'),S('L','diagVor',30,2,'S')]],
  b_q_geh:['Gehschritte',[S('R','vor',42,2,'S'),S('L','vor',42,2,'S')]],
  b_q_lock:['Kreuzschritt vorwärts',[S('R','vor',40,2,'S'),S('L','vor',35,1,'Q'),S('R','kreuzHinter',10,1,'Q'),S('L','vor',38,2,'S')]],
  b_q_rechts:['Rechtsdrehung',[S('R','vor',40,2,'S',-45),S('L','seit',26,1,'Q',-45),S('R','schliessen',0,1,'Q',-45),
     S('L','rueck',38,2,'S',-45),S('R','seit',26,1,'Q',-45),S('L','schliessen',0,1,'Q',-45)]],
});
}
