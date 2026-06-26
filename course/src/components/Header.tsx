interface HeaderProp{
    courseName:string
};
const Header =({courseName} : HeaderProp)=>{
    return(<p>{courseName}</p>)
};
export default Header;