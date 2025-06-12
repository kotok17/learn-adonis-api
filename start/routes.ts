import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js' // ✅ Benar! Import dari kernel.ts
import AuthController from '#controllers/auth_controller'
import ProductsController from '#controllers/api/products_controller'

/**
 * Public Auth Routes
 */
router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router.get('/me', [AuthController, 'me'])

/**
 * Page Routes
 */
router.on('/').render('pages/home')
router.on('/products').render('product/index')

/**
 * API Routes - Protected by JWT auth
 */
router.group(() => {
  router.get('/products', [ProductsController, 'index'])
  router.get('/products/:id', [ProductsController, 'show'])
  router.post('/products', [ProductsController, 'store'])
  router.put('/products/:id', [ProductsController, 'update'])
  router.delete('/products/:id', [ProductsController, 'destroy'])
})
  .prefix('/api')
  .middleware([middleware.auth()]) 
