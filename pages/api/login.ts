import type {NextApiRequest, NextApiResponse} from 'next';
import {conectMongoDB} from '../../middleware/conectMongoDB';
import  {RespostaPadraoMsg} from '../../types/respostaPadraoMsg'

const endpointLogin = (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg>
) => {
    if(req.method === 'POST'){
        const {login, senha} = req.body;
        if(login === 'admin@admin123' && senha === 'pass123@pass') {
            return res. status(200).json({msg: 'Usuario autênticado com sucesso'})
        }
        return res.status(401).json({erro: 'Senha  ou usuario inválido!'})
    }
    return res.status(405).json({erro: 'Metodo informado não é válido'})
}

export default conectMongoDB(endpointLogin);