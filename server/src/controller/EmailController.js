const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {

    const number = Math.floor(Math.random() * 99999);

    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        prot: 587, 
        host: 'smtp.gmlail.com', 
        secure: false, 
        requireTLS: true, 
        auth: {
            user: process.env.google_email, 
            pass: process.env.google_pw
        }
    });

    let info = await transporter.sendMail({   
        from: process.env.google_email,
        to: process.env.naver_email,
        subject: '[내일 뭐하지?] 이메일 인증번호',
        text: "인증번호 " + String(number)
      });
}