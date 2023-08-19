import { Product } from './../typeorm/entities/Product'
import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
	id: string
}

export class DeleteProductService {
	public async execute({ id }: IRequest): Promise<void> {
		const productsRepository = getCustomRepository(ProductRepository)
		const product = await productsRepository.findOne(id)

		if (!product) {
			throw new AppError('Produto não encontrado.')
		}

		await productsRepository.remove(product)
	}
}
