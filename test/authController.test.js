const assert = require('assert');
const supertest = require('supertest');
const app = require('../app'); // Assure-toi que c'est bien ton fichier principal

describe('🔑 Authentification', () => {

    // PARTIE LOGIN
    it('🔵 Devrait retourner un token avec des identifiants valides', (done) => {
        supertest(app)
            .post('/v0/auth/login')
            .send({ email: 'test@test.com', password: 'testtest' })
            .end((err, res) => {
                assert.strictEqual(res.status, 200); // Vérifier que le code de statut est 200
                done();
            });
    });

    it('🔴 Devrait refuser la connexion avec des identifiants invalides', (done) => {
        supertest(app)
            .post('/v0/auth/login')
            .send({ email: 'fakeuser@example.com', password: 'wrongpass' })
            .end((err, res) => {
                assert.strictEqual(res.status, 401); // Vérifier que le code de statut est 401
                done();
            });
    });


    //PARTIE JWT

    it('🔵 Devrait permettre l\'accès avec un token valide', (done) => {
        // Obtenons d'abord un token valide avec un login correct
        supertest(app)
            .post('/v0/auth/login')
            .send({ email: 'test@test.com', password: 'testtest' })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                const token = res.body.token;

                // Utiliser ce token pour accéder à une route protégée
                supertest(app)
                    .get('/v0/utilisateur')  // Exemple de route protégée
                    .set('authorization', `Bearer ${token}`) // Ajouter le token dans l'en-tête Authorization
                    .end((err, res) => {
                        assert.strictEqual(res.status, 200); // On attend un code 200 si le token est valide
                        done();
                    });
            });
    });

    it('🔴 Devrait refuser l\'accès avec un token invalide', (done) => {
        // Utiliser un token invalide
        supertest(app)
            .get('/v0/utilisateur')
            .set('authorization', 'Bearer invalidToken')
            .end((err, res) => {
                assert.strictEqual(res.status, 401); // On attend un code 401 pour un token invalide
                done();
            });
    });
});
