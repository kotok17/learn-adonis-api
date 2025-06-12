/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| This file is used for defining HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import ProductsController from '#controllers/api/products_controller'

/**
 * Public Auth Routes (No JWT required)
 */
router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

/**
 * Page Routes (Render Edge views)
 */
router.on('/').render('pages/home')
router.on('/products').render('product/index')

/**
 * API Routes - Grouped under /api
 */
router.group(() => {
  router.get('/products', [ProductsController, 'index'])
  router.get('/products/:id', [ProductsController, 'show'])
  router.post('/products', [ProductsController, 'store'])
  router.put('/products/:id', [ProductsController, 'update'])
  router.delete('/products/:id', [ProductsController, 'destroy'])
})
  .prefix('/api')
  .middleware(['auth']) // ✅ Perbaikan di sini
