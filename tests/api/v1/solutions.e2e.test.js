const {token, superTest, assert} = require('../../index');


describe('Solutions', () => {
    describe('POST /api/v1/tasks/:task_id/solutions', () => {
        it('should create new solution by task id', () => {
            return superTest
                .post('/api/v1/tasks/1/solutions')
                .set('Authorization', token)
                .send({
                    id: 1,
                    code: 'function main() {}',
                    user_id: '1',
                    task_id: '1',
                })
                .expect(200);
        })
    })

    describe('GET /api/v1/tasks/:task_id/solutions/:id', () => {
        it('should get task solution by task id and solution id', async () => {
            const res = await superTest
                .get('/api/v1/tasks/1/solutions/1')
                .set('Authorization', token)
                .expect(200)
            await assert.equal(res.body.code, 'function main() {}');
            await assert.equal(res.body.user_id, '1');
            await assert.equal(res.body.task_id, '1');
        })
    })

    describe('PUT /api/v1/tasks/:task_id/solutions/:id', () => {
        it('should update task solution by task id and solution id', () => {
            return superTest
                .put('/api/v1/tasks/1/solutions/1')
                .set('Authorization', token)
                .send({
                    code: 'function fix() {return 1}',
                    user_id: '1',
                    task_id: '1',
                })
                .expect(200);
        })
    })

    describe('DELETE /api/v1/tasks/:task_id/solutions/:id', () => {
        it('should delete task solution by task id and solution id', () => {
            return superTest
                .delete('/api/v1/tasks/1/solutions/1')
                .set('Authorization', token)
                .expect(200);
        })
    })

});