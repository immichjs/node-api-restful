import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UserRepository'
import AppError from '@shared/errors/AppError'
import path from 'path'
import fs from 'fs'
import uploadConfig from '@config/upload'
import { User } from '../typeorm/entities/User'

interface IRequest {
	user_id: string
	avatarFilename: string | undefined
}

export class UpdateUserAvatarService {
	public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository)

		const user = await usersRepository.findById(user_id)

		if (!user) {
			throw new AppError('Usuário não encontrado')
		}

		if (!avatarFilename) {
			throw new AppError('Avatar não enviado.')
		}

		if (user.avatar) {
			const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath)
			}
		}

		user.avatar = avatarFilename
		await usersRepository.save(user)

		return user
	}
}
