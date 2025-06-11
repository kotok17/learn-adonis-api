// app/validators/product.ts
import vine from '@vinejs/vine'

export const productValidator = vine.object({
  name: vine.string().trim().maxLength(100),
  description: vine.string().trim().maxLength(500).optional(),
  price: vine.number().range([0.01, 10000]),
  stock: vine.number().range([0, 10000]),
})
