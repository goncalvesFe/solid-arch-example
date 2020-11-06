import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email)

        if (userAlreadyExists) {
            throw new Error('User already exists')
        }

        const user = new User(data)

        await this.userRepository.save(user)

        this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'equipe do meu App',
                email: 'equipe@meuApp.com'
            },
            subject: 'Seja bem Vindo a plataforma',
            body: '<p>Você já pode fazer login em nossa plataforma</p>'
        })
    }
}
