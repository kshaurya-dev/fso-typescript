import type { CoursePart } from "../types";
interface ContentProp{
    courseParts:CoursePart[]
};
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Content =({courseParts} : ContentProp)=>{
    return  courseParts.map((part) => {
    switch (part.kind) {
        case "basic":
            return (
                <p key={part.name}>
                    {part.name} {part.exerciseCount}
                    <br />
                    {part.description}
                </p>
            );

        case "group":
            return (
                <p key={part.name}>
                    {part.name} {part.exerciseCount}
                    <br />
                    Project exercises {part.groupProjectCount}
                </p>
            );

        case "background":
            return (
                <p key={part.name}>
                    {part.name} {part.exerciseCount}
                    <br />
                    submit to {part.backgroundMaterial}
                </p>
            );

        case "special":
            return (
                <p key={part.name}>
                    {part.name} {part.exerciseCount}
                    <br />
                    required skills {part.requirements.join(", ")}
                </p>
            );
        default:
            return assertNever(part);
    }
})};
export default Content;