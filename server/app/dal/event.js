const db = require('../models');
const { events, event_services, events_category, service_category, users, roles } = db

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

const createEvent = async ({ user_id, eventCategoryId, eventName, description, imagePaths, serviceCategoryIds }) => {
    const event = await events.create({
        user_id,
        event_category_id: eventCategoryId,
        event_name: eventName,
        description,
        image_paths: imagePaths,
    });

    const eventServicesPromises = serviceCategoryIds.map(serviceCategoryId =>
        event_services.create({ event_id: event.event_id, service_category_id: serviceCategoryId })
    );

    const eventServices = await Promise.all(eventServicesPromises);

    return { event, eventServices };
}

const getEventsByUserId = async (userId) => {
    try {
        const eventsData = await events.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: event_services,
                    as: "event_services",
                    attributes: ['service_category_id'],
                    include: [
                        {
                            model: service_category,
                            as: "service_category",
                            attributes: ['title'],
                        }
                    ]
                },
                {
                    model: events_category,
                    as: "event_category",
                    attributes: ['title'],
                },
            ],
        });

        console.log("eventdata", eventsData);

        const formattedEventsData = eventsData.map(event => ({
            event_name: event.event_name,
            description: event.description,
            image_paths: event.image_paths,
            event_category_title: event.event_category ? event.event_category.title : null,
            service_category_titles: event.event_services.map(service => service.service_category.title),
        }));

        return formattedEventsData;
    } catch (error) {
        console.error('Error fetching events by user_id:', error);
        throw error;
    }
};

const updateEvent = async (eventId, { eventCategoryId, eventName, description, imagePaths, serviceCategoryIds }) => {
    try {
        const event = await events.findByPk(eventId);

        if (!event) {
            throw new Error('Event not found.');
        }
        await event.update({
            event_category_id: eventCategoryId,
            event_name: eventName,
            description,
            image_paths: imagePaths,
        });
        const eventServicesPromises = serviceCategoryIds.map(async (serviceCategoryId) => {
            const [eventService] = await event_services.findOrCreate({
                where: {
                    event_id: eventId,
                    service_category_id: serviceCategoryId,
                },
            });

            return eventService;
        });

        const updatedEventServices = await Promise.all(eventServicesPromises);

        return { event, eventServices: updatedEventServices };
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
};

const deleteEvent = async (eventId) => {
    try {
        // Find the event by ID
        const event = await events.findByPk(eventId);

        if (!event) {
            throw new Error('Event not found.');
        }
        await event_services.destroy({
            where: { event_id: eventId },
        });

        // Delete the event
        await event.destroy();

        return { message: 'Event and associated entries deleted successfully' };
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
};

module.exports = {
  createEvent,
  getEventsByUserId,
  updateEvent,
  deleteEvent,
  checkRole
};
