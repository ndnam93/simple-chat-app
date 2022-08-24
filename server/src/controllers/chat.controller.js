const mongoose = require('mongoose');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { chatService } = require('../services');

const getChat = catchAsync(async (req, res) => {
  const { user } = req;
  let { ids } = req.query;
  ids = ids.map(mongoose.Types.ObjectId)
  const result = await chatService.getChatByParticipants([...ids, user._id]);
  res.send(result);
});

const getMessages = catchAsync(async (req, res) => {
  const { chatId } = req.params;
  const result = await chatService.getMessages(chatId);
  res.send(result);
});

const createMessage = catchAsync(async (req, res) => {
  const { user } = req;
  const { chatId } = req.params;
  await chatService.createMessage({
    chatId,
    sender: user._id,
    message: req.body.message,
  });
  res.status(httpStatus.CREATED).send();
});

module.exports = {
  getChat,
  getMessages,
  createMessage,
}
