const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const chatSchema = mongoose.Schema(
  {
    participants: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
chatSchema.plugin(toJSON);

/**
 * @typedef Chat
 */
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
