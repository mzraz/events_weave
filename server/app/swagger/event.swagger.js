/**
 * @swagger
 * tags:
 *   name: Event
 *   description: APIs for managing events
 */

/**
 * @swagger
 * /api/event/create:
 *   post:
 *     summary: Create a new event
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventRequest'
 *     responses:
 *       200:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'

 * /api/event/get/{userId}:
 *   get:
 *     summary: Get events by user ID
 *     tags: [Event]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventResponse'

 * /api/event/update/{eventId}:
 *   put:
 *     summary: Update event details by ID
 *     tags: [Event]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEventRequest'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'

 * /api/event/delete/{eventId}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Event]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateEventRequest:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: ID of the user creating the event
 *         event_category_id:
 *           type: string
 *           description: ID of the event category
 *         event_name:
 *           type: string
 *           description: Name of the event
 *         description:
 *           type: string
 *           description: Event description
 *         image_paths:
 *           type: array
 *           items:
 *             type: string
 *           description: Paths of event images
 *         service_category_ids:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs of service categories associated with the event
 *     UpdateEventRequest:
 *       type: object
 *       properties:
 *         event_category_id:
 *           type: string
 *           description: ID of the event category
 *         event_name:
 *           type: string
 *           description: Name of the event
 *         description:
 *           type: string
 *           description: Event description
 *         image_paths:
 *           type: array
 *           items:
 *             type: string
 *           description: Paths of event images
 *         service_category_ids:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs of service categories associated with the event
 *     EventResponse:
 *       type: object
 *       properties:
 *         event_id:
 *           type: string
 *           description: ID of the event
 *         user_id:
 *           type: string
 *           description: ID of the user creating the event
 *         event_category_id:
 *           type: string
 *           description: ID of the event category
 *         event_name:
 *           type: string
 *           description: Name of the event
 *         description:
 *           type: string
 *           description: Event description
 *         image_paths:
 *           type: array
 *           items:
 *             type: string
 *           description: Paths of event images
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last update
 *         event_services:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/EventServiceResponse'
 *         event_category:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: Title of the event category
 *     EventServiceResponse:
 *       type: object
 *       properties:
 *         event_services_id:
 *           type: string
 *           description: ID of the event service
 *         event_id:
 *           type: string
 *           description: ID of the event
 *         service_category_id:
 *           type: string
 *           description: ID of the service category
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last update
 */
