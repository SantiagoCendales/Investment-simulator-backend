const mongoose = require('mongoose')

const dbConnection = async() => {
  try {
    
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB Online')

  } catch (error) {
    console.log(error)
    throw new Error('No se pudo inicializar la db')
  }
}

module.exports = {
  dbConnection
}