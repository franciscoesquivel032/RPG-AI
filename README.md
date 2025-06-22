<h1>🛡️ RPG Character Generator API</h1>

<p>Ya se puede generar imágenes a partir de un personaje!! ^_^</p>

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

<p>Cuando haces una petición para generar un personaje, la API utiliza el siguiente <strong>prompt</strong> para construir una solicitud textual que es enviada a un modelo de IA:</p>

<pre><code>
        `Genera un personaje de rpg basado en la siguiente descripción del mundo:
        ${dto.worldDescription} 
        si la descripción del mundo es una descripción de un videojuego, una serie o una película, utiliza la descripción del mundo como base para crear un personaje que encaje en ese universo.
        Utiliza la siguiente descripción del personaje:
        ${dto.characterDescription}.
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
        No utilices nombres de personajes ya existentes, amolda el personaje a la descripción del mundo y a la descripción del personaje fielmente.
        Responde únicamente el JSON, sin ningún texto adicional.`;
</code></pre>

<h2>Stack Tecnológico</h2>
<ul>
  <li><strong>NestJS</strong> con Typescript</li>
  <li><strong>Sequelize</strong> + PostgreSQL</li>
  <li><strong>Gemini AI API + OpenAI API (DALL-E)</strong></li>
</ul>

<h2> Actualmente trabajando en almacenamiento local para las imágenes de los personajes !!!! </h2>
