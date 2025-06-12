import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { Hash } from '@adonisjs/core/hash'
import jwt from 'jsonwebtoken'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.only(['email', 'password'])

    const user = await User.create(data)
    return response.created(user)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    if (!user) {
      return response.unauthorized({ message: 'Invalid email or password' })
    }
    if (!user.password) {
      return response.unauthorized({ message: 'Password not set' })
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    )

    return response.ok({ token })
  }

  async me({ request, response }: HttpContext) {
    const authHeader = request.header('Authorization')
    if (!authHeader) return response.unauthorized({ message: 'Missing token' })

    const token = authHeader.replace('Bearer ', '')
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!)
      return response.ok(payload)
    } catch (error) {
      return response.unauthorized({ message: 'Invalid token' })
    }
  }
}
