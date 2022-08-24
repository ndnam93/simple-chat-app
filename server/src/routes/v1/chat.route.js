const express = require('express');
const auth = require('../../middlewares/auth');
const userInChat = require('../../middlewares/userInChat');
const chatController = require('../../controllers/chat.controller');
const validate = require('../../middlewares/validate');
const chatValidation = require('../../validations/chat.validation');

const router = express.Router();

router
  .route('/')
  .get(auth(), chatController.getChat);

router
  .route('/:chatId/messages')
  .get(auth(), userInChat(), chatController.getMessages)
  .post(auth(), userInChat(), validate(chatValidation.createMessage), chatController.createMessage);


module.exports = router;

