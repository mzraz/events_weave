const db = require("../models");
const { services, service_category,event_services,events, users, roles  } = db;
const { Op } = require("sequelize");

const checkRole = async (userId) => {
  const user = await users.findByPk(userId,
      { include: [{ 
             model: roles,
              as: 'role'
         }]
      });
      if (!user) {
          throw new Error('User not found');
        }
      return user.role.title;
}
const createService = async ({
  userId,
  serviceCategoryId,
  description,
  imagePaths,
}) => {
  const service = await services.create({
    user_id: userId,
    service_category_id: serviceCategoryId,
    description,
    image_paths: imagePaths,
  });
  return service;
};

const getServicesByUserId = async (userId) => {
  const userServices = await services.findAll({
    where: {
      user_id: userId,
    },
    include: [
      {
        model: service_category,
        as: "service_category",
        attributes: ["title"],
      },
    ],
  });
  return userServices;
};

const updateServices = async (service_id, serviceUpdateData) => {
  try {
    const [updatedRowCount, updatedServices] = await services.update(
      {
        description: serviceUpdateData.description,
        image_paths: serviceUpdateData.imagePaths,
      },
      {
        where: {
          service_id: service_id,
        },
        returning: true,
      }
    );

    if (updatedRowCount === 0) {
      throw new Error(`No services found for the user with ID ${userId}.`);
    }

    return updatedServices[0];
  } catch (error) {
    throw error;
  }
};

const deleteServicesByIds = async (serviceIds) => {
  try {
    const deletedCount = await services.destroy({
      where: {
        service_id: {
          [Op.in]: serviceIds,
        },
      },
    });

    return deletedCount;
  } catch (error) {
    console.error("Error in deleteServicesByIds:", error);
    throw error;
  }
};

const getEventsByServiceProviderId = async (userId) => {
  try {
    const userServices = await services.findAll({
      where: { user_id: userId },
      attributes: ['service_category_id'],
      raw: true,
    });

    const serviceCategoryIds = userServices.map(service => service.service_category_id);

    const eventData = await event_services.findAll({
      where: { service_category_id: serviceCategoryIds },
      include: [{ 
          model: events,
           as: 'event'
           },
        {
           model: service_category,
            as: 'service_category'
        }],
    });

    return eventData;
  } catch (error) {
    console.error('Error retrieving events:', error.message);
    throw error;
  }
};

module.exports = {
  createService,
  getServicesByUserId,
  updateServices,
  deleteServicesByIds,
  getEventsByServiceProviderId,
  checkRole
};
