const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const { Chat, Message } = require('../models');
const eventEmitter = require('../utils/event');

/**
 * Get chat by id
 * @param {ObjectId} id
 * @returns {Promise<Chat>}
 */
const getChatById = async (id) => {
  return Chat.findById(id);
};

/**
 * Get chat by participant ids
 * @param {ObjectId[]} participants
 * @returns {Promise<Chat>}
 */
const getChatByParticipants = async (participants) => {
  let chat = await Chat.findOne(
    { participants: { $all: participants } }, 
    // { new: true, upsert: true }
  );
  if (!chat) {
    chat = await Chat.create({ participants })
  }
  return chat
};

/**
 * Get chat messages id
 * @param {ObjectId} chatId
 * @returns {Promise<Chat>}
 */
const getMessages = async (chatId) => {
  return Message.find({ chatId }).sort('createdAt');
};

/**
 * Create a message
 * @param {Object} body
 * @returns {Promise<User>}
 */
const createMessage = async (body) => {
  const message = await Message.create(body);
  eventEmitter.emit('NewMessage',  message);

  return message;
};

module.exports = {
  getChatById,
  getChatByParticipants,
  getMessages,
  createMessage,
}

