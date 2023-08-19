import { getCustomRepository } from 'typeorm'
import { User } from '../typeorm/entities/User'
import { UsersRepository } from '../repositories/UserRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
	name: string
	email: string
	password: string
}

export class CreateUserService {
	public async execute({ name, email, password }: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository)
		const emailExists = await usersRepository.findByEmail(email)

		if (email) {
			throw new AppError('Este e-mail já está em uso.')
		}

		const user = usersRepository.create({
			name,
			email,
			password,
		})

		await usersRepository.save(user)

		return user
	}
}
