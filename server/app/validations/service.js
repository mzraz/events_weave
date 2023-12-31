const Joi = require("joi");

const serviceCreateSchema = Joi.object({
    user_id: Joi.string().uuid().required(),
    service_category_id: Joi.string().uuid().required(),
    description: Joi.string().max(255).allow(null),
    image_paths: Joi.alternatives(
        Joi.array().items(Joi.string()),
        Joi.string().allow(null)
      ).allow(null),
  });


module.exports = {
    serviceCreateSchema,
  };