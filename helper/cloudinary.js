require ('dotenv').config();
const cloudinary = require ('cloudinary');

cloudinary.config({ 
    cloud_name: 'dg1bzhmv0', 
    api_key: '752363141429848', 
    api_secret: '3YdjWWCP8vYmbDebCknwDIg6Ois' 
  });

  module.exports = cloudinary;