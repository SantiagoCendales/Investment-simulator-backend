
const nodemailer = require('nodemailer')

const sentVerificationEmail = async(email, verificationToken, investmentAmount = null) => {
  console.log('Trying to sent email...')
  try {
    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "21faa0320f3ab5",
        pass: "800ae7e41900ad"
      }
    });

    await transporter.sendMail({
      from: 'srcendales94@gmail.com',
      to: email,
      subject: 'Bienvenido a Lokl',
      html: `<h1>Hola bienvenido a Lokl</h1><p>Por favor verifica tu cuenta dando click en el botón</p><a href='http://localhost:5173/verification/${verificationToken}/${investmentAmount}'>Verifica tu cuenta</a>`
    })
    console.log("Email sent successfully")
  } catch (error) {
    console.log('Email not sent')
    console.log(error)
  }
}

module.exports = sentVerificationEmail