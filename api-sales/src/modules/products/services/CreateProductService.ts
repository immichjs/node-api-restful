import { Product } from './../typeorm/entities/Product'
import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
	name: string
	price: number
	quantity: number
}

export class CreateProductService {
	public async execute({ name, price, quantity }: IRequest): Promise<Product> {
		const productsRepository = getCustomRepository(ProductRepository)
		const productExists = await productsRepository.findByName(name)

		if (productExists) {
			throw new AppError('Existe um produto com este nome.')
		}

		const product = productsRepository.create({
			name,
			price,
			quantity,
		})

		await productsRepository.save(product)

		return product
	}
}
