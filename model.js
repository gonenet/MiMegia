export const stations=[
 {id:'ef1',name:'אפרת · זית שמן 38',group:'ef',lat:31.671,lon:35.157},
 {id:'ef2',name:'אפרת · זית שמן 51',group:'ef',lat:31.668,lon:35.155},
 {id:'nd',name:'נווה דניאל · מאפיית שיפון',group:'nd',lat:31.675,lon:35.143},
 {id:'el',name:'אלעזר · נצר חזני 129',group:'el',lat:31.659,lon:35.143},
 {id:'gush',name:'צומת גוש עציון',lat:31.647,lon:35.13},
 {id:'alon',name:'כיכר אלון שבות / כביש 367',lat:31.655,lon:35.115},
 {id:'roglit',name:'צומת רוגלית',lat:31.674,lon:35.006},
 {id:'adulam',name:'צומת עדולם',lat:31.686,lon:34.989},
 {id:'azeka',name:'צומת עזקה',lat:31.706,lon:34.946}
];
export const routes={full:{name:'הנתיב המלא',url:'https://maps.app.goo.gl/ts6PKMNs6Yp3Rf4M6'},noND:{name:'ללא נווה דניאל',url:'https://maps.app.goo.gl/HzxCzGU7wH9bADBg9'},noEF:{name:'ללא אפרת',url:'https://maps.app.goo.gl/Tjfprz5qV92xZKD68'},noNDEL:{name:'ללא נווה דניאל ואלעזר',url:'https://maps.app.goo.gl/Gw3aDy64vzfG4iyp9'}};
export function localDate(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function dayOf(date){return new Date(`${date}T12:00:00`).getDay();}
export function attendance(person,date){const matches=person.exceptions.filter(e=>e.from<=date&&e.to>=date);const single=matches.filter(e=>e.from===e.to);const e=(single.length?single:matches).at(-1);return {going:e?.going??person.days.includes(dayOf(date)),station:e?.station||person.station};}
export function plan(state,date){const groups=Object.fromEntries(stations.map(s=>[s.id,[]]));for(const p of state.passengers){const a=attendance(p,date);if(a.going&&groups[a.station])groups[a.station].push(p);}
 const ef=groups.ef1.length+groups.ef2.length>0,nd=groups.nd.length>0,el=groups.el.length>0;
 const route=ef?(nd?'full':el?'noND':'noNDEL'):'noEF';
 return {groups,route,total:Object.values(groups).reduce((n,g)=>n+g.length,0),active:stations.filter(s=>groups[s.id].length),needsReview:!ef&&!nd||ef&&nd&&!el,ef};}
export function seed(){return {passengers:['אורי','דניאל','יעל','משה','נועה','איתי','תמר','יוסי','רוני','אייל'].map((name,i)=>({id:`p${i}`,name:`${name} (הדגמה)`,station:stations[Math.min(i,8)].id,days:[0,1,2,3,4],exceptions:[]})),times:{},departures:{full:'',noND:'',noEF:'',noNDEL:''},deadline:'20:00'};}
