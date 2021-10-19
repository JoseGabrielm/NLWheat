/**
 * receber code (string)
 * recuperar o access_token no github
 * verificar se o usuário existe
 * se existir > gera um token
 * se não > cria no db, gera um access_token
 * retornar o token com as infos do usuário logado
 *
 */

class AuthenticateUserService {
  async execute(code: string) {}
}

export { AuthenticateUserService };
