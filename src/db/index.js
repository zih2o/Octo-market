import mongoose from 'mongoose';
import { config } from '../../configuration/config';

const DB_URL =
  config.db.host ||
  'MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요. \n.env 파일도 필요합니다.\n';

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on('connected', () =>
  console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL),
);
db.on('error', error =>
  console.error('\nMongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error),
);

// virtualID 생성기
export function createVirtualId(schema) {
  schema.virtual('id').get(function () {
    return this._id.toString();
  });
  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtuals: true });
}

export * from './models/user-model';
export * from './models/category-model';
export * from './models/admin-model';
export * from './models/item-model';
export * from './models/order-model';
