const dal = require('../dal/service');

const createAndProcessService = async (userId, serviceCategoryId, description, imagePaths) => {
  try {
    const role = await dal.checkRole(userId);
    if (!role || role !== 'Service Provider') {
      throw new Error('User is not a Service Provider');
    }
    const newService = await dal.createService({
      userId,
      serviceCategoryId,
      description,
      imagePaths,
    });

    // Perform additional processing if needed

    return newService;
  } catch (error) {
    console.error("Error creating and processing service:", error);
    throw error; 
  }
};
  
const getServicesByUser = async (userId) => {
  try {
    const role = await dal.checkRole(userId);
    if (!role || role !== 'Service Provider') {
      throw new Error('User is not a Service Provider');
    }
    // Assuming you want to retrieve all services without any specific criteria
    const allUserServices = await  dal.getServicesByUserId(userId);

    // Additional processing if needed

    return allUserServices;
  } catch (error) {
    console.error("Error getting services by user:", error);
    throw error;
  }
};

const updateServicesByUser = async (serviceId, serviceUpdateData) => {
  try {
    const updatedService = await  dal.updateServices(
      serviceId, serviceUpdateData
    );

    // Additional processing if needed

    return updatedService;
  } catch (error) {
    console.error("Error updating services by user:", error);
    throw error;
  }
};

const deleteServices = async (serviceIds) => {
  try {
  
    const deleteServices = await  dal.deleteServicesByIds(serviceIds);
    return deleteServices;
  } catch (error) {
    console.error("Error deleting services by user:", error);
    throw error;
  }
};

const getEventsByServiceProviderId = async (userId) => {
  try {
    const role = await dal.checkRole(userId);
    if (!role || role !== 'Service Provider') {
      throw new Error('User is not a Service Provider');
    }
      const eventsData = await dal.getEventsByServiceProviderId(userId);
      return eventsData;
  } catch (error) {
      console.error('Error in getting events:', error);
      throw error;
  }
};
module.exports = {
  createAndProcessService,
  getServicesByUser,
  updateServicesByUser,
  deleteServices,
  getEventsByServiceProviderId
};
