import { Request, Response } from 'express'
import { Product } from '../entities/Product'
import { productRepository } from '../repositories/productRepository'

export class ProductController {
  async create(req: Request, res: Response) {
    const { name, price, imgUrl } = req.body

    if (!name || !price || !imgUrl) {
      return res.status(400).json({ message: 'Insert a valid product' })
    }

    try {
      const newProduct = productRepository.create({ name, price, imgUrl })

      await productRepository.save(newProduct)

      return res.status(200).json({ newProduct })
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async list(req: Request, res: Response) {
    const allProducts = await productRepository.find()

    return res.json(allProducts)
  }

  async update(req: Request, res: Response) {
    const productID = req.params.id
    const { name, price, imgUrl } = req.body

    try {
      await productRepository
        .createQueryBuilder()
        .update({
          name,
          price,
          imgUrl
        })
        .where({
          id: productID
        })
        .execute()

      return res.status(200).json({ message: 'Product updated successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async delete(req: Request, res: Response) {
    const productID = req.params.id
    try {
      await productRepository
        .createQueryBuilder()
        .delete()
        .from(Product)
        .where({
          id: productID
        })
        .execute()

      return res
        .status(200)
        .json({ message: 'The product was successfully deleted.' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
