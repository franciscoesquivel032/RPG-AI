<h1>🛡️ RPG Character Generator API</h1>

<p>
  This API, built with <strong>NestJS</strong>, allows the generation of custom role-playing game (RPG) characters based on textual descriptions of fictional worlds and character profiles.
  In the future, the goal is to generate entire worlds as a universe generator for RPGs.
</p>

<h2>Features</h2>
<ul>
  <li>Automatic generation of characters with name, class, lore, appearance, and passive skill.</li>
  <li>Optional support for specifying the character’s location.</li>
  <li>Integration with AI services to generate dynamic narrative content.</li>
  <li>Generative AI to create images based on a character.</li>
</ul>

<h2>How does it work?</h2>

<p>When you make a request to generate a character, the API constructs a textual prompt that is sent to an AI model:</p>

<pre><code>
        `Here we provide the description of the world and the character to be created.
        The character must have a name, a class, a backstory, and a passive skill. You must return a JSON with the following properties:
        {
            "name": "Character's name",
            "class": "Character's class",
            "lore": "Character's backstory",
            "skinDescription": "Detailed description of the character’s appearance based on the provided description",
            "passiveSkill": {
                "name": "Passive skill name",
                "description": "Passive skill description",
                "effect": "Effect of the passive skill"
            }
            "location": ${(dto.location ?? "").trim().length === 0 ? "Character location based on other data" : `"${dto.location}"`}  
        }
        We provide the necessary instructions to obtain a satisfactory result :)`;
</code></pre>

<h2>Tech Stack</h2>
<ul>
  <li><strong>NestJS</strong> with TypeScript</li>
  <li><strong>Sequelize</strong> + PostgreSQL</li>
  <li><strong>Gemini AI API + OpenAI API (DALL·E)</strong></li>
</ul>

<h2> Currently working on local storage for character images !!!! </h2>

