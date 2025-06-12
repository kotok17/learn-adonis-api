import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  // Menampilkan view untuk daftar produk
  async index({ view }: HttpContext) {
    return view.render('products.index')
    
  }
  
}