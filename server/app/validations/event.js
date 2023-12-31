const Joi = require('joi');

const eventCreateSchema = Joi.object({
    user_id: Joi.string().uuid().required(),
    event_category_id: Joi.string().uuid().required(),
    event_name: Joi.string().max(255).required(),
    description: Joi.string().max(255).allow(null),
    service_category_ids: Joi.array().items(Joi.string().uuid()).required(),
});

module.exports = { eventCreateSchema };