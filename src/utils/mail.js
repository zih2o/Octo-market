import * as nodemailer from 'nodemailer';
import { config } from '../../configuration/config';
import { template } from './mail-template';

// smtpPool는 smtp서버를 사용하기 위한 모듈로
// transporter객체를 만드는 nodemailer의 createTransport메소드의 인자로 사용된다.

export async function sendMail(userMail) {
  try {
    //#1. Transporter 객체 생성
    let transporter = nodemailer.createTransport({
      host: 'smtp.naver.com',
      port: 587,
      service: 'naver',
      auth: {
        user: config.mail.mailAddress,
        pass: config.mail.mailPassword,
      },
    });

    //#3. 메일 전송, 결과는 info 변수에 담아 집니다.
    let info = await transporter.sendMail({
      from: `"OctoMarket" <${mailAddress}>`,
      to: userMail,
      subject: '결제가 완료되었습니다',
      html: template,
    });

    //#4. 전송 후 결과 단순 출력
    for (let key in info) {
      console.log('키 : ' + key + ', 값 : ' + info[key]);
    }
  } catch (error) {
    console.log(error);
  }
}
