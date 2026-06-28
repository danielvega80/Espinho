const CANGAS = "CV Cangas Onís";
const DOW = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
const MON = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];

function fmtDate(iso){
  if(!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return `${DOW[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`;
}

async function loadJSON(path){
  const res = await fetch(path + "?t=" + Date.now());
  if(!res.ok) throw new Error("No se pudo cargar " + path);
  return res.json();
}

async function loadAll(){
  const [schedule, results, venues] = await Promise.all([
    loadJSON("data/schedule.json"),
    loadJSON("data/results.json"),
    loadJSON("data/venues.json")
  ]);
  return { schedule, results, venues };
}

function venueInfo(venueKey, venues){
  if(!venueKey || !venues || !venues[venueKey]) return null;
  return venues[venueKey];
}

function venueLineHTML(match, venues){
  const v = venueInfo(match.venueKey, venues);
  if(!v){
    return match.venue ? `<span>${match.venue}</span>` : `<span>pabellón s/c</span>`;
  }
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${v.lat},${v.lng}`;
  const title = `${v.name} — ${v.address}`;
  return `<a href="${mapsUrl}" target="_blank" rel="noopener" title="${title}">${match.venue} ↗</a>`;
}

// sets: array of [a,b] pairs (only ones played). Returns {winner:'A'|'B'|null, setsA, setsB}
function setsSummary(sets){
  if(!sets || !sets.length) return { winner:null, setsA:0, setsB:0 };
  let a=0,b=0;
  sets.forEach(([sa,sb])=>{
    if(sa==null||sb==null||(sa===0&&sb===0)) return;
    if(sa>sb) a++; else if(sb>sa) b++;
  });
  let winner = null;
  if(a>b) winner='A'; else if(b>a) winner='B';
  return { winner, setsA:a, setsB:b };
}

function groupByDate(matches){
  const out = {};
  matches.forEach(mt=>{
    const key = mt.date || "—";
    (out[key] = out[key] || []).push(mt);
  });
  return Object.keys(out).sort().map(k=>({date:k, matches:out[k].sort((x,y)=> (x.time||"").localeCompare(y.time||""))}));
}

function matchResult(matchId, results){
  return results && results.results ? results.results[String(matchId)] : null;
}
