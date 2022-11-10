import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움

viewsRouter.use('/', serveStatic('home'));
//users
viewsRouter.use('/users/signup', serveStatic('register'));
viewsRouter.use('/users/login', serveStatic('login'));
viewsRouter.use('/users/userlist/:userId', serveStatic('delivery'));
viewsRouter.use('/users/findemail', serveStatic('find-email'));
viewsRouter.use('/users/updateInfo', serveStatic('modifyAccount'));

//items
viewsRouter.use('/items/category/categorylist/:catId', serveStatic('category'));
viewsRouter.use('/items/itemlist/:itemId', serveStatic('product-detail'));

//order
viewsRouter.use('/cart', serveStatic('cart'));
viewsRouter.use('/orders', serveStatic('order'));

//admin
viewsRouter.use('/admin/login', serveStatic('login-admin'));
viewsRouter.use('/admin/categories', serveStatic('modifyCategory'));
viewsRouter.use('/admin', serveStatic('delivery-admin'));
viewsRouter.use('/admin/items', serveStatic('addItem'));

// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use('/', serveStatic(''));
viewsRouter.use(
  '/images',
  express.static(path.join(__dirname, '../views/images')),
);

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { viewsRouter };
