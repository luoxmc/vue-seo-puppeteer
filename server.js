const express = require('express')
const request = require('request')
const ssr = require('./ssr.js')

const app = express()

const host = 'https://read.luoxx.top'

app.get('/static/*', async (req, res) => {
    request(`${host}${req.url}`).pipe(res)
})

app.get('/manifest.json', async (req, res) => {
    request(`${host}${req.url}`).pipe(res)
})

app.get('/favicon.ico', async (req, res) => {
    request(`${host}${req.url}`).pipe(res)
})

app.get('/logo*', async (req, res) => {
    request(`${host}${req.url}`).pipe(res)
})

app.get('*', async (req, res) => {
    const {html, ttRenderMs} = await ssr.get(`${host}${req.originalUrl}`);
    res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`)
    return res.status(200).send(html); // Serve prerendered page as response.
})

app.listen(8327, () => console.log('Server started. Press Ctrl + C to quit'))
