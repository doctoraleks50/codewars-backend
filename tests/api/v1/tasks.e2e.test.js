const {chai, chaiRequest, token, superTest, assert} = require('../../index');
const _ = require('lodash');

describe('Tasks', () => {
    describe('POST /api/v1/tasks', () => {
        it('should create new task', () => {
            return chaiRequest
                .post('/api/v1/tasks')
                .set('Authorization', token)
                .send({
                    id: 2,
                    title: 'Title 1',
                    instruction: '<h1>Instruction</h1>',
                    start_code: 'function main() {}',
                    basic_tests: 'main()',
                    full_tests: 'main()',
                    level: 5
                })
                .then(res => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(_.omit(res.body, [
                        'createdAt',
                        'updatedAt'
                    ])).to.deep.equal({
                        id: 2,
                        title: 'Title 1',
                        instruction: '<h1>Instruction</h1>',
                        start_code: 'function main() {}',
                        basic_tests: 'main()',
                        full_tests: 'main()',
                        user_id: 1,
                        level: 5
                    })
                })
        })
    });

    describe('GET /api/v1/tasks/:id', () => {
        it('should get task by id', async () => {
            const res = await superTest
                .get('/api/v1/tasks/2')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200);
            await assert.equal(res.body.title, 'Title 1')
            await assert.equal(res.body.instruction, '<h1>Instruction</h1>');
            await assert.equal(res.body.start_code, 'function main() {}');
            await assert.equal(res.body.basic_tests, 'main()');
            await assert.equal(res.body.full_tests, 'main()');
            await assert.equal(res.body.user_id, '1');
            await assert.equal(res.body.level, 5);
        })
    })

    describe('PUT /api/v1/tasks/:id', () => {
        it('should update task by id', () => {
            return superTest
                .put('/api/v1/tasks/2')
                .set('Authorization', token)
                .send({
                    id: 1,
                    title: 'Title 1',
                    instruction: '<h1>Instruction</h1>',
                    start_code: 'function fix() {return 1}',
                    basic_tests: 'main()',
                    full_tests: 'main()',
                    level: 3
                })
                .expect(200);
        })
    })

    describe('DELETE /api/v1/tasks/:id', () => {
        it('should delete task by id', () => {
            return superTest
                .delete('/api/v1/tasks/2')
                .set('Authorization', token)
                .expect(200);
        })
    })

});
