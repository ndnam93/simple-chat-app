
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { chatService } = require('../services');

const userInChat = () => async (req, res, next) => {
  const { user } = req;
  const { chatId } = req.params;
  const chat = await chatService.getChatById(chatId);
  if (!chat) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'Chat not found'));
  }
  if (!chat.participants.includes(user._id)) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'You cannot access this chat'));
  }

  return next();
};

module.exports = userInChat;