const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const messageSchema = mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
messageSchema.plugin(toJSON);

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
