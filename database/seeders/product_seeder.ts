import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Product.createMany([
      {
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 100.00,
        stock: 50,
      },
      {
        name: 'Product 2',
        description: 'Description for Product 2',
        price: 200.00,
        stock: 30,
      },
      {
        name: 'Product 3',
        description: 'Description for Product 3',
        price: 150.00,
        stock: 20,
      },
    ])
  }
}