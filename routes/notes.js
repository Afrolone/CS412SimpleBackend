const express = require('express')
const router = express.Router()
const Note = require('../models/note')

// All notes route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const notes = await Note.find(searchOptions)
        res.render('notes/index', {
            notes: notes,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New note route
router.get('/new', async (req, res) => {
    res.render('notes/new', { note: new Note() })
})

// Create Note Route
router.post('/', async (req, res) => {
    console.log("REQQ")
    console.log(req)
    console.log("REQQ BODDYY")
    console.log(req.body)

    const note = new Note({
        name: req.body.name,
        text: req.body.text
    })
    try {
        const newNote = await note.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`notes/${newNote.id}`)
    } catch {
        res.render('notes/new', {
            note: note,
            errorMessage: 'Error creating Note'
        })
    }
})

// One note route
router.get('/:id', async (req, res) => { 
    try {
      const note = await Note.findById(req.params.id)
      res.render('notes/show', {
        note: note
      })
    } catch (err) {
      console.log(err)
      res.redirect('/')
    }
}) 

// Edit note route
router.get('/:id/edit', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        res.render('notes/edit', { note: note })
    } catch {
        res.redirect('/notes')
    }
})

// Update note route
router.put('/:id', async (req, res) => {
    let note
    try {
        note = await Note.findById(req.params.id)
        note.name = req.body.name
        await note.save()
        res.redirect(`/notes/${note.id}`)
    } catch {
        if (author == null) {
            res.redirect('/')
        } else {
            res.render('notes/edit', {
                note: note,
                errorMessage: 'Error updating Note'
            })
        }
    }
})

// Delete note route
router.delete('/:id', async (req, res) => {
    let note
    try {
        note = await Note.findById(req.params.id)
      await note.remove()
      res.redirect('/notes')
    } catch {
      if (note == null) {
        res.redirect('/')
      } else {
        res.redirect(`/notes/${note.id}`)
      }
    }
})

module.exports = router;