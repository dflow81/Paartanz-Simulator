/* Kursstufe, Figurentyp und Beschreibung zu den Figuren.
   INFO[id] = [Stufe, Typ, Beschreibung, Hinweis]
     Stufe: 1 = Einsteiger (WTP 1), 2 = Bronze, 3 = Silber, 4 = Gold, 5 = Freies Tanzen
     Typ:   gs, dreh, solo, pos, prom, verb, eff (siehe ARTEN in js/figurdaten.js); leer = wird geschätzt
     Hinweis: 'v' = vereinfachte Darstellung (Armführung wird nicht gezeigt)
   Die Stufen orientieren sich am Aufbau üblicher Tanzschulkurse (Welttanzprogramm, Bronze, Silber, Gold).
   Das ist eine Orientierung, keine offizielle Zuordnung. Für Figuren ohne Eintrag wird die Stufe aus dem
   Schwierigkeitsgrad geschätzt. Neue Einträge einfach dazuschreiben. */
const INFO={};
{
const set=(stufen,texte={},typen={},hinweise={})=>{ for(const [k,s] of Object.entries(stufen)) INFO['b_'+k]=[s,typen[k]||'',texte[k]||'',hinweise[k]||'']; };

/* ---------- Discofox ---------- */
set({d_gs:1,d_dreh:1,d_drehr:1,d_offen:1,d_seit:1,d_korb:1,d_solo:1,d_solol:1,d_herr:1,d_pw:1,d_platz:1,d_rueckgs:1,d_platzw:1,d_drehl2:1,d_offenrueck:1,d_seitr:1,d_zu:1,
     d_kick:2,d_kreuzh:2,d_schatten:2,d_prom:2,d_wickel:2,d_herrr:2,d_pwr:2,
     d_doppel:3,d_handwechsel:3,d_hegoes:3,d_tunnel:3,d_hammer:3,d_schal:3,d_brezel:4},
  {d_gs:'Schritt, Schritt, Tap – Herr beginnt links vorwärts, auf 4–6 rückwärts. Grundlage aller Discofox-Figuren.',
   d_korb:'Die Dame wird links an die rechte Seite des Herrn eingedreht (auch „Wrap“ genannt), beide gehen gemeinsam, dann dreht sie rechts wieder aus; der Herr geht dabei zurück.',
   d_solo:'Der Herr hebt die linke Hand, die Dame dreht auf 1–2 eine ganze Rechtsdrehung darunter.',
   d_pw:'Platzwechsel: Die Dame geht unter dem erhobenen Arm des Herrn auf seine andere Seite und dreht dabei links.',
   d_pwr:'Platzwechsel mit Rechtsdrehung der Dame: der Herr weicht nach links aus und dreht mit, die Dame geht an seiner rechten Seite vorbei.',
   d_hegoes:'Erst wechselt die Dame unter dem Arm den Platz (She goes), dann geht der Herr unter seinem eigenen linken Arm hindurch (He goes). Am Ende steht das Paar wieder wie am Anfang.',
   d_tunnel:'Beide Hände gefasst und hoch: die Dame dreht rechts hindurch, danach der Herr links. Die Hände bleiben gefasst.',
   d_hammer:'Die Dame dreht ganz links ein, ihr rechter Arm liegt dabei hinter ihrem Rücken (Hammerlock). Ein Grundschritt in dieser Stellung, dann dreht sie rechts aus.',
   d_schal:'Der Herr dreht rechts unter den gefassten Händen, ihr Arm liegt wie ein Schal um seinen Hals; ein Grundschritt so, dann dreht er weiter zurück zur Dame.',
   d_brezel:'Die Dame wird ins Körbchen eingedreht, der Herr dreht rechts hinein – die Arme sind verschränkt wie eine Brezel. Er dreht zurück und die Dame dreht aus.',
   d_zu:'Aus der offenen Haltung (eine Hand) holt der Herr die Dame mit einem Grundschritt zurück in die geschlossene Haltung.',
   d_wickel:'Einfache Wickelfigur: die Dame dreht ins Körbchen ein und unter dem Arm wieder aus.'},
  {},{d_tunnel:'v',d_hammer:'v',d_schal:'v',d_brezel:'v',d_hegoes:'v'});

/* ---------- Langsamer Walzer ---------- */
set({w_box:1,w_links:1,w_rechts:1,w_vw:1,w_vwr:1,w_rw:1,w_rwl:1,w_nat:1,w_rev:1,w_pendel:1,w_wiege:1,
     w_wisch:2,w_chasse:2,w_zoeger:2,w_aussen:2,w_balance:2,w_prom:2,
     w_kreisel:3,w_zwechsel:3,w_vlock:3,w_rlock:3,w_impetus:3,w_kchasse:3,
     w_weave:4,w_telemark:4,w_hover:4},
  {w_nat:'Rechtsdrehung über sechs Schritte (zwei Takte), eine halbe Drehung nach rechts. Endet links, Anschluss mit einem Wechsel.',
   w_rev:'Linksdrehung über sechs Schritte, eine halbe Drehung nach links.',
   w_aussen:'Außenseitiger Wechsel: rückwärts beginnend, öffnet zur Diagonale – danach z. B. Rechtsdrehung.',
   w_wisch:'Wischer: der rechte Fuß kreuzt hinter, das Paar öffnet sich in die Promenade. Anschluss: Chassé aus der Promenade.',
   w_chasse:'Chassé aus der Promenade: führt aus dem Wischer zurück in die geschlossene Haltung.',
   w_kreisel:'Rechtskreisel: erste Hälfte der Rechtsdrehung, dann auf dem linken Fuß eine halbe Drehung nach rechts.',
   w_impetus:'Erste Hälfte der Rechtsdrehung, dann Impetus: links rückwärts, rechter Fuß schließt mit Fersendrehung. Anschluss rückwärts mit rechts.',
   w_kchasse:'Rechtskreisel, danach ein Chassé seitwärts (rück, seit, schließen, seit) zum Weitertanzen in die Linksdrehung.'},
  {w_kreisel:'dreh'});

/* ---------- Tango ---------- */
set({t_geh:1,t_gehr:1,t_gs:1,t_wiege:1,t_prom:1,
     t_links:2,t_corte:2,t_pss:2,t_link:2,t_wiegel:2,t_rechts:2,
     t_vier:3,t_oprom:3,t_rock:3,t_staccato:3,t_aussen:3,
     t_fallaway:4,t_brush:4,t_fuenf:4},
  {t_gs:'Zwei langsame Gehschritte, dann vor – seit – ran (langsam, langsam, schnell, schnell, langsam).',
   t_prom:'Promenade: das Paar öffnet sich, seit – kreuzen – seit – ran, endet wieder geschlossen.',
   t_rechts:'Aus der Promenade dreht der Herr vor der Dame nach rechts in die geschlossene Haltung; eine halbe Rechtsdrehung über vier Schritte.',
   t_fuenf:'Fünferschritt: vier schnelle Schritte (vor, seit, rück, rück), dann zeigt der linke Fuß ohne Gewicht zur Seite, Kopf zur Promenade. Anschluss: Promenade.',
   t_aussen:'Außenseitiger Wechsel: zwei Schritte rückwärts, seit mit Drehung, dann rechts außenseitlich an der Dame vorbei.',
   t_corte:'Rück-Corté: rückwärts, rückwärts, seit, ran – zum Abschluss oder Richtungswechsel.'},
  {},{t_fuenf:''});

/* ---------- Cha-Cha-Cha und Rumba (gleicher Aufbau) ---------- */
for(const p of ['c','r']){
  const g=p==='c'?'gs':'box', st={[p+'_'+g]:1,[p+'_solo']:1,[p+'_offen']:1,[p+'_platz']:1,
    [p+'_ny']:1,[p+'_hand']:2,[p+'_spot']:2,[p+'_schulter']:2,
    [p+'_fan']:3,[p+'_hockey']:3,[p+'_alemana']:3,[p+'_open']:3,
    [p+'_top']:4,[p+'_hip']:3};
  set(st,{[p+'_fan']:'Fächer: die Dame geht an die linke Seite des Herrn und steht im rechten Winkel zu ihm. Anschluss: Hockeystick oder Alemana.',
          [p+'_hockey']:'Aus dem Fächer: die Dame kommt heran und dreht links unter seinem erhobenen Arm; endet offen mit einer Hand.',
          [p+'_alemana']:'Aus dem Fächer: die Dame dreht unter seinem Arm nach rechts und kommt in die geschlossene Haltung zurück.',
          [p+'_ny']:'New Yorker: beide drehen ein Viertel nach außen und gehen nebeneinander vor, dann zur anderen Seite.',
          [p+'_hand']:'Hand to Hand: wie der New Yorker, aber rückwärts geöffnet.',
          [p+'_hip']:'Offener Hip Twist: der Herr holt die Dame an der Hand heran, sie dreht sich auf und geht in den Fächer. Anschluss: Hockeystick oder Alemana.',
          [p+'_open']:'Opening Out: der Herr schließt am Platz, die Dame öffnet sich mit einer Vierteldrehung nach rechts, dann nach links.',
          [p+'_spot']:'Platzdrehung (Spot Turn): beide drehen solo eine halbe Drehung am Platz, nach rechts und nach links.'});
}
set({c_seit:1,c_offen2:1,c_lock:2,c_time:2,c_vor:2,c_rueckl:2,c_drei:3,c_cuban:3,
     r_cuca:1,r_geh:1,r_seit:1,r_seitl:1,r_vorgeh:1,r_offen:1});

/* ---------- Samba ---------- */
set({sa_gs:1,sa_seit:1,sa_platz:1,sa_wisch:2,sa_solo:2,sa_walk:2,sa_prog:2,
     sa_volta:3,sa_bota:3,sa_links:3,sa_prom:3,sa_swalk:3,sa_rolle:4,sa_pbota:4},
  {sa_wisch:'Wischer (Whisk): seit, hinten kreuzen, Platz – nach links und nach rechts.',
   sa_bota:'Botafogo: vor, seit, Platz mit Körperdrehung, abwechselnd links und rechts.',
   sa_pbota:'Promenaden-Botafogos: das Paar öffnet sich abwechselnd zur Promenade und zur Gegenpromenade.',
   sa_swalk:'Samba-Walks in der Promenade: vor, kleiner Schritt zurück, Platz – je links und rechts.',
   sa_volta:'Voltas: seitlich über Kreuz gehen, je drei „1 a 2“ nach rechts und nach links.'});

/* ---------- Jive ---------- */
set({j_gs:1,j_dreh:1,j_offen:1,j_offen2:1,j_tap:1,j_pw:1,j_pwrl:1,
     j_kicks:2,j_spin:2,j_fall:2,j_amspin:2,
     j_whip:3,j_walk:3,j_chicken:3,j_flicks:3,j_prom:3,j_stopgo:3},
  {j_gs:'Rückschritt (Rock Step), dann zwei Chassés „3 a 4“ und „5 a 6“.',
   j_pwrl:'Platzwechsel von rechts nach links: die Dame dreht unter seinem erhobenen Arm nach rechts, der Herr dreht ein Viertel nach links. Endet offen mit einer Hand – Anschluss: Platzwechsel links nach rechts oder American Spin.',
   j_pw:'Platzwechsel von links nach rechts: die Dame dreht links unter seinem Arm. Endet offen mit einer Hand.',
   j_amspin:'American Spin: aus der offenen Haltung holt der Herr die Dame heran und gibt Schwung, sie dreht eine ganze Rechtsdrehung.',
   j_stopgo:'Stop and Go: die Dame dreht links an seine rechte Seite ein, seine rechte Hand stoppt sie, dann dreht sie rechts wieder aus.',
   j_fall:'Fallaway Rock: der Rock Step in der Promenade, beide gehen gleichzeitig zurück.'},
  {},{j_stopgo:'v',j_amspin:''});
/* ---------- Figuren mit Quelle (figuren/belegt.js) ---------- */
set({sf_bweave:2,q_npivot:2,q_rpivot:2,t_rockl:2,t_rockr:2,c_closedhip:2},
  {sf_bweave:'Basic Weave: sechs schnelle Schritte mit einer halben Linksdrehung, vom gegen die Tanzrichtung diagonal zur Mitte nach diagonal zur Wand; die letzten Schritte sind das „Weave-Ende“.',
   q_npivot:'Natural Pivot Turn: erste Hälfte der Rechtsdrehung, dann auf dem linken Fuß rückwärts eine halbe Rechtsdrehung (Pivot). Häufig an der Ecke.',
   q_rpivot:'Reverse Pivot: ein kleiner Schritt rück in CBMP mit einer halben Linksdrehung auf dem rechten Fuß.',
   t_rockl:'Rock auf dem linken Fuß: zurück, Gewicht wieder vor, kleiner Schritt zurück (Q Q S). Anschluss: Rock auf dem rechten Fuß oder Linksdrehung.',
   t_rockr:'Rock auf dem rechten Fuß in CBMP: zurück, Gewicht vor, kleiner Schritt zurück. Anschluss: Rück-Corté.',
   c_closedhip:'Closed Hip Twist: der Herr dreht die Dame aus der geschlossenen Haltung zur Seite auf und führt sie in den Fächer. Anschluss: Hockeystick oder Alemana.'},
  {sf_bweave:'dreh'},{c_closedhip:'s'});   // „Basic“ im Namen, aber eine Drehfigur, kein Grundschritt
}
/* Gleiche Schritte unter zwei Namen (Aliasse). Beide Einträge bleiben, damit gespeicherte Folgen gültig bleiben. */
const ALIAS={
  b_pd_seit:['b_pd_chasse','gleiche Schritte wie „Chassés nach rechts“'],
  b_r_seitl:['b_r_cuca','gleiche Schritte wie die Cucaracha'],
  b_r_vorgeh:['b_r_geh','gleiche Schritte wie „Gehschritte vor und rück“'],
  b_d_drehl2:['b_d_solol','gleiche Schritte wie „Damensolo links“'],
  b_bl_vorr:['b_bl_vor','gleiche Schritte wie „Vor – Tap, Rück – Tap“'],
  b_b_sensual:['b_b_platz','die Füße tanzen den Grundschritt am Platz; die Wellenbewegung des Oberkörpers wird nicht dargestellt','v'],
};
/* Zulässige Rhythmusvarianten: Figuren, deren Länge bewusst nicht zur üblichen Phrase des Tanzes passt */
const RHYTHMUS_VARIANTE={
  b_d_seit:'Seitschritte im Vierer-Rhythmus (seit, ran, seit, Tap) statt der Dreiergruppe „Schritt, Schritt, Tap“',
};
