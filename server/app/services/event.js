const dal = require('../dal/event');

const createAndProcessEvent = async (user_id, eventCategoryId, eventName, description, imagePaths, serviceCategoryIds) => {
  try {
    const role = await dal.checkRole(user_id);
    if (!role || role !== 'Event Creator') {
      throw new Error('User is not a Event Creator');
    }
      const newEvent = await dal.createEvent({
          user_id,
          eventCategoryId,
          eventName,
          description,
          imagePaths,
          serviceCategoryIds,
      });

      return newEvent;
  } catch (error) {
      console.error("Error creating and processing event:", error);
      throw error;
  }
};

const getEventsByUserId = async (userId) => {
  try {
    const role = await dal.checkRole(userId);
    if (!role || role !== 'Event Creator') {
      throw new Error('User is not a Event Creator');
    }
      const eventsData = await dal.getEventsByUserId(userId);
      return eventsData;
  } catch (error) {
      console.error('Error in eventsService.getEventsByUserId:', error);
      throw error;
  }
};

const updateEvent = async (eventId, eventUpdateData) => {
  try {
      const updatedEvent = await dal.updateEvent(eventId, eventUpdateData);
      return updatedEvent;
  } catch (error) {
      console.error('Error updating event:', error);
      throw error;
  }
};

const deleteEvent = async (eventId) => {
  try {
      await dal.deleteEvent(eventId);
      return { message: 'Event deleted successfully' };
  } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
  }
};




module.exports = {
  createAndProcessEvent,
  getEventsByUserId,
  updateEvent,
  deleteEvent,
};
