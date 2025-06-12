import { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'

export default class AuthJwt {
  async handle({ request, response }: HttpContext, next: () => Promise<void>) {
    const authHeader = request.header('Authorization')
    if (!authHeader) return response.unauthorized({ message: 'Missing token' })

    const token = authHeader.replace('Bearer ', '')
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!)
      request['user'] = payload // kamu bisa akses di controller pakai `request.user`
      await next()
    } catch (error) {
      return response.unauthorized({ message: 'Invalid token' })
    }
  }
}
