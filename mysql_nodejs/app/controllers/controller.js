const db = require('../config/db.config.js');
const Sul = db.Sul;

/**
 * Save a Customer object to database MySQL/PostgreSQL
 * @param {*} req 
 * @param {*} res 
 */
exports.createSul = (req, res) => {
    let sul = {};

    try{
        // Building Customer object from upoading request's body
        sul.date = req.body.date;
        sul.name = req.body.name;
        sul.amount = req.body.amount;
        sul.distance = req.body.distance;
    
        // Save to MySQL database
        Sul.create(sul, 
                          {attributes: ['id','date', 'name', 'amount', 'distance']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

/**
 * Retrieve Customer information from database
 * @param {*} req 
 * @param {*} res 
 */
exports.suls = (req, res) => {
    // find all Customer information from 
    try{
        Sul.findAll({attributes: ['id','date', 'name', 'amount', 'distance']})
        .then(suls => {
            res.status(200).json(suls);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }   
}

exports.getSul = (req, res) => {
    Sul.findByPk(req.params.id, 
                        {attributes: ['id','date', 'name', 'amount', 'distance']})
        .then(sul => {
          res.status(200).json(sul);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}

/**
 * Updating a Customer
 * @param {*} req 
 * @param {*} res 
 */
exports.updateSul = async (req, res) => {
    try{
        let sul = await Sul.findByPk(req.body.id);
    
        if(!sul){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a customer with id = " + sulId,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                date: req.body.date,
                name: req.body.name,
                amount: req.body.amount,
                distance: req.body.distance
            }
            let result = await Sul.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id','date', 'name', 'amount', 'distance']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a customer with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a customer with id = " + req.params.id,
            error: error.message
        });
    }
}

/**
 *  Delete a Customer by ID
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteSul = async (req, res) => {
    try{
        let sulId = req.params.id;
        let sul = await Sul.findByPk(sulId);

        if(!sul){
            res.status(404).json({
                message: "Does Not exist a Customer with id = " + sulId,
                error: "404",
            });
        } else {
            await sul.destroy();
            res.status(200).json();
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id,
            error: error.message
        });
    }
}