import { Product } from './../typeorm/entities/Product'
import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
	id: string
}

export class ShowProductService {
	public async execute({ id }: IRequest): Promise<Product> {
		const productsRepository = getCustomRepository(ProductRepository)

		const product = await productsRepository.findOne(id)

		if (!product) {
			throw new AppError('Produto não encontrado.')
		}

		return product
	}
}
