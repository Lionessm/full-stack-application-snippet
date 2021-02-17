'use strict';

const express = require('express');
const { Course } = require('./models');

// Construct a router instance.
const router = express.Router();

// setup a friendly greeting for the root route
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the REST API project!',
    });
});


// COURSES ROUTES
// setup a course GET route that returns all courses including the User that owns each course and a 200 HTTP status code
router.get('/api/courses', async (req, res) => {
    res.locals.courses = await Course.findAll();
    const courses = res.locals.courses;

    const processedCourses = [];

    for (const course of courses) {

        processedCourses.push({
            id: course.id,
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded
        });
    }

    res.json(processedCourses);

});


module.exports = router;