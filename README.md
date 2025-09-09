# 🎉 Carta de Cumpleaños Interactiva

Este proyecto es una **página web interactiva** que simula la experiencia de abrir un sobre sellado para revelar una carta personalizada de cumpleaños. Incluye animaciones suaves, música de fondo y un diseño adaptable para pantallas móviles y de escritorio.


---


## ✨ Características principales

- **Sobre animado**:  
  El sobre “levita” sutilmente en pantalla y se abre al hacer clic en el sello.  
  Incluye animación de solapa, carta saliendo y transición hacia el contenido.

- **Texto de ayuda**:  
  Debajo del sobre aparece un mensaje interactivo:  
  *“Toca el sello para abrir”*  
  (desaparece automáticamente al abrirse el sobre).

- **Protección con contraseña**:  
  Antes de revelar la carta, se solicita una contraseña definida en `app.js`.  
  (Por defecto es: `09/09/05`).

- **Carta en blanco (editable)**:  
  Actualmente la carta se muestra como una hoja en blanco (imagen o espacio),  
  lista para ser personalizada desde el HTML en futuras mejoras.

- **Música de fondo**:  
  Al abrir el sobre se reproduce automáticamente una melodía en piano (*La La Land*, convertida a `.mp3`).  
  - Se carga desde la carpeta `video/` como `lalalan.mp3`.  
  - Reproduce en bucle (`loop`) con volumen reducido al 30%.

- **Fondo visual**:  
  Al abrir la carta, aparece un fondo ilustrado (`fondo.jpg`) con transición suave (fade + zoom).  
  El fondo solo se muestra en la sección de la carta, no en la pantalla inicial del sobre.

- **Confeti**:  
  Al abrirse la carta, se lanza confeti en varias tandas para resaltar el momento festivo.


---


## 📂 Estructura del proyecto

```bash
Carta-Lalaland/
│── index.html # Estructura principal
│── style.css # Estilos y animaciones
│── app.js # Lógica y control de interacciones
│── README.md # Este archivo
│
├── img/
│ ├── carta2.png # Imagen de la carta (actualmente vacía/decorativa)
│ └── fondo.jpg # Fondo de la carta
│
└── video/
└── lalalan.mp3 # Música de fondo en piano
```

--- 

## 🚀 Cómo usarlo

**1. Clona este repositorio:**

```bash
git clone https://github.com/Charls-Leo/Carta-lalaland.git
```

**2. Abre el archivo index.html en tu navegador.**

**3. En la pantalla inicial verás el sobre sellado con el texto:**
*“Toca el sello para abrir”.*

**4. Haz clic en el sello → introduce la contraseña → disfruta de la animación, música y carta.**

---

## 🔑 Personalización

- **Contraseña:**
Edita el valor en app.js:
```bash
const CONFIG = { PASSWORD: "leo" };
```

- **Contenido de la carta:**
Reemplaza carta2.png en img/ o edita el HTML para escribir texto en lugar de imagen.

- **Música de fondo:**
Sustituye el archivo lalalan.mp3 en la carpeta video/.

- **Fondo:**
Reemplaza fondo.jpg en img/ con cualquier otra imagen (idealmente en alta resolución).

---

## 📱 Adaptabilidad

- El diseño utiliza flexbox y clamp() para que el sobre, la carta y los textos se adapten automáticamente a distintos tamaños de pantalla.

- Probado en resoluciones móviles (Samsung S8+, iPhone 12) y escritorio.

---

## 🎨 Tecnologías utilizadas

- HTML5: Estructura base.
- CSS3: Animaciones (float, fade, zoom), estilos responsivos y transiciones suaves.
- JavaScript (ES6): Lógica de interacciones, validación de contraseña, control de audio y confeti.
- GSAP: Librería de animación para transiciones fluidas.
- Canvas Confetti: Efecto festivo al abrir la carta.

---

## 🛠 Próximas mejoras

- Editor de texto dinámico en la carta (para escribir mensajes personalizados directamente en HTML).
- Opción de subir imágenes personalizadas desde el navegador.
- Animaciones adicionales para decorar el fondo (ejemplo: estrellas parpadeantes).
- Integración con Firebase o Supabase para guardar mensajes.
