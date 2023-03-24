import {Router} from 'express';
import multer from 'multer';

import { AuthUserController }   from './controller/user/AuthUserController';
import { CreateUserController } from './controller/user/CreateUserController';
import { DetailUserController } from './controller/user/DetailUserController';

import { CreateCategoryController } from './controller/category/CreateCategoryController';
import { ListCategoryController } from './controller/category/ListCategoryController';

import { CreateProductController } from './controller/product/CreateProductController';
import {ListByCategoryController} from './controller/product/ListByCategoryController'

import { CreateOrderController } from './controller/orders/CreateOrderController';
import { RemoveOrderController } from './controller/orders/RemoveOrderController';
import { AddItemController } from './controller/orders/AddItemController';
import { RemoveItemController } from './controller/orders/RemoveIItemController';
import { SendOrderController } from './controller/orders/SendOrderController';
import {ListOrdersController } from './controller/orders/ListOrderController'

import { DetailOrderController } from './controller/orders/DetailOrderController';
import { FinishOrderController } from './controller/orders/FinishOrderController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer'


const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

//--Rotas User---
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me',isAuthenticated, new DetailUserController().handle);

//--category----
router.post('/category',isAuthenticated, new CreateCategoryController().handle);
router.get('/category',isAuthenticated, new ListCategoryController().handle);

//-- Rotas product--
router.post('/product',isAuthenticated, upload.single('file'),new CreateProductController().handle);
router.get('/category/product',isAuthenticated, new ListByCategoryController().handle);

//--Rotas orders--
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/orders', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/orders/item', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders',isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle )

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle )

export { router }