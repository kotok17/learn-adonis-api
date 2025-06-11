/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| This file is used for defining HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import ProductsController from '#controllers/api/products_controller'

// Halaman home
router.on('/').render('pages/home')

router.group(() => {
  router.get('/products', [ProductsController, 'index'])
  router.get('/products/:id', [ProductsController, 'show'])
  router.post('/products', [ProductsController, 'store'])
  router.put('/products/:id', [ProductsController, 'update'])
  router.delete('/products/:id', [ProductsController, 'destroy'])
}).prefix('/api')
