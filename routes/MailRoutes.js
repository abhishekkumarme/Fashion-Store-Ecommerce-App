const express = require('express');
const { 
    mailPostController, 
    getMailController, 
    deleteMailController, 
    emailController
} = require('../Controllers/MailController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');


// route object
const router = express.Router();

// post mail
router.post('/post-mail', mailPostController);

// get mail
router.get('/get-mail', getMailController);

//delete mail
router.delete('/delete-mail/:mailId', requireSignIn, isAdmin, deleteMailController);

//send mail
router.post('/send-mail', requireSignIn, isAdmin, emailController)


module.exports = router;