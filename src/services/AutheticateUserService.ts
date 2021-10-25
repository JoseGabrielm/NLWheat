import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

/**
 *
 * receber code (string)
 * recuperar o access_token no github
 * verificar se o usuário existe
 * se existir > gera um token
 * se não > cria no db, gera um access_token
 * retornar o token com as infos do usuário logado
 *
 */

/**recebe apenas o access token */
interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  /** recebe apenas informações uteis da api https://api.github.com/user */
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";
    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      });

    //* recupera token via axios na api do github
    const response = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token} `,
        },
      }
    );

    //* verifica se o usuário ja esta no BD, se não, cria o usuário no BD

    const { login, id, avatar_url, name } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }

    //* gera o token
    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token, user };
  }
}

export { AuthenticateUserService };
