import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import mongoose from 'mongoose';
import {RespostaPadraoMsg} from '../types/respostaPadraoMsg';

export const conectMongoDB =  (handler : NextApiHandler) => 
    async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {

    //Verificar se o banco está conectado, se estiver seguir para  o endpoint ou prox. middieware
    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }

    //Se não esta conectado, vamos conectar, vamos obter a várialvel de ambiente preenchida do env
    const {DB_CONEXAO_STRING} = process.env;

    //Se a env estiver vazia aborda o uso do  sistem e avisa o programador
    if(!DB_CONEXAO_STRING){
        return res.status(500).json({erro: 'ENV de configuração do  Banco, não  informada'});
    }

    mongoose.connection.on('connected',() => console.log('Banco Conectado'));
    mongoose.connection.on('erro', error => console.log(`Ocorreu erro ao  conectar no Banco: ${error}`));
    await mongoose.connect(DB_CONEXAO_STRING);

    //Agora posso seguir para o endpoint, pois estou conectado no banco
    return handler(req,  res);
}