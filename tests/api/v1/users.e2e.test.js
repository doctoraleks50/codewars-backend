const {token, superTest, assert} = require('../../index');


describe('Users', () => {
    describe('GET /api/v1/users/profile', () => {
        it('should get users profile', () => {
            return superTest
                .get('/api/v1/users/profile')
                .set('Authorization', token)
                .expect(200)
        })
    })

    describe('PUT /api/v1/users/:id/update', () => {
        it('should update users profile by id', () => {
            return superTest
                .put('/api/v1/users/2/update')
                .set('Authorization', token)
                .expect(200)
        })
    })
});