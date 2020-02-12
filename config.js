module.exports = {
  ENV: process.env.NODE_ENV || 'developement' ,
  PORT : process.env.PORT || 3000 ,
  URL : process.env.BASE_URL || 'http://localhost:3000' ,
  MONGODB_URI : process.env.MONGODB_URI || 'mongodb+srv://hichemsmairia:hichemsmairia@cluster0-k4dbx.mongodb.net/test?retryWrites=true&w=majority' ,
  JWT_SECRET:process.env.JWT_SECRET || 'secret1'
}
