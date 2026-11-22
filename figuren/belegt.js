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
  b_q_rpivot:['Reverse Pivot',[{...S('R','kreuzHinter',15,1,'S',90),tip:'Kleiner Schritt rück in CBMP, Spitze einwärts, ½ Linksdrehung'},S('R','platz',0,1,'S',90)]],
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
}
