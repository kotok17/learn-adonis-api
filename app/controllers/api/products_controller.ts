// app/controllers/products_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { productValidator } from '#validators/product'
import vine from '@vinejs/vine'

export default class ProductsController {
  /**
   * Mendapatkan semua produk
   */
  async index({ response }: HttpContext) {
    const products = await Product.all()
    return response.ok(products)
  }

  /**
   * Mendapatkan produk berdasarkan ID
   */
  async show({ params, response }: HttpContext) {
    const product = await Product.find(params.id)

    if (!product) {
      return response.notFound({ message: 'Product not found' })
    }

    return response.ok(product)
  }

  /**
   * Membuat produk baru
   */
  async store({ request, response }: HttpContext) {
    const validatedData = await vine.validate({
      schema: productValidator,
      data: request.all(),
    })

    const product = await Product.create(validatedData)
    return response.created(product)
  }

  /**
   * Memperbarui produk
   */
  async update({ params, request, response }: HttpContext) {
    const product = await Product.find(params.id)

    if (!product) {
      return response.notFound({ message: 'Product not found' })
    }

    const validatedData = await vine.validate({
      schema: productValidator,
      data: request.all(),
    })

    product.merge(validatedData)
    await product.save()

    return response.ok(product)
  }

  /**
   * Menghapus produk
   */
  async destroy({ params, response }: HttpContext) {
    const product = await Product.find(params.id)

    if (!product) {
      return response.notFound({ message: 'Product not found' })
    }

    await product.delete()
    return response.noContent()
  }

  /**
   * Menghitung total produk
   */
  async count({ response }: HttpContext) {
    const count = await Product.query().count('* as total')
    return response.ok({ total: Number(count[0].$extras.total) })
  }

  /**
   * Mendapatkan produk dengan stok rendah
   */
  async lowStock({ response }: HttpContext) {
    const lowStockProducts = await Product.query().where('stock', '<=', 5)
    return response.ok(lowStockProducts)
  }

  /**
   * Mendapatkan produk terlaris
   */
  async bestSellers({ response }: HttpContext) {
    const bestSellers = await Product.query()
      .orderBy('sales_count', 'desc')
      .limit(10)

    return response.ok(bestSellers)
  }
}
