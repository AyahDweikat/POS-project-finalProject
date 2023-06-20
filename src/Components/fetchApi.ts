

interface signUpObj {
    userName: string;
    email: string;
    password: string;
    cPassword: string;
}
interface loginObj {
    email: string;
    password: string;
}


export const fetchApi =async (method:string,obj:(signUpObj | loginObj), url:string)=>{
    const requestOptions = {
        method,
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(obj),
      };
    return fetch(
        url,
        requestOptions
    ).then((response) => response.json())
    // return results;
}




export const fetchApiWithAuthNoBody =async (method:string, url:string, token:string)=>{
    const requestOptions = {
        method,
        headers: { "Content-Type": "application/json", "authorization": token},
      };
    return fetch(
        url,
        requestOptions
    ).then((response) => response.json())
    // return results;
}


export const fetchApiWithAuthAndBody =async (method:string,obj={}, url:string, token:string)=>{
    const requestOptions = {
        method,
        headers: { "Content-Type": "application/json", "authorization": token},
        body: JSON.stringify(obj),
      };
    return fetch(
        url,
        requestOptions
    ).then((response) => response.json())
    // return results;
}
// export const fetchApiWithAuthDelete =async (method:string, url:string, token:string)=>{
//     const requestOptions = {
//         method,
//         headers: { "Content-Type": "application/json", "authorization": token},
//       };
//     return fetch(
//         url,
//         requestOptions
//     ).then((response) => response.json())
//     // return results;
// }
// const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(task),
//   };
//   fetch(
//     "https://todolist-backend-app-nodb.onrender.com/addTasks",
//     requestOptions
//   )
//     .then((response) => response.json())
//     .then((data) => data);
//   setAllTasks([...allTasks, task]);
