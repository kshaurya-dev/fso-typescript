interface ExerciseData{
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}
interface exerciseArgs {
    hours:number[],
    target : number
}
export const calculateExercises=(hours : Array<number> ,target : number):ExerciseData=>{
    let days : number = 0;
    let time : number =0;
    for(const num of hours){
        if(num !==0)days++;
        time+=num;
    }
    const average = time/hours.length;
    let rating : number =1;
    let desc : string ="comeon buddy , you can do it ,I know it";
    if(average >= target){
        rating=3;
        desc = "you making me feel lazy here , well done !";
    }
    else if(average >=target/2){
        rating=2;
        desc ="great choom ! let's be better next week !";
    }
    return {
        periodLength :hours.length,
        trainingDays:days,
        success: average>=target,
        rating: rating,
        ratingDescription: desc,
        target: target,
        average: average
    };
};
export const parseArgs = (args : string[]):exerciseArgs=>{
    if (args.length < 4) throw new Error('Not enough arguments');
    //if (args.length > 4) throw new Error('Too many arguments');
    const len : number = args.length;
    const hours: Array<number> = [];
    let i : number = 3;
    for(i ; i<len ; i++){
        if(!isNaN(Number(args[i]))){
            hours.push(Number(args[i]));
        }
        else {
            throw new Error('Provided values were not numbers!');
        }
    }
    let target : number;
    if(!isNaN(Number(args[2]))){
        target = Number(args[2]);
    }else{
        throw new Error('Provided values were not numbers!');
    }
    return {hours ,target };
};
if(process.argv[1] === import.meta.filename){
    try {
  const { hours, target } = parseArgs(process.argv);
  console.log(calculateExercises(hours , target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
}
