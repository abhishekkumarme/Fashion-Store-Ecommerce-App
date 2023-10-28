const bcrypt = require('bcrypt');

const hashPassword = async (password)=>{
   try{
    const saltRounds =10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    return hashedPassword

   } catch{
    console.log(error)
   }
};

const comparedPassword = (password,hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword);
};

module.exports = {hashPassword, comparedPassword};