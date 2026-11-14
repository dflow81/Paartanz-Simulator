/* Karibische Tänze: Salsa, Bachata, Merengue */
{
/* Salsa: 1-2-3, Pause auf 4, 5-6-7, Pause auf 8 */
const s1=[S('L','vor',25,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3')];
const s2=[S('R','rueck',25,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')];
tanz('Salsa',170,{
  b_s_gs:['Grundschritt (vor und rück)',[...s1,...s2]],
  b_s_seit:['Grundschritt seitlich',[S('L','seit',25,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3'),S('R','seit',25,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')]],
  b_s_rueck:['Grundschritt rückwärts (beide Seiten)',[S('L','rueck',25,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3'),S('R','rueck',25,1,'5'),S('L','platz',0,1,'6'),S('R','schliessen',0,2,'7')],
     [S('R','rueck',25,1,'1'),S('L','platz',0,1,'2'),S('R','schliessen',0,2,'3'),S('L','rueck',25,1,'5'),S('R','platz',0,1,'6'),S('L','schliessen',0,2,'7')]],
  b_s_dreh:['Damendrehung rechts (auf 5-6-7)',
     [S('L','vor',25,1,'1'),S('R','platz',0,1,'2'),S('L','schliessen',0,2,'3',0,'hoch'),S('R','rueck',25,1,'5',0,'hoch'),S('L','platz',0,1,'6',0,'hoch'),S('R','schliessen',0,2,'7')],
     [...spiegel(s1),S('L','vor',20,1,'5',-180),S('R','vor',20,1,'6',-180),S('L','schliessen',0,2,'7')]],
  b_s_herr:['Herrendrehung rechts (auf 1-2-3)',
     [S('L','kreuz',15,1,'1',-180,'frei'),S('R','vor',15,1,'2',-180,'frei'),S('L','schliessen',0,2,'3',0,'offen'),...s2],
     [...spiegel(s1),...spiegel(s2)]],
  b_s_cbl:['Platzwechsel (Cross Body Lead)',
     // Herr macht die Bahn frei (zur Seite, ¼ links), Dame geht an ihm vorbei und dreht sich zu ihm, er schließt wieder auf
     [S('L','vor',20,1,'1'),S('R','seit',45,1,'2',90,'LR'),S('L','schliessen',0,2,'3',0,'LR'),S('R','platz',0,1,'5',0,'LR'),S('L','vor',35,1,'6',90,'LR'),S('R','schliessen',0,2,'7')],
     [S('R','rueck',20,1,'1'),S('L','platz',0,1,'2'),S('R','vor',25,2,'3'),S('L','vor',40,1,'5'),S('R','vor',20,1,'6',180),S('L','schliessen',0,2,'7')]],
});

/* Bachata: drei Schritte und ein Tap */
const b4=(f,dir,len,c0)=>[S(f,dir,len,1,String(c0)),S(O(f),dir==='platz'?'platz':'schliessen',0,1,String(c0+1)),S(f,dir,len,1,String(c0+2)),S(O(f),'tap',0,1,String(c0+3))];
tanz('Bachata',125,{
  b_b_seit:['Grundschritt seitlich',[...b4('L','seit',25,1),...b4('R','seit',25,5)]],
  b_b_vor:['Grundschritt vor und rück',[...b4('L','vor',22,1),...b4('R','rueck',22,5)]],
  b_b_platz:['Grundschritt am Platz',[...b4('L','platz',0,1),...b4('R','platz',0,5)]],
  b_b_dreh:['Damendrehung rechts (auf 1-2-3)',
     [...H(b4('L','seit',25,1),'hoch'),...b4('R','seit',25,5)],
     [S('R','seit',25,1,'1',-180),S('L','seit',25,1,'2',-180),S('R','seit',25,1,'3'),S('L','tap',0,1,'4'),...b4('L','seit',25,5)]],
  b_b_links:['Grundschritt mit Linksdrehung',[S('L','seit',25,1,'1',30),S('R','schliessen',0,1,'2',30),S('L','seit',25,1,'3',30),S('R','tap',0,1,'4'),
     S('R','seit',25,1,'5',30),S('L','schliessen',0,1,'6',30),S('R','seit',25,1,'7',30),S('L','tap',0,1,'8')]],
});

/* Merengue: auf jeden Schlag ein Schritt */
const m8=fn=>[1,2,3,4,5,6,7,8].map(n=>fn(n%2?'L':'R',String(n),n));
tanz('Merengue',130,{
  b_m_platz:['Grundschritt am Platz',m8((f,c)=>S(f,'platz',0,1,c))],
  b_m_seit:['Seitschritte nach links',m8((f,c)=>S(f,f==='L'?'seit':'schliessen',f==='L'?20:0,1,c))],
  b_m_vor:['Gehschritte vor und rück',m8((f,c,n)=>S(f,n<=4?'vor':'rueck',18,1,c))],
  b_m_paar:['Paardrehung links',m8((f,c)=>S(f,f==='L'?'vor':'schliessen',f==='L'?12:0,1,c,22.5))],
  b_m_solo:['Damendrehung rechts unter dem Arm',
     m8((f,c,n)=>S(f,'platz',0,1,c,0,n<=4?'hoch':'offen')),
     m8((f,c,n)=>n<=4?S(O(f),'vor',10,1,c,-90):S(O(f),'platz',0,1,c))],
});
}
