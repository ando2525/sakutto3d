import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const messageToUser = {
      to: req.body.email,
      from: "ando.pro.business@gmail.com",
      subject: "お問合せありがとうございました。",
      text:
        "お問合せを受け付けました。回答をお待ちください。" + req.body.message,
      html: `
        <p>${req.body.name}様</p>
        <p>お問合せを受け付けました。回答をお待ちください。</p><br/>

        <p>【問い合わせ内容】</p>
        <p>${req.body.message}</p>
      `,
    };
    const messageToManager = {
      to: "ando.pro.business@gmail.com",
      from: "ando.pro.business@gmail.com",
      subject: "ホームページより問い合わせがありました。",
      text:
        req.body.company +
        req.body.name +
        "様からお問合せがありました。" +
        "メッセージ：" +
        req.body.message +
        "アドレス：" +
        req.body.email,
      html: `
        <p>【会社名】</p>
        <p>${req.body.company}</p>
        <p>【名前】</p>
        <p>${req.body.name}</p>
        <p>【電話番号】</p>
        <p>${req.body.phoneNumber}</p>
        <p>【メールアドレス】</p>
        <p>${req.body.email}</p>
        <p>【メッセージ内容】</p>
        <p>${req.body.message}</p>
      `,
    };

    (async () => {
      try {
        await sgMail.send(messageToUser);
        await sgMail.send(messageToManager);
        res
          .status(200)
          .json({ status: "success", message: "メールが送信されました" });
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
        res
          .status(500)
          .json({ status: "error", message: "メールの送信に失敗しました" });
      }
    })();
  }

  res.status(200);
}
