import {NextApiResponse, NextApiRequest, NextApiHandler} from 'next';
import {RespostaPadraoMsg} from '../types/respostaPadraoMsg';
import jwt, { JwtPayload } from 'jsonwebtoken';


export const validarTokenJWT =  (handler : NextApiHandler) => (res: NextApiResponse<RespostaPadraoMsg>, req: NextApiRequest) => {

    const {MINHA_CHAVE_JWT} = process.env;
    if(!MINHA_CHAVE_JWT){
        return res.status(500).json({erro : 'Env de chave JWT não informado na execulção!'})
    }

    if(!req || !req.headers)  {
        return res.status(401).json({erro : 'Não foi possivel validar o token de Acesso!'})
    }

    if(req.method !== 'OPTIONS') {
        const authorization = req.headers['authorization'];
        if (!authorization){
            return res.status(500).json({erro : 'Não foi possivel Validar o token de Acesso!'})
        }

        const token = authorization.substring(7);
        if(!token){
            return res.status(500).json({erro : 'Não foi possivel Validar o token de Acesso!'})
        }

        const decoded = jwt.verify(token, MINHA_CHAVE_JWT) as JwtPayload;
        if(!decoded) {
            return res.status(500).json({erro : 'Não foi possivel Validar o token de Acesso!'})
        }

        if(!req.query){
            req.query = {};
        }

        req.query.userId = decoded._id;
    }

    return handler (req, res);
}