import 'dotenv/config';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import methodOverride from 'method-override';
import path from 'path';
import mainRouter from './routes/main-route.js';

const app = express();
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';

// CONFIGURATION & VIEWS
app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));

// SECURITY & UTILITY MIDDLEWARE
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan('dev'));
app.use(methodOverride('_method'));

// BODY PARSERS & STATIC FILES
app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//LAYOUTS
app.use(expressLayouts);
app.set('layout', 'layout');

// EJS LOCALS HELPERS
app.use((req, res, next) => {
    res.locals.req = req;
    res.locals.hasAll = (...keys) => keys.every(key => key in res.locals);
    res.locals.hasAny = (...keys) => keys.some(key => key in res.locals);
    next();
});

// ROUTES
app.use('/', mainRouter);

// 404 HANDLER
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Not Found - ${req.originalUrl}`
  });
});


// GLOBAL ERROR HANDLER (Secure Logging vs Presentation Boundary)
app.use((err, req, res, next) => {
    if (nodeEnv === 'development') {
        console.error(err.stack);
    } else {
        console.error(`[Error]: ${err.message}`);
    }

    const statusCode = err.status || err.statusCode || 500;
    const clientMessage = nodeEnv === 'development' ? err.response?.data?.error || err.message : 'Internal Server Error';

    res.status(statusCode).render('index', { data: null, error: `${statusCode} — ${clientMessage}` });
});

// SERVER
app.listen(port, () => {
    console.log(`Server online on port ${port} (${nodeEnv})`);
});