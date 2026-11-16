/* Weitere Tänze des Welttanzprogramms (Fassung ab 2012) und früherer Fassungen, jeweils mit den Grundfiguren:
   Walzer-Musette, Tangowalzer, Disco-Samba, Two Step, Bugg, Cumbia, Tango Americano, Nordic Tango, Mambo, Marschfox.
   Vereinfachte Tanzschul-Versionen. */
{
const w6=(t,a,b)=>[S('L','vor',a,1,'1',t),S('R','seit',b,1,'2',t),S('L','schliessen',0,1,'3',t),S('R','rueck',a,1,'1',t),S('L','seit',b,1,'2',t),S('R','schliessen',0,1,'3',t)];
const turn6=(f,t,a,b)=>[S(f,'vor',a,1,'1',t),S(O(f),'seit',b,1,'2',t),S(f,'schliessen',0,1,'3',t),S(O(f),'rueck',a,1,'4',t),S(f,'seit',b,1,'5',t),S(O(f),'schliessen',0,1,'6',t)];

/* Walzer-Musette: schneller Walzer mit ganz kleinen Schritten, fast am Platz gedreht */
tanz('Walzer-Musette',180,{
  b_mu_gs:['Grundschritt (kleines Karree)',w6(0,20,12)],
  b_mu_wiege:['Wiegeschritt (vor, Platz, ran)',[S('L','vor',20,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,1,'3'),S('R','rueck',20,1,'1'),S('L','platz',0,1,'2'),S('R','schliessen',0,1,'3')]],
  b_mu_rechts:['Rechtsdrehung am Platz',turn6('R',-60,18,12)],
  b_mu_links:['Linksdrehung am Platz',turn6('L',60,18,12)],
  b_mu_pendel:['Pendelschritt (seit, ran)',[S('L','seit',22,1,'1'),S('R','tap',0,2,'2'),S('R','seit',22,1,'1'),S('L','tap',0,2,'2')]],
  b_mu_wr:['Wechselschritt mit rechts',[S('R','vor',20,1,'1'),S('L','seit',12,1,'2'),S('R','schliessen',0,1,'3')]],
  b_mu_wl:['Wechselschritt mit links',[S('L','vor',20,1,'1'),S('R','seit',12,1,'2'),S('L','schliessen',0,1,'3')]],
});

/* Tangowalzer: Tangoschritte im Dreivierteltakt – meist ein Schritt pro Takt, auf die „1“ */
tanz('Tangowalzer',180,{
  b_tw_geh:['Gehschritte vorwärts (ein Schritt pro Takt)',[S('L','vor',42,3,'1'),S('R','vor',42,3,'1')]],
  b_tw_gehr:['Gehschritte rückwärts',[S('L','rueck',40,3,'1'),S('R','rueck',40,3,'1')]],
  b_tw_wechsel:['Gehschritt und Wechselschritt (1 – 1, 2, 3)',[S('L','vor',42,3,'1'),S('R','vor',30,1,'1'),S('L','seit',22,1,'2'),S('R','schliessen',0,1,'3')]],
  b_tw_wiege:['Vor – ran, rück – ran',[S('L','vor',35,3,'1'),S('R','schliessen',0,3,'1'),S('L','rueck',30,3,'1'),S('R','schliessen',0,3,'1')]],
  b_tw_links:['Linksdrehung im Karree',w6(30,35,22)],
  b_tw_prom:['Promenade',[S('L','seit',38,3,'1',0,'prom'),S('R','kreuzSeit',32,3,'1',0,'prom'),S('L','seit',25,2,'1'),S('R','schliessen',0,1,'3')]],
});

/* Disco-Samba: Samba-Schritte zur Discomusik, „1 a 2“ = ¾, ¼, 1 Schlag */
const ds=(f,dir,len,mid,c1,c2,t=0)=>[S(f,dir,len,.75,c1,t),S(O(f),mid,mid==='kreuzHinter'?8:0,.25,'a'),S(f,'platz',0,1,c2)];
tanz('Disco-Samba',120,{
  b_ds_gs:['Grundschritt (vor und rück)',[...ds('L','vor',22,'schliessen','1','2'),...ds('R','rueck',22,'schliessen','3','4')]],
  b_ds_seit:['Grundschritt seitlich',[...ds('L','seit',22,'schliessen','1','2'),...ds('R','seit',22,'schliessen','3','4')]],
  b_ds_wisch:['Wischer (links und rechts)',[...ds('L','seit',25,'kreuzHinter','1','2'),...ds('R','seit',25,'kreuzHinter','3','4')]],
  b_ds_dreh:['Grundschritt mit Linksdrehung',[...ds('L','vor',22,'schliessen','1','2',30),...ds('R','rueck',22,'schliessen','3','4',30)]],
  b_ds_solo:['Damendrehung rechts im Wischer',
     [...H(ds('L','seit',25,'kreuzHinter','1','2'),'hoch'),...ds('R','seit',25,'kreuzHinter','3','4')],
     [S('R','seit',25,.75,'1',-180),S('L','seit',8,.25,'a',-180),S('R','platz',0,1,'2'),...ds('L','seit',25,'kreuzHinter','3','4')]],
});

/* Two Step: schnell, schnell, lang, lang – ein Gehtanz durch den Raum */
tanz('Two Step',160,{
  b_ts_gs:['Grundschritt vorwärts (schnell, schnell, lang, lang)',[S('L','vor',30,1,'Q'),S('R','vor',30,1,'Q'),S('L','vor',38,2,'S'),S('R','vor',38,2,'S')]],
  b_ts_rueck:['Grundschritt rückwärts',[S('L','rueck',28,1,'Q'),S('R','rueck',28,1,'Q'),S('L','rueck',36,2,'S'),S('R','rueck',36,2,'S')]],
  b_ts_check:['Wiegeschritt (vor, Platz, rück, rück)',[S('L','vor',28,1,'Q'),S('R','platz',0,1,'Q'),S('L','rueck',32,2,'S'),S('R','rueck',32,2,'S')]],
  b_ts_links:['Linksdrehung',[S('L','vor',28,1,'Q',45),S('R','seit',25,1,'Q',45),S('L','rueck',32,2,'S'),S('R','rueck',32,2,'S')]],
  b_ts_prom:['Promenade',[S('L','seit',30,1,'Q',0,'prom'),S('R','kreuzSeit',25,1,'Q',0,'prom'),S('L','seit',32,2,'S',0,'prom'),S('R','kreuzSeit',28,2,'S',0,'prom')]],
  b_ts_solo:['Damendrehung rechts unter dem Arm',
     [S('L','vor',30,1,'Q',0,'hoch'),S('R','vor',30,1,'Q',0,'hoch'),S('L','vor',38,2,'S'),S('R','vor',38,2,'S')],
     [S('R','rueck',30,1,'Q',-180),S('L','vor',30,1,'Q',-180),S('R','rueck',38,2,'S'),S('L','rueck',38,2,'S')]],
});

/* Bugg (aus Schweden): vier gleichmäßige Schritte, auf jeden Schlag einer; getanzt wird offen mit vielen Drehungen */
tanz('Bugg',140,{
  b_bg_gs:['Grundschritt (rück, rück, vor, vor)',H([S('L','rueck',20,1,'1'),S('R','rueck',20,1,'2'),S('L','vor',20,1,'3'),S('R','vor',20,1,'4')],'offen')],
  b_bg_platz:['Grundschritt am Platz',H([S('L','platz',0,1,'1'),S('R','platz',0,1,'2'),S('L','platz',0,1,'3'),S('R','platz',0,1,'4')],'offen')],
  b_bg_dreh:['Grundschritt mit Linksdrehung',H([S('L','vor',10,1,'1',22.5),S('R','schliessen',0,1,'2',22.5),S('L','vor',10,1,'3',22.5),S('R','schliessen',0,1,'4',22.5)],'offen')],
  b_bg_solo:['Damendrehung rechts unter dem Arm',
     [S('L','platz',0,1,'1',0,'hoch'),S('R','platz',0,1,'2',0,'hoch'),S('L','platz',0,1,'3',0,'LR'),S('R','platz',0,1,'4',0,'LR')],
     [S('R','vor',18,1,'1',-180),S('L','vor',18,1,'2',-180),S('R','platz',0,1,'3'),S('L','platz',0,1,'4')]],
  b_bg_solol:['Damendrehung links unter dem Arm',
     [S('L','platz',0,1,'1',0,'hoch'),S('R','platz',0,1,'2',0,'hoch'),S('L','platz',0,1,'3',0,'LR'),S('R','platz',0,1,'4',0,'LR')],
     [S('R','vor',18,1,'1',180),S('L','vor',18,1,'2',180),S('R','platz',0,1,'3'),S('L','platz',0,1,'4')]],
  b_bg_pw:['Platzwechsel (Dame dreht links unter dem Arm)',
     [S('L','kreuz',30,1,'1',0,'hoch'),S('R','vor',30,1,'2',180,'hoch'),S('L','platz',0,1,'3',0,'LR'),S('R','platz',0,1,'4',0,'LR')],
     [S('R','diagVor',60,1,'1'),S('L','diagVor',60,1,'2',180),S('R','platz',0,1,'3'),S('L','platz',0,1,'4')]],
});

/* Cumbia: 1-2-3, Pause auf 4 – der typische Schritt geht nach hinten über Kreuz */
const cu1=[S('L','vor',22,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3')], cu2=[S('R','rueck',22,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')];
tanz('Cumbia',100,{
  b_cu_gs:['Grundschritt (beide kreuzen hinten)',
     H([S('L','kreuzHinter',15,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3'),S('R','kreuzHinter',15,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')],'offen'),
     [S('R','kreuzHinter',15,1,'1'),S('L','platz',0,1,'2'),S('R','schliessen',0,2,'3'),S('L','kreuzHinter',15,1,'5'),S('R','platz',0,1,'6'),S('L','schliessen',0,2,'7')]],
  b_cu_vor:['Grundschritt vor und rück',[...cu1,...cu2]],
  b_cu_seit:['Grundschritt seitlich',[S('L','seit',22,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3'),S('R','seit',22,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')]],
  b_cu_paar:['Paardrehung rechts am Platz',[S('L','vor',12,1,'1',-30),S('R','schliessen',0,1,'2',-30),S('L','platz',0,2,'3',-30),S('R','rueck',12,1,'5',-30),S('L','schliessen',0,1,'6',-30),S('R','platz',0,2,'7',-30)]],
  b_cu_dreh:['Damendrehung rechts (auf 5-6-7)',
     [S('L','vor',22,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3',0,'hoch'),S('R','rueck',22,1,'5',0,'hoch'),S('L','platz',0,1,'6',0,'hoch'),S('R','schliessen',0,2,'7')],
     [...spiegel(cu1),S('L','vor',20,1,'5',-180),S('R','vor',20,1,'6',-180),S('L','schliessen',0,2,'7')]],
});

/* Tango Americano: der Grundschritt wird „T-A-N-G-O“ gezählt – lang, lang, schnell, schnell, lang */
const tgo=[S('L','vor',28,1,'Q'),S('R','seit',25,1,'Q'),{...S('L','tap',0,2,'S'),tip:'Der linke Fuß wird ohne Gewicht herangezogen'}];
tanz('Tango Americano',120,{
  b_tam_gs:['Grundschritt (T-A-N-G-O)',[S('L','vor',40,2,'S'),S('R','vor',40,2,'S'),...tgo]],
  b_tam_prom:['Promenade',[S('L','seit',38,2,'S',0,'prom'),S('R','kreuzSeit',32,2,'S',0,'prom'),...tgo]],
  b_tam_corte:['Corté (rück, vor, Tango-Abschluss)',[{...S('L','rueck',35,2,'S'),tip:'Corté: er geht weich ins linke Knie, sie kommt nach vorn'},S('R','platz',0,2,'S'),...tgo]],
  b_tam_wiege:['Wiegeschritte (vor, Platz, rück)',[S('L','vor',28,1,'Q'),S('R','platz',0,1,'Q'),S('L','rueck',22,2,'S'),S('R','rueck',30,1,'Q'),S('L','seit',25,1,'Q'),S('R','schliessen',0,2,'S')]],
  b_tam_links:['Linksdrehung mit Wiegeschritt',[S('L','vor',28,1,'Q',30),S('R','platz',0,1,'Q',30),S('L','rueck',22,2,'S',30),S('R','rueck',30,1,'Q'),S('L','seit',25,1,'Q'),S('R','schliessen',0,2,'S')]],
});

/* Nordic Tango (finnischer Tango): lange, gleitende Schritte – lang, lang, schnell, schnell */
tanz('Nordic Tango',116,{
  b_nt_gs:['Grundschritt (lang, lang, schnell, schnell)',[S('L','vor',45,2,'S'),S('R','vor',45,2,'S'),S('L','vor',32,1,'Q'),S('R','schliessen',0,1,'Q')]],
  b_nt_rueck:['Grundschritt rückwärts',[S('L','rueck',42,2,'S'),S('R','rueck',42,2,'S'),S('L','rueck',30,1,'Q'),S('R','schliessen',0,1,'Q')]],
  b_nt_seit:['Grundschritt mit Seitschritt',[S('L','vor',45,2,'S'),S('R','vor',45,2,'S'),S('L','seit',28,1,'Q'),S('R','schliessen',0,1,'Q')]],
  b_nt_wiege:['Wiegeschritt',[S('L','vor',35,2,'S'),S('R','platz',0,2,'S'),S('L','rueck',30,1,'Q'),S('R','schliessen',0,1,'Q')]],
  b_nt_links:['Linksdrehung',[S('L','vor',38,2,'S',45),S('R','seit',28,2,'S',45),S('L','rueck',30,1,'Q'),S('R','schliessen',0,1,'Q')]],
  b_nt_prom:['Promenade',[S('L','seit',40,2,'S',0,'prom'),S('R','kreuzSeit',35,2,'S',0,'prom'),S('L','seit',28,1,'Q',0,'prom'),S('R','schliessen',0,1,'Q')]],
});

/* Mambo: Pause auf 1, getanzt wird 2-3-4 */
const ma1=[S('L','vor',25,1,'2'),S('R','platz',0,1,'3'),S('L','schliessen',0,2,'4')], ma2=[S('R','rueck',25,1,'2'),S('L','platz',0,1,'3'),S('R','schliessen',0,2,'4')];
tanz('Mambo',190,{
  b_ma_gs:['Grundschritt (vor und rück, auf 2-3-4)',[...ma1,...ma2]],
  b_ma_seit:['Grundschritt seitlich',[S('L','seit',25,1,'2'),S('R','platz',0,1,'3'),S('L','schliessen',0,2,'4'),S('R','seit',25,1,'2'),S('L','platz',0,1,'3'),S('R','schliessen',0,2,'4')]],
  b_ma_links:['Grundschritt mit Linksdrehung',[S('L','vor',25,1,'2',30),S('R','platz',0,1,'3',30),S('L','schliessen',0,2,'4',30),S('R','rueck',25,1,'2',30),S('L','platz',0,1,'3',30),S('R','schliessen',0,2,'4',30)]],
  b_ma_dreh:['Damendrehung rechts unter dem Arm',
     [S('L','vor',25,1,'2'),S('R','platz',0,1,'3'),S('L','schliessen',0,2,'4',0,'hoch'),S('R','rueck',25,1,'2',0,'hoch'),S('L','platz',0,1,'3',0,'hoch'),S('R','schliessen',0,2,'4')],
     [...spiegel(ma1),S('L','vor',20,1,'2',-180),S('R','vor',20,1,'3',-180),S('L','schliessen',0,2,'4')]],
});

/* Marschfox: auf jeden Schlag ein Schritt, wie beim Marschieren */
const n4=fn=>['1','2','3','4'].map((c,i)=>fn(i%2?'R':'L',c));
tanz('Marschfox',120,{
  b_mf_geh:['Gehschritte vorwärts',n4((f,c)=>S(f,'vor',32,1,c))],
  b_mf_rueck:['Gehschritte rückwärts',n4((f,c)=>S(f,'rueck',30,1,c))],
  b_mf_wechsel:['Wechselschritt (vor, vor, seit, ran)',[S('L','vor',32,1,'1'),S('R','vor',32,1,'2'),S('L','seit',25,1,'3'),S('R','schliessen',0,1,'4')]],
  b_mf_seit:['Seitschritte (seit, ran)',n4((f,c)=>S(f,f==='L'?'seit':'schliessen',f==='L'?25:0,1,c))],
  b_mf_wiege:['Wiegeschritt (vor, Platz, rück, Platz)',[S('L','vor',28,1,'1'),S('R','platz',0,1,'2'),S('L','rueck',28,1,'3'),S('R','platz',0,1,'4')]],
  b_mf_dreh:['Rechtsdrehung am Platz',n4((f,c)=>S(f,f==='L'?'vor':'schliessen',f==='L'?12:0,1,c,-45))],
});
}
