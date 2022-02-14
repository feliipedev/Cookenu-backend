import {connect} from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const mongoConnect = async () =>{
    try{
        console.log("conectando ao mongodb")
        await connect(process.env.DATABASE as string)
        console.log("mongodb conectado com sucesso!")
    }catch(error){
        console.log("Erro conexão", error)
    }
}