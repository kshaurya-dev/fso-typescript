interface TotalProp{
    totalExercises:number
};
const Total =({totalExercises} : TotalProp)=>{
    return(<p>Number of Exercises : {totalExercises}</p>)
};
export default Total;