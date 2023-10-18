import type {NextApiResponse, NextApiRequest, NextApiHandler} from 'next';
import type {RespostaPadraoMsg} from '../types/respostaPadraoMsg';
import jwt, { JwtPayload } from 'jsonwebtoken';


export const validarTokenJWT = (handler : NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
    try {
        const {MINHA_CHAVE_JWT} = process.env;
    if(!MINHA_CHAVE_JWT){
        return res.status(500).json({erro : 'Env de chave JWT não informado na execução  do produto!'});
    }

    if(!req || !req.headers)  {
        return res.status(401).json({erro : 'Não foi possivel validar o token de Acesso!'});
    }

    if(req.method !== 'OPTIONS') {
        const authorization = req.headers['authorization'];
        if (!authorization){
            return res.status(401).json({erro : 'Não foi possivel Validar o token de Acesso!'});
        }

        const token = authorization.substring(7);
        if(!token){
            return res.status(401).json({erro : 'Não foi possivel Validar o token de Acesso!'});
        }

        const decoded = await jwt.verify(token, MINHA_CHAVE_JWT) as JwtPayload;
        if(!decoded) {
            return res.status(401).json({erro : 'Não foi possivel Validar o token de Acesso!'})
        }

        if(!req.query){
            req.query = {};
        }

        req.query.userId = decoded._id;
    }
   
    } catch (e) {
            console.log(e);
            return res.status(401).json({erro: 'Não foi possível validar o token de acesso'});
    }
    return handler (req, res);
}