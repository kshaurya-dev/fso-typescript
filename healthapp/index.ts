import express from 'express';
import { calculateBmi } from './bmiCalculator.js';
import { calculateExercises } from './exerciseCalculator.js';
const app = express();
app.use(express.json());
app.get('/hello' , (_req, res) =>{
    res.send('Hello Full Stack!');
});

app.get('/bmi' , ( req , res)=>{
    const {height , weight} = req.query;
    if(height ===  undefined || weight===undefined){
        return res.status(400).json({
        error: "malformatted parameters"});
    }
    const h : number = Number(req.query.height);
    const w : number = Number(req.query.weight);
    if(!isNaN(h) && !isNaN(w) && h && w){
        return res.json({
            height:h,
            weight: w,
            bmi : calculateBmi(h , w)
        });
    }
    else return res.status(400).send({error : 'malformatted parameters'});
});

app.post('/exercises' , (req , res)=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target}  = req.body;
    if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({
        error: "parameters missing"
    });
}
    const arr = daily_exercises as number[];
    const t =target as number;
    for(let i : number =0 ; i<arr.length ; i++){
        if(isNaN(arr[i]))return res.status(400).send({ error: `malformatted parameters`});
    };
    if(isNaN(t))return res.status(400).send({ error: 'malformatted parameters'});
    return res.json(calculateExercises(arr , t));
});

const PORT = 3000;
app.listen(PORT , ()=>{
    console.log('app running on part ', PORT);
});
