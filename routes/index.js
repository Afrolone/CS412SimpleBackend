const express = require('express')
const router = express.Router()
const Note = require('../models/note')

router.get('/', async (req, res) => {
  let notes
  try {
    notes = await Note.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch (error) {
    notes = []
  }
  res.render('index', { notes: notes })
})

module.exports = router