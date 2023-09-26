import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from "../../types/respostaPadraoMsg";
import type { cadastroRequisicao } from "../../types/cadastroRequisicao";
import { UsuarioModel } from "../../models/UsuarioModel";
import { conectMongoDB } from "@/middleware/conectMongoDB";
import md5 from 'md5';

const endpointCadastro = async (
  req: NextApiRequest,
  res: NextApiResponse<RespostaPadraoMsg>
) => {
  if (req.method == "POST") {
    const usuario = req.body as cadastroRequisicao;

    if (!usuario.nome || usuario.nome.length < 2) {
      return res.status(400).json({ erro: "Nome invalido" });
    }

    if (
      !usuario.email ||
      usuario.email.length < 5 ||
      !usuario.email.includes("@") ||
      !usuario.email.includes(".")
    ) {
      return res.status(400).json({ erro: "Email invalido" });
    }

    if (!usuario.senha || usuario.senha.length < 4) {
      return res.status(400).json({ erro: "Senha Invalida" });
    }
    //Validação de usuario em duplicidade

    const usuariosComMesmoEmail = await UsuarioModel.find({email: usuario.email});
    if(usuariosComMesmoEmail && usuariosComMesmoEmail.length > 0){
      return res.status(400).json({ erro: "Esse Email já foi cadastrado!" });
    }

    const usuariosComMesmoNome = await UsuarioModel.find({nome: usuario.nome});
    if(usuariosComMesmoNome && usuariosComMesmoNome.length > 0){
      return res.status(400).json({ erro: "Algum usuario já utilizou esse nome!" });
    }

    //Salvar Bando de Dados
    const usuarioASerSalvo = {
      nome: usuario.nome,
      email: usuario.email,
      senha: md5(usuario.senha)
    }
    await UsuarioModel.create(usuarioASerSalvo);

    return res.status(200).json({ msg: "Conta criada com sucesso!" });
  }
  return res.status(405).json({ erro: "Metodo informado  não é valido" });
};

export default conectMongoDB(endpointCadastro);
