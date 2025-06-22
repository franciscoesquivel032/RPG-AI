<h1>🛡️ RPG Character Generator API</h1>

<p>
  Esta API, construida con <strong>NestJS</strong>, permite generar personajes personalizados para videojuegos de rol (RPG) a partir de descripciones textuales de mundos ficticios y perfiles de personajes.
  Se pretende en un futuro generar el mundo entero como generador de universos para videojuegos RPG.
</p>

<h2> Características</h2>
<ul>
  <li>Generación automática de personajes con nombre, clase, historia, apariencia y habilidad pasiva.</li>
  <li>Soporte para ubicación opcional del personaje.</li>
  <li>Integración con servicios de IA para generar contenido narrativo dinámico.</li>
  <li>IA generativa para crear imágenes a partir de un personaje</li>
</ul>

<h2>¿Cómo funciona?</h2>

<p>Cuando haces una petición para generar un personaje, la API construye una solicitud textual que es enviada a un modelo de IA:</p>

<pre><code>
        `Aquí indicamos la descripción del mundo y la del personaje a construir.
        El personaje debe tener un nombre, una clase, una historia y una habilidad pasiva. Deberás devolver un JSON con las siguientes propiedades:
        {
            "name": "Nombre del personaje",
            "class": "Clase del personaje",
            "lore": "Historia del personaje",
            "skinDescription": "Descripción detallada de la apariencia del personaje basada en la descripción del personaje",
            "passiveSkill": {
                "name": "Nombre de la habilidad pasiva",
                "description": "Descripción de la habilidad pasiva"
                "effect": "Efecto de la habilidad pasiva"
            }
            "location": ${(dto.location ?? "").trim().length === 0 ? "Localización del personaje basada en los demás datos" : `"${dto.location}"`}  
        }
        Damos las indicaciones pertinentes para obtener un resultado satisfactorio :)`;
</code></pre>

<h2>Stack Tecnológico</h2>
<ul>
  <li><strong>NestJS</strong> con Typescript</li>
  <li><strong>Sequelize</strong> + PostgreSQL</li>
  <li><strong>Gemini AI API + OpenAI API (DALL-E)</strong></li>
</ul>

<h2> Actualmente trabajando en almacenamiento local para las imágenes de los personajes !!!! </h2>
