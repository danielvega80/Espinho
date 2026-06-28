# AMB'26 · Tracker CV Cangas Onís

Mini tracker estático (sin backend) para seguir los 4 equipos de CV Cangas de Onís
en el torneo AMB'2026 (Espinho, Portugal, 3–9 julio).

## Qué incluye
- `index.html` — vista pública, filtra por categoría y resalta los partidos de Cangas.
- `admin.html` — panel para meter resultados (sets) y publicarlos.
- `data/schedule.json` — calendario de la 1ª fase de las 4 categorías donde juega
  Cangas (60 partidos, datos de los cuadros oficiales).
- `data/results.json` — resultados (vacío al principio). Se actualiza desde `admin.html`.

**Alcance:** de momento solo está cargada la 1ª fase de los 4 grupos donde compite
Cangas (no todos los grupos de cada categoría — eso son varios cientos de partidos
más). La 2ª fase y siguientes dependen de la clasificación final, así que se añaden
a mano desde "+ Añadir partido" en el admin cuando se confirmen los cruces.

## Cómo desplegarlo (GitHub Pages)
1. Crea un repo nuevo en GitHub (ej. `AMB26`) y sube todos estos archivos a la raíz.
2. En el repo: Settings → Pages → Branch: `main` / carpeta `/ (root)` → Save.
3. Tu tracker quedará en `https://<tu-usuario>.github.io/AMB26/`.

## Cómo publicar resultados desde el móvil
1. Abre `admin.html` en el sitio publicado.
2. Pulsa "⚙ ajustes de GitHub" una vez y rellena:
   - Owner: tu usuario de GitHub (`danielvega80`)
   - Repo: el nombre del repo (`AMB26`)
   - Branch: `main`
   - Token: un Personal Access Token clásico con scope `repo`
     (GitHub → Settings → Developer settings → Personal access tokens → Generate new token classic)
3. Guarda ajustes — se quedan en ese navegador/móvil, no se suben a ningún sitio.
4. Mete los sets de cada partido (se admiten hasta 5 sets por si hay finales a 5).
5. Pulsa "Publicar cambios en GitHub" — hace commit de `data/results.json` directamente
   en el repo. La web pública se actualiza en menos de un minuto.

## Cómo añadir un partido de 2ª fase / playoffs
En `admin.html`, dentro de cada categoría, usa el formulario "+ Añadir partido":
pones los dos equipos reales (en cuanto se sepan, ej. "1º Grupo D"), fecha, hora
y campo, y se guarda junto con el resto al publicar.
