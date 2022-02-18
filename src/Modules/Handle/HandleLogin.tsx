import axios from "axios"

export const HandleLogin = (object:any)=>{
    
    return axios.post('http://api.training.div3.pgtest.co/api/v1/auth/login',object);

}