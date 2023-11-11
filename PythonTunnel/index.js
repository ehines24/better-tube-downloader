import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes/routes.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});