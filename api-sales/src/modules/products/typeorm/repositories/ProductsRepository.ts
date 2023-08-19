import { Product } from './../entities/Product'
import { EntityRepository, ILike, Repository } from 'typeorm'

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
	public async findByName(name: string): Promise<Product | undefined> {
		const product = await this.findOne({ where: { name } })

		return product
	}
}
