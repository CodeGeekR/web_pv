// send.js
// Importamos las dependencias necesarias para nuestra aplicación
require('dotenv').config(); // dotenv nos permite usar variables de entorno en un archivo .env
const express = require('express'); // express es un framework para crear servidores HTTP en Node.js
const axios = require('axios');
const cors = require('cors'); // cors nos permite configurar el Cross-Origin Resource Sharing para nuestra aplicación
const formData = require('form-data'); // form-data nos permite manejar datos de formularios multipart/form-data
// const Mailgun = require('mailgun.js'); // mailgun.js es un cliente para la API de Mailgun
const Resend = require('resend').Resend; // resend es un cliente para la API de Resend
const expressSanitizer = require('express-sanitizer'); // express-sanitizer nos permite sanitizar los datos de las solicitudes HTTP
const rateLimit = require('express-rate-limit'); // express-rate-limit nos permite limitar el número de solicitudes que se pueden realizar a una aplicación
// const path = require('path'); // path nos permite trabajar con rutas de archivos y directorios

// Creamos una nueva aplicación Express
const app = express();

// Redirección de /index.html a la raíz /
app.get('/index.html', (req, res) => {
    res.redirect(301, '/');
});

// Lista de orígenes permitidos para las solicitudes CORS
const whitelist = ['https://www.palabravivaiglesia.co'];

// Opciones de CORS
const options = {
    // Esta función se ejecuta para cada solicitud para verificar si el origen está permitido
    origin: function (origin, callback) {
        // Si no hay un origen (por ejemplo, la solicitud es desde el mismo origen) o el origen está en la lista blanca, la solicitud está permitida
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            // Si el origen no está permitido, se lanza un error
            callback(new Error('Not allowed by CORS'));
        }
    },
    // Métodos HTTP permitidos POST y GET
    methods: "POST, GET",
};

// Aplicamos las opciones de CORS a nuestra aplicación Express
app.use(cors(options));

// Usamos el middleware express.json() para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Usamos express-sanitizer como middleware después de express.json()
app.use(expressSanitizer());

// Servimos archivos estáticos desde el directorio raíz
// app.use(express.static(path.join(__dirname, '/')));

// Creamos un nuevo cliente de Mailgun
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
//     username: 'api',
//     key: process.env.MAILGUN_API_KEY,
// });

// Creamos un nuevo cliente de Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Aplica una limitación de tasa de 100 solicitudes por hora a todas las rutas
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 100 // limita cada IP a 20 solicitudes por ventana
});
app.use(limiter);


// Definimos una ruta POST para enviar correos electrónicos
app.post('/api/send', async (req, res, next) => {
    // Los datos del correo electrónico se toman del cuerpo de la solicitud
    const data = {
        from: process.env.RESEND_FROM,
        to: [process.env.RESEND_TO],
        subject: req.sanitize(req.body.subject),
        html: `Mensaje de: ${req.sanitize(req.body.name)} ${req.sanitize(req.body.lastname)} (${req.sanitize(req.body.email)})<br><br>${req.sanitize(req.body.message)}`
    };

    try {
        // Intentamos enviar el correo electrónico
        const { data: responseData, error } = await resend.emails.send(data);

        if (error) {
            console.error(error);
            return res.status(400).json({ error });
        }

        res.status(200).json({ data: responseData });
    } catch (error) {
        // Si hay un error en el proceso de envío del correo, lo registramos y devolvemos un error 500
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al enviar el correo electrónico.' });
    }
});

// // Definimos una ruta POST para enviar correos electrónicos
// app.post('/api/send', (req, res, next) => {
//     // Los datos del correo electrónico se toman del cuerpo de la solicitud
//     const data = {
//         from: process.env.MAILGUN_FROM,
//         to: process.env.MAILGUN_TO,
//         subject: req.sanitize(req.body.subject),
//         text: `Mensaje de: ${req.sanitize(req.body.name)} ${req.sanitize(req.body.lastname)} (${req.sanitize(req.body.email)})\n\n${req.sanitize(req.body.message)}`
//     };

//     // Intentamos enviar el correo electrónico
//     mg.messages.create(process.env.MAILGUN_DOMAIN, data)
//         .then(msg => res.json({ msg })) // Si se envía con éxito, respondemos con el mensaje de Mailgun
//         .catch(err => {
//             console.error(err); // Si hay un error, lo registramos
//             next(err); // Pasamos el error al siguiente middleware
//         });
// });

// Definimos la ruta para obtener la información del directo de YouTube
app.get('/api/live', async (req, res) => {
    try {
        // Definimos los parámetros públicos de la solicitud
        const channelId = 'UCuRnuWVbzk8snPqZAmuna4w';
        const part = 'snippet';
        const eventType = 'live';
        const type = 'video';

        // Construimos la URL de la API de YouTube con los parámetros
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=${part}&channelId=${channelId}&eventType=${eventType}&type=${type}&key=${process.env.YOUTUBE_API_KEY}`;

        // Realizamos la solicitud a la API de YouTube usando Axios
        const response = await axios.get(apiUrl);
        const liveBroadcast = response.data.items[0];

        // Verificamos si hay un directo activo
        if (liveBroadcast) {
            const liveVideoId = liveBroadcast.id.videoId;
            res.json({ liveVideoId }); // Devolvemos el ID del video en vivo
        } else {
            res.json({ liveVideoId: null }); // Devolvemos null si no hay directo
        }
    } catch (error) {
        console.error('Error al obtener la transmisión en vivo:', error);
        res.status(500).json({ error: 'Error al obtener la transmisión en vivo' });
    }
});

// manejar las peticiones get
app.get('/api/send', (req, res) => {
    res.send('¡Hola! Soy un servidor Express que envía correos electrónicos.');
});

// Middleware de manejo de errores
// Este middleware se ejecuta si cualquier otro middleware llama a next() con un error
app.use((err, req, res, next) => {
    console.error(err.stack); // Registramos el stack trace del error
    // Respondemos con un estado 500 y un mensaje de error genérico
    res.status(500).send('¡Algo se rompió!');
});

// Especificamos en que puerto nuestra aplicación Express debe escuchar
// (Habilitar únicamente si se está ejecutando en modo de desarrollo)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

// Exportamos la aplicación Express para que pueda ser usada en otros módulos
module.exports = app;

