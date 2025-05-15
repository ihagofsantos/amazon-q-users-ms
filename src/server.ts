import express, { ErrorRequestHandler } from 'express';
import { AppDataSource } from './data-source';
import UserRoutes from './interface/http/routes/users.routes';
import AuthRoutes from './interface/http/routes/auth.routes';
import { errorHandlerMiddleware } from './interface/http/middlewares/error-handler.middleware';
const app = express();

app.use(express.json());

app.get('/healthy', (req, res) => { res.send('Hello from API!') });

app.use('/users', UserRoutes);

app.use('/auth', AuthRoutes);

app.use(errorHandlerMiddleware);

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })
