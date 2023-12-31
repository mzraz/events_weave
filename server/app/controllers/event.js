const { createAndProcessEvent, getEventsByUserId, updateEvent, deleteEvent, getEventsByServiceProviderId } = require('../services/event');
const { handleResponse, InternalServerError, createResponse } = require('../helpers/response');
const { validateSchema } = require('../helpers/validate');
const { eventCreateSchema } = require('../validations/event');

exports.createEvent = async (req, res) => {
    const { user_id,event_category_id, event_name, description, image_paths, service_category_ids } = req.body;
  //  const { user_id } = req;
    const validation = validateSchema(eventCreateSchema, {
        user_id,
        event_category_id,
        event_name,
        description,
        service_category_ids,
    });
    if (validation.error) {
        return handleResponse(res, validation.error);
    }
    try {
        const serviceCategoryIds = Array.isArray(service_category_ids) ? service_category_ids : [service_category_ids];

        const newEvent = await createAndProcessEvent(user_id, event_category_id, event_name, description, image_paths, serviceCategoryIds);

        const responseObj = {
            data: newEvent,
            message: "Event created successfully",
        };

        return createResponse(res, responseObj);
    } catch (error) {
        console.error(error);
        return InternalServerError(res, 'Error creating event');
    }
};


exports.getEventsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const eventsData = await getEventsByUserId(userId);

        const responseObj = {
            data: eventsData,
            message: 'Events fetched successfully',
        };

        return createResponse(res, responseObj);
    } catch (error) {
        console.error(error);
        return InternalServerError(res, 'Error fetching events by user_id');
    }
};

exports.updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const eventUpdateData = req.body;

    try {
        const updatedEvent = await updateEvent(eventId, eventUpdateData);

        const responseObj = {
            data: updatedEvent,
            message: 'Event updated successfully',
        };

        return createResponse(res, responseObj);
    } catch (error) {
        console.error(error);
        return InternalServerError(res, 'Error updating event');
    }
};

exports.deleteEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        await deleteEvent(eventId);

        const responseObj = {
            message: 'Event and associated entries deleted successfully',
        };

        return createResponse(res, responseObj);
    } catch (error) {
        console.error(error);
        return InternalServerError(res, 'Error deleting event');
    }
};