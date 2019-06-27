var jwt = require('jsonwebtoken');
module.exports = (app, clientesModel) => {
    app.post('/clientes', function (req, res) {
        const authHeader = req.headers['authorization'];
        token = authHeader.replace('Bearer ', '')
        jwt.verify(token, 'secretKey', function (err, token) {
            if (err) {
                console.log('invalid token')
                res.status(401)
                req.send({ message: Unauthorized })
            } else {
                console.log('valid token')
                clienteNuevo = req.body;

                if (token.role === 'admin') {
                    clientesModel.findAll().then((resp) => {
                        res.send(resp)
                    });
                } else {
                    clientesModel.findAll({
                        where: {
                            area: token.area
                        }
                    }).then((resp) => {
                        res.send(resp)
                    })
                }
            }
        });
    });

    app.get('/clientes', function (req, res) {
        const authHeader = req.headers['authorization'];
        token = authHeader.replace('Bearer ', '')
    });

    app.get('/clientes/:id', function (req, res) {
        const authHeader = req.headers['authorization'];
        token = authHeader.replace('Bearer ', '')
        jwt.verify(token, 'secretKey', function (err, token) {
            if (err) {
                console.log('invalid token')
                res.status(401)
                req.send({ message: Unauthorized })
            } else {
             let whereObject = {
                    id:req.params.id
                }

                if (token.role != 'administrador') {
                    whereObject.area = token.area;
                }

                clientesModel.findOne({ where:whereObject }).then(resp => {
                    res.send(resp);
                })
            }
        });
    })

    app.delete('/clientes/:id', function (req, res) {
        const authHeader = req.headers['authorization'];
        token = authHeader.replace('Bearer ', '')

        jwt.verify(token, 'secretKey', function (err, token) {
            if (err) {
                console.log('invalid token')
                res.status(401)
                req.send({ message: Unauthorized })
            } else {
                if (token.role === 'administrador') {
                    clientesModel.findOne({
                        where: {
                            id: req.params.id,
                            area: token.area
                        }
                    }).then(resp => {
                        if (resp) {
                            clientesModel.destroy({
                                where: {
                                    id: req.params.id,
                                    area: token.area
                                }
                            }).then(resp => {
                                res.send({ message: 'cliente eliminado' })
                            });
                        } else {
                            res.status(400)
                            res.send({ message: 'cliente no existe' })
                        }
                    });
                } else {
                    res.status(401)
                    res.send({ message: 'Unauthorized' })
                }
            }
        })
    });
}