import axios from "axios";

const HTTP = axios.create({
  //baseURL: "http://192.168.31.34:8000/",
  //baseURL: "http://192.168.88.99:8000/",
   baseURL: "http://127.0.0.1:8000/"
});

const AUT = {
  headers: {
    'Authorization': 'Bearer ' + localStorage.token
  }
}

export {HTTP ,AUT } ;
