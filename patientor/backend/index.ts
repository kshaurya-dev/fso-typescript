import express from 'express';
import cors from 'cors';
import diagnosesRouter from './src/routes/diagnoses.js';
import patientRouter from './src/routes/patients.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong').status(400);
});

app.use('/api/diagnoses' , diagnosesRouter);
app.use('/api/patients' ,patientRouter );

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});