import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string
  @column()
  declare description: string
  @column()
  declare price: number
  @column()
  declare stock: number
  @column({ columnName: 'created_at' })
  declare createdAt: DateTime
  @column({ columnName: 'updated_at' })
  declare updatedAt: DateTime
}