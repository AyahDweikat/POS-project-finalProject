

interface SignUpObj {
    userName: string;
    email: string;
    password: string;
    cPassword: string;
}
interface LoginObj {
    email: string;
    password: string;
}
export const fetchApi =async (method:string,obj:(SignUpObj | LoginObj), url:string)=>{
    const requestOptions = {
        method,
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(obj),
      };
    return fetch(
        url,
        requestOptions
    ).then((response) => response.json())
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
}





