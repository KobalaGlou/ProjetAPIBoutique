const assert = require('assert');
const supertest = require('supertest');
const app = require('../app'); // Assure-toi que c'est bien ton fichier principal

describe('📝 CRUD sur TypeUtilisateur', () => {

    let typeUtilisateurId = '';
    let token ='';


        // PARTIE CREATION
    it('🔵 Devrait créer un nouveau type d\'utilisateur', (done) => {
        // Obtenons d'abord un token valide avec un login correct
        supertest(app)
            .post('/v0/auth/login')
            .send({ email: 'test@test.com', password: 'testtest' })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                token = res.body.token;
                // Utiliser ce token pour accéder à une route protégée
                supertest(app)
                    .post('/v0/type-utilisateur')  // Exemple de route protégée
                    .send({ nomType: 'AdminTest' })
                    .set('authorization', `Bearer ${token}`) // Ajouter le token dans l'en-tête Authorization
                    
                    .end((err, res) => {
                        assert.strictEqual(res.status, 201); // Vérifier que le type a été créé avec succès
                        typeUtilisateurId = res.body.idType; // Sauvegarder l'ID pour l'utiliser dans les tests suivants
                        done();
                    });
            });
    });

    
    
    // PARTIE LECTURE
    it('🔵 Devrait retourner un type d\'utilisateur par ID', (done) => {
        supertest(app)
            .get(`/v0/type-utilisateur/5`)
            .set('authorization', `Bearer ${token}`) // Ajouter le token dans l'en-tête Authorization
            .end((err, res) => {
                assert.strictEqual(res.status, 200); // Vérifier que la récupération a réussi
                done();
            });
    });

    it('🔴 Devrait retourner une erreur si le type d\'utilisateur n\'existe pas', (done) => {
        supertest(app)
            .get('/v0/type-utilisateur/9999') // ID qui n'existe pas
            .set('authorization', `Bearer ${token}`) // Ajouter le token dans l'en-tête Authorization
            .end((err, res) => {
                assert.strictEqual(res.status, 404); // Vérifier que l'erreur est retournée si l'utilisateur n'existe pas
                done();
            });
    });

    // PARTIE MISE À JOUR
    it('🔵 Devrait mettre à jour un type d\'utilisateur', (done) => {
        supertest(app)
            .put(`/v0/type-utilisateur/6`)
            .send({ nomType: 'SuperAdmin'})
            .set('authorization', `Bearer ${token}`) // Ajouter le token dans l'en-tête Authorization
            .end((err, res) => {
                assert.strictEqual(res.status, 200); // Vérifier que la mise à jour a réussi
                done();
            });
    });

    // PARTIE SUPPRESSION
    it('🔵 Devrait supprimer un type d\'utilisateur', (done) => {
        supertest(app)
            .delete(`/v0/type-utilisateur/6`)
            .set('authorization', `Bearer ${token}`) // Ajouter le token dans l'en-tête Authorization
            .end((err, res) => {
                assert.strictEqual(res.status, 200); // Vérifier que la suppression a réussi
                done();
            });
    });

    it('🔴 Devrait retourner une erreur si on tente de supprimer un type d\'utilisateur inexistant', (done) => {
        supertest(app)
            .delete('/v0/type-utilisateur/9999') // ID qui n'existe pas
            .set('authorization', `Bearer ${token}`) // Ajouter le token dans l'en-tête Authorization
            .end((err, res) => {
                assert.strictEqual(res.status, 404); // Vérifier qu'une erreur est retournée si l'ID n'existe pas
                done();
            });
    });
});
