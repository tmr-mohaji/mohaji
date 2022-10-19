const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {
    const user_email = req.body.email;
    console.log("user_email", user_email);

    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        prot: 587, 
        host: 'smtp.gmlail.com', 
        secure: false, 
        requireTLS: true, 
        auth: {
            user: '', 
            pass: ''
        }
    });

    let info = await transporter.sendMail({   
        from: '',
        to: '',
        subject: '안녕하세요',
        text: 'ㅁㄴㅇㄹ'
      });
}