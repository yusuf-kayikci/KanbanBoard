import { ITask } from "../components/TaskBox";


const baseUrl =  "http://localhost:8080/api/v1/tasks" 


export const Get = () => {
    return new Promise<Array<ITask>>((resolve , reject) => {
            fetch(baseUrl , {
                method: "GET",
            }).then((response : any) =>{
                if(response.status == 200){
                    resolve(response.json());
                }
                else{
                    reject("error")
                }
            }).catch((err :string) => {
                reject(err);
            })
        });
}

export const Put = (id : number , data : any) => {

    return new Promise<Array<ITask>>((resolve , reject) => {
        fetch(baseUrl + "/" +  id , {
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",            
            body : JSON.stringify(data)
        }).then((response : any) =>{
            if(response.status == 200){
                resolve(response.json());
            }
            else{
                reject("error")
            }
        }).catch((err :string) => {
            reject(err);
        })
    });

}

export const Post = (data : any) => {
    console.log(JSON.stringify(data))
    return new Promise<ITask>((resolve , reject) => {
        fetch(baseUrl, {
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body : JSON.stringify(data)
        }).then((response : any) =>{
            if(response.status == 200){
                resolve(response.clone().json());
            }
            else{
                reject("error")
            }
        }).catch((err :string) => {
            reject(err);
        })
    });
}