import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import mongoose from 'mongoose';

export const conectMongoDB = (handler : NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {

    //Verificar se o banco está conectado, se estiver seguir para  o endpoint ou prox. middieware
    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }

    //Se não esta conectado, vamos conectar, vamos obter a várialvel de ambiente preenchida do env
    const {DB_CONEXAO_STRING} = process.env;
}