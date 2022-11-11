import 'dotenv/config';
import { config } from './configuration/config';
import { app } from './src/app';

const PORT = config.host.port;

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
