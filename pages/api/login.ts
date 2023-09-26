import type {NextApiRequest, NextApiResponse} from 'next';
import {conectMongoDB} from '../../middleware/conectMongoDB';
import  {RespostaPadraoMsg} from '../../types/respostaPadraoMsg';
import md5 from 'md5';
import { UsuarioModel } from '@/models/UsuarioModel';

const endpointLogin = async (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg>
) => {
    if(req.method === 'POST'){

        const {login, senha} = req.body;

        const usuariosEncontrados = await UsuarioModel.find({email: login, senha: md5(senha)});
        if(usuariosEncontrados && usuariosEncontrados.length > 0) {
            const usuarioEncontrado = usuariosEncontrados[0];            
            return res. status(200).json({msg: `Usuario ${usuarioEncontrado.nome} autênticado com sucesso`})
        }
        return res.status(401).json({erro: 'Senha  ou usuario inválido!'})
    }
    return res.status(405).json({erro: 'Metodo informado não é válido'})
}

export default conectMongoDB(endpointLogin);