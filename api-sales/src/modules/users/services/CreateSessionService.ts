import { getCustomRepository } from 'typeorm'
import { User } from '../typeorm/entities/User'
import { UsersRepository } from '../repositories/UserRepository'
import AppError from '@shared/errors/AppError'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'

interface IRequest {
	email: string
	password: string
}

interface IResponse {
	user: User
	token: string
}

export class CreateSessionService {
	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const usersRepository = getCustomRepository(UsersRepository)
		const user = await usersRepository.findByEmail(email)

		if (!user) {
			throw new AppError('Usuário não encontrado.', 401)
		}

		const passwordConfirmed = await compare(password, user.password)

		if (!passwordConfirmed) {
			throw new AppError('Senha está incorreta.', 401)
		}

		const token = sign({ id: user.id }, authConfig.jwt.secret, {
			subject: user.id,
			expiresIn: authConfig.jwt.expiresIn,
		})

		return { user, token }
	}
}
