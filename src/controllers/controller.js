var controller = {}

//=======================================================================
//Login de usuarios
//=======================================================================
controller.login = (req, res) => {
    var user = req.body.usuario;
    var pass = req.body.contra;
    req.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al cargar usuarios',
                errors: err
            });
        }

        if (user && pass) {
            conn.query('SELECT * FROM usuarios WHERE usuario = ? AND contra = ?', [user, pass], function(error, usuario, fields) {
                if (usuario.length > 0) {
                    req.session.loggedin = true;
                    req.session.user = user;
                    res.status(200).json({
                        ok: true,
                        usuario: usuario,
                        id: usuario[0].id,
                        mensaje: 'Login logrado exitosamente...!',
                        
                    });
                } else {
                    res.status(400).json({
                        ok: false,
                        mensaje: 'Credenciales incorrectas!',
                    });

                }
            });
        } else {
            res.status(400).json({
                ok: false,
                mensaje: 'Ingrese sus credenciales!'
            });
            //console.log('jklj', res.end());
        }
    });
};


//=======================================================================
//Obtiene todos los soportes generados vista solo MASTER
//=======================================================================
controller.listar = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT sp_id, sp_titulo, sp_detalle, sp_estado,spe_detalle FROM soporte.soporte,soporte.soporte_estado  where sp_estado=spe_id and sp_estado = 2', (err, soportes) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar lista de soporte',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                soportes: soportes
            });
        });
    });
};

//=======================================================================
//Obtiene todos los soportes generados vista solo MASTER
//=======================================================================
controller.listarMaster = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT sp_id, sp_titulo, sp_detalle, sp_estado,spe_detalle FROM soporte.soporte,soporte.soporte_estado  where sp_estado = spe_id and sp_estado >= 3', (err, soportes) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar lista de soporte',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                soportes: soportes
            });
        });
    });
};




//=======================================================================
//Obtine Soporte por id
//=======================================================================
controller.obtenerSoporteId = (req, res) => {
    const id = req.params.id;
    console.log(id);
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM soporte where sp_id = ?', [id], (err, soporte) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar Ticket',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                soporte: soporte
            });
        });
    });
};


//=======================================================================
//Obtine tecnico asigndado por  por id
//=======================================================================
controller.obtenerTecnicoAsigando = (req, res) => {
    const id = req.params.id;
    console.log(id);
    req.getConnection((err, conn) => {
        conn.query('SELECT  nombre, max(spc_fecha), spc_id FROM  soporte_comentarios, usuarios  WHERE id=spc_clie_tec and  spc_id_soporte = ?', [id], (err, data) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar Técnico asignado',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                data: data
            });
        });
    });
};



//=======================================================================
//Insercion de datos a la tabla soporte
//=======================================================================
controller.crear = (req, res) => {
    const data = req.body;
    //console.log('test', data)
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO soporte set ?', [data], (err, soporte) => {
            //console.log('test', soporte);
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al crear ticket de soporte',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                soporte: soporte
            });
        });
    });
};

//=======================================================================
//Actualizacion de la tabla soporte por id 
//=======================================================================
controller.actualiza = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE soporte set ? WHERE sp_id = ?', [data, id], (err, soporte) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'error al actualizar',
                    errors: err

                });
            }

            res.status(200).json({
                ok: true,
                soporte: soporte
            });
        });
    });
}


//=======================================================================
//Eliminacion de la tabla soporte por id 
//=======================================================================
controller.eleminaS = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM soporte WHERE sp_id = ?', [id], (err, soporte) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el id',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                soporte: soporte
            });
        });
    });
}

//TÉCNICO
//=======================================================================
//Obtiene todos los soportes generados por ID usuario
//=======================================================================
controller.listarParaTecnico = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT sp_titulo, sp_estado, sp_detalle, sp_id, spc_clie_tec, spc_detalle, CAST((sp_fecha) as DATE) as fecha FROM soporte.soporte_comentarios, soporte.soporte where spc_id_soporte=sp_id and sp_estado = 3 group by sp_id  and spc_clie_tec = ?', [id], (err, data) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar lista para técnico.',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                data: data
            });
        });
    });
};



//=======================================================================
//Obtiene todos los soportes generados por ID usuario
//=======================================================================
controller.listarParaUsuario = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT sp_id, sp_titulo, sp_detalle, sp_estado,spe_detalle, CAST((sp_fecha) as DATE) as fecha FROM soporte.soporte,soporte.soporte_estado  where sp_estado=spe_id  and sp_estado >= 2 and sp_usuario = ?', [id], (err, data) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar lista para Usuario.',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                data: data
            });
        });
    });
};



//MASTER

//=======================================================================
//Obtiene todos los soportes Comentarios generados
//=======================================================================
controller.listarC = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM soporte_comentarios', (err, soportes) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar lista de soporte',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                soportes: soportes
            });
        });
    });
};
//=======================================================================
//insercion de datos a la tabla soporte_comentarios
//=======================================================================
controller.enviarComentarios = (req, res) => {
    console.log(req.params);
    const data = req.body;
    console.log('test', data)
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO soporte_comentarios set ?', [data], (err, soporte) => {
            console.log('test', soporte);
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al crear comentario',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                soporte: soporte
            });
        });
    });
};

//=======================================================================
//Lista comentarios
//=======================================================================
controller.listaComentarios = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT sp_id,spc_fecha,nombre,spc_detalle FROM soporte_comentarios,soporte,usuarios where spc_usuario=id and spc_id_soporte=sp_id and sp_id = ?', [id], (err, data) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar comentarios.',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                data: data
            });
        });
    });
};




//=======================================================================
//Exporta el modulo 
//=======================================================================
module.exports = controller;