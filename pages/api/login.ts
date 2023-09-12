import type {NextApiRequest, NextApiResponse} from 'next';

export default (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if(req.method === 'POST'){
        const {login, senha} = req.body;
        if(login === 'admin@admin123' && senha === 'pass123@pass') {
            res. status(200).json({msg: 'Usuario autênticado com sucesso'})
        }
        return res.status(401).json({erro: 'Senha  ou usuario inválido!'})
    }
    return res.status(405).json({erro: 'Metodo informado não é válido'})
}