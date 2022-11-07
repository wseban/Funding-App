const router = require('express').Router();
const { Project, User } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    const dbProjectData = await Project.findAll({});
    const projects = dbProjectData.map((project) => project.get({plain :true }))
    res.render('homepage', { projects, logged_in: req.session.logged_in });
})

router.get('/project/:id', async (req, res) => {
    const dbProjectData = await Project.findByPk(req.params.id);

    const project = dbProjectData.get({ plain:true })
    res.render('project', {project, logged_in: req.session.logged_in})
})

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login')
})
router.get('/profile',withAuth , async (req, res) => {
    let dbProjectsData = await Project.findAll({
        where: {
            user_id: req.session.user_id
        }
    })

    let projects = dbProjectsData.map((project) => (project.get({plain:true})))
    res.render('profile', { projects, logged_in: req.session.logged_in })
})


module.exports = router;