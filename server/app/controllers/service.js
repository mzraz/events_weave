const {
    createAndProcessService,
    getServicesByUser,
    updateServicesByUser,
    deleteServices,
    getEventsByServiceProviderId
  } = require("../services/service");
    
const { handleResponse, InternalServerError, createResponse } = require("../helpers/response");
const { serviceCreateSchema } = require('../validations/service');

exports.createService = async (req, res) => {
    const { user_id,service_category_id, description, image_paths } = req.body;
  //  const { userId } = req;
    try {
        const { error: validationError } = serviceCreateSchema.validate(req.body);

        if (validationError) {
            return handleResponse(res, { success: false, error: validationError.message });
        }
      const newService = await createAndProcessService(user_id, service_category_id, description, image_paths);
      const responseObj = {
        data: newService,
        message: "Service created successfully",
      };
      return createResponse(res, responseObj);
    } catch (error) {
      console.error(error);
      return InternalServerError(res, 'Error creating service');
    }
  };

  exports.getServicesByUser = async (req, res) => {
    const { userId } = req.params;                    

    try {
      const userServices = await getServicesByUser(userId);
      const responseObj = {
        data: userServices,
        message: "Services retrieved successfully",
      };

      return createResponse(res, responseObj);

    } catch (error) {
      console.error(error);
      return InternalServerError(res, "Error retrieving services for the user");
    }
  };
  
  exports.updateServicesByUserId = async (req, res) => {
    const { serviceId } = req.params;

    const  serviceUpdateData  = req.body;
    try {
      const updateService = await updateServicesByUser(
        serviceId,serviceUpdateData
      );
  
      const responseObj = {
        data: updateService,
        message: "Services updated successfully",
      };
      return createResponse(res, responseObj);
    } catch (error) {
      console.error(error);
      return InternalServerError(res, "Error updating services for the user");
    }
  };
  
  exports.deleteServicesOfUser = async (req, res) => {
    const {serviceIds}  = req.body;
    try {
      const deleteService = await deleteServices(serviceIds);
  
      const responseObj = {
        data: deleteService,
        message: "Services deleted successfully",
      };
      return createResponse(res, responseObj);
    } catch (error) {
      console.error(error);
      return InternalServerError(res, "Error deleting services for the user");
    }
  };
  

  exports.getEventsByServiceProviderId = async (req, res) => {
    const { userId } = req.params;

    try {
        const eventsData = await getEventsByServiceProviderId(userId);

        const responseObj = {
            data: eventsData,
            message: 'Events fetched successfully',
        };

        return createResponse(res, responseObj);
    } catch (error) {
        console.error(error);
        return InternalServerError(res, 'Error fetching events by service providers id');
    }
};