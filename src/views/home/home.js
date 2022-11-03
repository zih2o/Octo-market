// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '../api.js';
// import { randomId } from '/useful-functions.js';

// import { getCategories } from '../../controller/category-controller.js';

try {
  // 응답으로 가져올 더미 데이터 예시
  const datas = {
    items: [
      {
        name: '소세지',
        brand: 'kakao',
        price: '20000',
        description: '고급 소세지',
        category: 0,
      },
      {
        name: '고등어',
        brand: 'kakao',
        price: '10000',
        description: '노르웨이 순살 고등어',
        category: 1,
      },
      {
        name: '열라면',
        brand: 'kakao',
        price: '4000',
        description: '얼큰한 열라면',
        category: 2,
      },
      {
        name: '참치',
        brand: 'kakao',
        price: '30000',
        description: '최고급 횟감 참치',
        category: 1,
      },
    ],
    message: 'success',
  };
} catch {
  console.error(err.stack);
  alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
}

async function addProductData() {
  const datas = await Api.get('http://localhost:5000/items');
  console.log(datas);
}
addProductData();

console.log(Api);
// console.log(getCategories());
// async function getDataFromApi() {
//   // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
//   const data = await Api.get('/api/user/data');
//   const random = randomId();

//   console.log({ data });
//   console.log({ random });
// }
