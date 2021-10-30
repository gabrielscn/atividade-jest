const fs = require('fs')
const request = require('supertest')
const app = require('../src/app')
const animalsData = require('../src/data/animals.json')

describe('Adding animals', () =>{
    afterAll(()=>{
        while(animalsData.length > 0){
            animalsData.pop()
        }
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData))
    })
    it('Should register successfully an animal', async () =>{
        const res = await request(app).post('/animais?nome=Spike&especie=Cachorro&idade=3')
        expect(res.status).toBe(201)
    })

    it('Should not register successfully an animal', async()=>{
        const res = await request(app).post('/animais?nome=Mimi&especie=Gato&idade=jovem')
        expect(res.status).toBe(400)
    })

    it('Should not register successfully an animal', async()=>{
        const res = await request(app).post('/animais?nome=J&especie=Hamster&idade=1')
        expect(res.status).toBe(400)
    })
})

describe('A simple get test', () =>{
    afterAll(()=>{
        while(animalsData.length > 0){
            animalsData.pop()
        }
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData))
    })
    it('Should register successfully an animal', async () =>{
        const res = await request(app).post('/animais?nome=Mel&especie=Cachorro&idade=7')
        expect(res.status).toBe(201)
    })

    it('Should register successfully an animal', async () =>{
        const res = await request(app).post('/animais?nome=Noah&especie=Cachorro&idade=2')
        expect(res.status).toBe(201)
    })

    it('Should register successfully an animal', async () =>{
        const res = await request(app).post('/animais?nome=Theo&especie=Cachorro&idade=1')
        expect(res.status).toBe(201)
    })

    it('Should return successfully all animals', async () =>{
        const res = await request(app).get('/animais')
        expect(res.status).toBe(200)
    })
})