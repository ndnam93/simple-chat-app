const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMessage = {
  body: Joi.object().keys({
    message: Joi.string().required(),
  }),
};


module.exports = {
  createMessage,
};
