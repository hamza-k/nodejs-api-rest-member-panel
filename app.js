// Modules
require('babel-register')
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const morgan = require('morgan')('dev')
const twig = require('twig')

// Globale variables
const app = express()
const port = 8081
const fetch = axios.create({
    baseURL: 'http://localhost:8080/api/v1' // API REST URL for CRUDing member
  });

// Middlewares
app.use(morgan)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes

///// Home page
app.get('/', (req, res) => {
    res.redirect('/members')
})

///// Members page
app.get('/members', (req, res) => {
    apiCall('/members?max=' + req.query.max, 'get', {}, res, (members) => {
        res.render('members.twig', {
            membersList : members
        })
    })
})

///// Only member page
app.get('/members/:id', (req, res) => {
    apiCall('/members/'+req.params.id, 'get', {}, res, (result) => {
        res.render('member.twig', {
            member : result
        })
    })
})

///// Editing member page
app.get('/edit/:id', (req, res) => {
    apiCall('/members/'+req.params.id, 'get', {}, res, (result) => {
        res.render('edit.twig', {
            member: result
        })
    })
})

///// Editing member method
app.post('/edit/:id', (req, res) => {
    apiCall('/members/'+req.params.id, 'put', {
        name: req.body.m_name
    }, res, () => {
        res.redirect('/members/'+req.params.id)
    })
})

///// Deleting member method
app.get('/delete/:id', (req, res) => {
    apiCall('/members/'+req.params.id, 'delete', {}, res, () => {
        res.redirect('/')
    })
})

///// Adding member method
app.post('/members', (req, res) => {
    apiCall('/members', 'post', {
        name: req.body.m_name
    }, res, () => {
        res.redirect('/')
    })
})

// Lauching
app.listen(port, () => {
    console.log(`Started on port ${port}`)
})

// Functions
function renderError(res, errMsg) {
    res.render('error.twig', {
        errorMsg : errMsg
    }) 
}

function apiCall(url, method, data, res, next) {
    fetch({
        method: method,
        url : url,
        data : data
    })
    .then((response) => {
        if (response.data.status == 'Success') {
            next(response.data.result)
        } else {
            renderError(res, response.data.message)
        }
    })
    .catch( err => renderError(res, err.message) )
}