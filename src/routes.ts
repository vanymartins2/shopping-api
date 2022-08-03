import { Router } from 'express'
import { MessageController } from './controllers/MessageController'
import { ProductController } from './controllers/ProductController'

const routes = Router()

routes.post('/message', new MessageController().create)
routes.get('/message', new MessageController().list)

routes.post('/product', new ProductController().create)
routes.get('/product', new ProductController().list)
routes.put('/product/:id', new ProductController().update)
routes.delete('/product/:id', new ProductController().delete)
export default routes
