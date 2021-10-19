/**
 * receber code (string)
 * recuperar o access_token no github
 * verificar se o usuário existe
 * se existir > gera um token
 * se não > cria no db, gera um access_token
 * retornar o token com as infos do usuário logado
 *
 */

import axios from "axios";

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/acces_token";
    const response = await axios.post(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/jason",
      },
    });

    return response.data;
  }
}

export { AuthenticateUserService };
