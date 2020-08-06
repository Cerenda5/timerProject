let chai = require('chai');
let chaiHttp = require("chai-http");
let server = require('../app');


chai.should();
chai.use(chaiHttp);

describe('Task API', () => {

    /**
     * Test the GET route
     */

    describe('GET /users', () => {
        it('It should GET all the users', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                })
        })
     });

     /**
     * Test the GET (by id) route
     */

    describe('GET /users/:id', () => {
        it('It should GET user by id', (done) => {
            chai.request(server)
                .get('/users/:id')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                })
        })
     });
});
