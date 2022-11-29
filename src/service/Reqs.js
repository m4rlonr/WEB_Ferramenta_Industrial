import { HTTP, AUT } from "../service/axios";

async function PutData(value) {
  try {
    const data = await HTTP.put(value.url, value.data, AUT);
    return {
      status: data.status,
      data: data.data,
      message: "Dados atualizados com sucesso!",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: null,
      message: "[ERRO NA REQUISIÇÃO] - Dados não foram atualizados.",
    };
  }
}

async function CreateData(value) {
  try {
    const data = await HTTP.post(value.url, value.data, AUT);
    console.log(data.data);
    return {
      status: data.status,
      data: data.data,
      message: "Dados criados com sucesso!",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: null,
      message: "[ERRO NA REQUISIÇÃO] - Dados não foram criados.",
    };
  }
}

async function Login(value) {
  try {
    const data = await HTTP.post(value.url, value.data);
    localStorage.token = data.data.access;
    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
    };
  }
}

export { PutData, CreateData, Login };
