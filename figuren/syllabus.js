/* Abgleichliste: Welche Figuren gehören üblicherweise zu welcher Stufe?
   Grundlage sind die allgemein bekannten Figurennamen der Medaillenprogramme im Gesellschaftstanz (vor allem die englische
   Technik nach ISTD, an der sich auch ADTV, DTV und WDSF-Lehrmaterial orientieren). Die Liste ist aus dem Fachwissen zusammengestellt,
   KEIN Auszug aus einem offiziellen Lehrplan: Die genaue Zuordnung unterscheidet sich je nach Verband und Ausgabe.
   „Goldstar“ und „Turnier“ sind keine einheitlichen Verbandsstufen, sondern eine eigene Einordnung für anspruchsvolle Figuren.

   SYLLABUS[Tanz] = { Stufe: ['Figurenname=figurId', 'Figurenname ohne Umsetzung', ...] }   Stufen: 2 Bronze, 3 Silber, 4 Gold, 5 Goldstar, 6 Turnier */
const SYLLABUS={
'Langsamer Walzer':{
  2:['Closed Change=w_vw','Natural Turn=w_nat','Reverse Turn=w_rev','Natural Spin Turn=w_kreisel','Whisk=w_wisch','Chassé from Promenade=w_chasse','Closed Impetus=w_impetus','Hesitation Change=w_zwechsel','Outside Change=w_aussen','Reverse Corté=w_rcorte','Back Whisk=w_bwhisk','Basic Weave=w_weave','Double Reverse Spin=w_dbl','Reverse Pivot','Back Lock=w_rlock','Progressive Chassé to Right=w_pcr'],
  3:['Weave from Promenade=w_wpp','Closed Telemark=w_telemark','Open Telemark=w_otelemark','Cross Hesitation=w_cross','Wing=w_wing','Open Impetus','Outside Spin=w_ospin','Turning Lock=w_tlock','Drag Hesitation=w_drag','Left Whisk'],
  4:['Contra Check=w_contra','Closed Wing','Turning Lock to Right','Fallaway Reverse and Slip Pivot','Hover Corté=w_hcorte','Fallaway Whisk'],
  5:['Hover Telemark=w_hover','Hinge Line','Curved Feather'],
  6:['Oversway=w_oversway','Throwaway Oversway=w_throw','Same Foot Lunge=w_lunge','Chair=w_chair','Natural Fallaway'],
},
'Tango':{
  2:['Walk=t_geh','Progressive Side Step=t_pss','Progressive Link=t_link','Closed Promenade=t_prom','LF Rock (Rock Back)=t_rockl','RF Rock=t_rockr','Open Reverse Turn=t_orev','Back Corté=t_corte','Natural Rock Turn=t_rock','Basic Reverse Turn=t_links'],
  3:['Four Step=t_vier','Open Promenade=t_oprom','Back Open Promenade=t_bopr','Outside Swivel=t_oswivel','Fallaway Promenade=t_fallaway','Natural Twist Turn=t_ntwist','Natural Promenade Turn=t_npt'],
  4:['Five Step=t_fuenf','Contra Check=t_contra','Fallaway Four Step=t_fall4','Brush Tap=t_brush','Chase'],
  5:['Spanish Drag=t_drag','Promenade Link','Reverse Outside Swivel'],
  6:['Oversway=t_oversway','Same Foot Lunge','Throwaway Oversway'],
},
'Slowfox':{
  2:['Feather Step=sf_feder','Three Step=sf_dreier','Natural Turn=sf_rechts','Reverse Turn=sf_links','Closed Impetus=sf_impetus','Feather Finish=sf_ffinish','Change of Direction=sf_cod','Basic Weave=sf_bweave'],
  3:['Natural Weave=sf_nweave','Open Telemark=sf_otelemark','Top Spin=sf_topspin','Hover Feather=sf_hfeder','Hover Telemark=sf_hover','Open Impetus=sf_oimp','Weave from Promenade=sf_wpp','Reverse Wave=sf_wellen','Natural Telemark','Hover Cross'],
  4:['Curved Feather=sf_cfeder','Back Feather=sf_rfeder','Bounce Fallaway with Weave Ending=sf_bounce','Natural Twist Turn=sf_ntwist','Natural Zig Zag','Fallaway Reverse and Slip Pivot'],
  5:['Tumble Turn=sf_tumble','Extended Reverse Wave','Curved Three Step'],
  6:['Oversway','Hover Corté'],
},
'Quickstep':{
  2:['Quarter Turn to Right=q_viertel','Progressive Chassé=q_chasse','Forward Lock=q_lock','Natural Turn=q_rechts','Natural Pivot Turn=q_npivot','Natural Spin Turn=q_kreisel','Back Lock=q_rlock','Reverse Pivot=q_rpivot','Tipple Chassé to Right=q_tipple','Running Finish=q_rfinish','Natural Turn with Hesitation=q_zoeger','Chassé Reverse Turn=q_links'],
  3:['Quick Open Reverse=q_qor','Fishtail=q_fishtail','Running Right Turn=q_rrturn','Cross Swivel=q_swivel','Six Quick Run=q_6run','V6=q_v6','Zig Zag'],
  4:['Hover Corté=q_hcorte','Rumba Cross','Tipsy to Right','Fallaway Natural Turn'],
  5:['Scatter Chassés','Pepperpot=q_pepper','Hops=q_hops'],
  6:['Oversway'],
},
'Wiener Walzer':{
  2:['Natural Turn=ww_rechts','Reverse Turn=ww_links','Forward Change Natural to Reverse=ww_wr','Forward Change Reverse to Natural=ww_wl','Backward Change=ww_rwr'],
  3:['Contra Check=ww_check','Natural Fleckerl=ww_fleckerl','Reverse Fleckerl'],
},
'Cha-Cha-Cha':{
  2:['Closed Basic=c_gs','Open Basic=c_offen','Fan=c_fan','Hockey Stick=c_hockey','Alemana=c_alemana','Natural Top=c_top','New York=c_ny','Spot Turn=c_spot','Hand to Hand=c_hand','Time Step=c_time','Three Cha Chas=c_drei','Shoulder to Shoulder=c_schulter','Natural Opening Out=c_open','Closed Hip Twist=c_closedhip','Side Steps=c_seit','Cuban Break=c_cuban'],
  3:['Open Hip Twist=c_hip','Reverse Top','Aida=c_aida','Spiral=c_spiral','Cross Basic=c_cross','Turkish Towel','Sweetheart','Follow My Leader'],
  4:['Fencing=c_fence','Rope Spinning','Sliding Doors','Curl','Advanced Hip Twist','Hip Twist Spiral'],
  5:['Three Threes','Chase'],
},
'Rumba':{
  2:['Closed Basic=r_box','Open Basic=r_offen','Fan=r_fan','Hockey Stick=r_hockey','Alemana=r_alemana','Natural Top=r_top','New York=r_ny','Spot Turn=r_spot','Hand to Hand=r_hand','Shoulder to Shoulder=r_schulter','Natural Opening Out=r_open','Closed Hip Twist','Side Steps=r_seit','Cucaracha=r_cuca','Progressive Walks=r_geh'],
  3:['Open Hip Twist=r_hip','Reverse Top','Aida=r_aida','Spiral=r_spiral','Cross Basic=r_cross','Opening Out from Reverse Top'],
  4:['Fencing=r_fence','Rope Spinning','Sliding Doors','Curl','Advanced Hip Twist','Three Alemanas','Hip Twist Spiral'],
  5:['Three Threes','Continuous Hip Twist'],
},
'Samba':{
  2:['Basic Movement=sa_gs','Side Basic=sa_seit','Progressive Basic=sa_prog','Whisk=sa_wisch','Samba Walk=sa_walk','Volta=sa_volta','Botafogo=sa_bota','Stationary Samba Walk=sa_platz','Reverse Turn=sa_links','Corta Jaca'],
  3:['Promenade Botafogo=sa_pbota','Promenade Samba Walk=sa_swalk','Criss Cross Volta','Rolling Off the Arm','Plait'],
  4:['Three Step Turn','Argentine Crosses','Maypole','Contra Botafogo'],
  5:['Rolls=sa_rolle','Samba Locks','Natural Roll'],
},
'Jive':{
  2:['Basic in Place=j_gs','Fallaway Rock=j_fall','Change of Place Right to Left=j_pwrl','Change of Place Left to Right=j_pw','Link and Whip (zusammen getanzt)=j_whip','Link (allein)','American Spin=j_amspin','Stop and Go=j_stopgo','Walks=j_walk'],
  3:['Flick Ball Change=j_flicks','Chicken Walks=j_chicken','Promenade Walks=j_prom','Windmill','Spanish Arms','Rolling Off the Arm'],
  4:['Curly Whip','Toe Heel Swivels','Simple Spin','Miami Special'],
  5:['Chugging','Catapult','Stalking Walks'],
},
'Paso Doble':{
  2:['Sur Place=pd_platz','Basic Movement=pd_marsch','Chassés to Right=pd_chasse','Appel=pd_appel','Separation','Promenade=pd_prom','Ecart=pd_ecart','Huit=pd_huit','Sixteen'],
  3:['Banderillas=pd_banderillas','Grand Circle','La Passe','Twist Turn','Spanish Lines'],
  4:['Coup de Pique','Flamenco Taps','Farol','Fregolina','Syncopated Separation'],
},
'Salsa':{
  2:['Basic=s_gs','Side Basic=s_seit','Back Basic=s_rueckb','Cross Body Lead=s_cbl','Right Turn=s_dreh','Left Turn=s_drehl','Suzie Q=s_suzie','Dile que no=s_dile','Enchufla=s_ench'],
  3:['Vacílala=s_vacilala','Sombrero=s_sombrero','Copa=s_copa','Cross Hand Basic=s_kreuzgs','Setenta','Sácala','Exhíbela'],
  4:['Kentucky','Adiós','Tumba Francesa','Montaña'],
},
'Discofox':{
  2:['Grundschritt=d_gs','Damensolo=d_solo','Herrensolo=d_herr','Platzwechsel=d_pw','Körbchen=d_korb','Wickler=d_wickel','Schattenposition=d_schatten'],
  3:['Doppeldrehung=d_doppel','He Goes – She Goes=d_hegoes','Tunnel=d_tunnel','Hammerlock=d_hammer','Schal=d_schal','Handwechsel=d_handwechsel','Schulterfasser'],
  4:['Brezel=d_brezel','Lasso','Seilwurf','Sliding Doors'],
},
};
/* Stufe aus der Abgleichliste übernehmen, wenn figuren/info.js für die Figur noch nichts festlegt */
for(const stufen of Object.values(SYLLABUS)) for(const [st,liste] of Object.entries(stufen)) for(const e of liste){
  const id=e.split('=')[1]; if(id&&!INFO['b_'+id]) INFO['b_'+id]=[+st,'','',''];
}
/* Neue, schematisch beschriebene Figuren aus figuren/profi.js kennzeichnen */
for(const k of ['sf_ffinish','sf_oimp','sf_cfeder','sf_hfeder','sf_tumble','sf_bounce','sf_nweave','sf_wpp','sf_topspin','sf_otelemark','sf_ntwist','q_fishtail','q_v6','q_6run','q_rrturn','q_rfinish','q_swivel','q_qor','q_hcorte',
  'w_otelemark','w_wing','w_contra','w_hcorte','w_dbl','w_ospin','w_tlock','w_drag','w_bwhisk','w_rcorte','w_wpp','w_pcr','w_cross','w_oversway','w_throw','w_chair','w_lunge',
  't_drag','t_orev','t_bopr','t_oswivel','t_ntwist','t_npt','t_contra','t_fall4','t_oversway','c_cross','c_aida','c_fence','c_spiral','r_cross','r_aida','r_fence','r_spiral','s_dile','s_vacilala','s_sombrero','s_kreuzgs'])
  if(INFO['b_'+k]) INFO['b_'+k][3]='s';
