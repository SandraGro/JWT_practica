var jwt = require('jsonwebtoken');
module.exports = (app, userModel) => {
    app.post('/generate/token', function (req, res) {
        console.log('generando token')
        userModel.findOne({
            where: {
                user: req.body.user,
                password: req.body.password
            }
        }).then((resp) => {
            console.log(resp)
            if (!resp) {
                res.send({ message: "usuario o contraseña incorrectos" })
            } else {
                claimUser = {
                    id: resp.id,
                    nombre: resp.nombre,
                    role: resp.role,
                    area: resp.area
                }
                const token = jwt.sign(claimUser, 'secretKey', { expiresIn: '1h' });
                console.log(token);
                res.send(token);
            }
        });
    })

    app.post('/user', function (req, res) {
        //Autorization: 
        const authHeader = req.headers['authorization'];
        token = authHeader.replace('Bearer ', '')

        jwt.verify(token, 'secretKey', function (err, token) {
            if (err) {
                console.log('invalid token');
                res.status(401);
                res.send({message: 'Unauthorized'});
            } else {
                console.log('valid token');
                if (token.role === 'administrador') {
                    console.log('user is admin');
                    console.log(req.body);
                    userModel.create(req.body).then((resp) =>{
                        //res.status(200);
                        res.send(resp);
                    });
                }else {
                    res.send({menssage: 'se requieren permisos de administrador'})
                }
            }
        })
    });
}