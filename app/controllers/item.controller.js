const db = require("../models");
var JSON = require('JSON');
const Item = db.items;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');
const sequelize = db.sequelize;
const sqls = require('../sqls/sql.js');
// Create and Save a new Item
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Id can not be empty!"
    });
    return;
  }

  // Create a Item
  const item = {
    id: req.body.id,
    name: req.body.name,
    diff: req.body.diff,
    type1: req.body.type1,
    type2: req.body.type2,
    type3: req.body.type3,
    grasp: req.body.grasp,
    createAt: req.body.createAt,
  };

  // Save Item in the database
  Item.create(item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Item."
      });
    });
};

// Retrieve all Items from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  var condition  = null;
  Item.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items."
      });
    });
};

// Search Items from the database on conditions.
exports.search = (req, res) => {
  let id = req.query.id;
  let name = req.query.name;
  let diff = req.query.diff;
  let type1 = req.query.type1;
  let type2 = req.query.type2;
  let type3 = req.query.type3;
  let grasp = req.query.grasp;

  let nameCondition = (!name) ? {} : { name: { [Op.like]: `%${name}%` } };
  let idCondition =  id ? { id: { [Op.like]: `%${id}%` } } : {};
  let diffCondition = diff ? { diff: { [Op.like]: `%${diff}%` } } : {};
  let graspCondition = grasp ? { grasp: { [Op.like]: `%${grasp}%` } } : {};
  let reqType1 = type1, reqType2 = type2, reqType3 = type3;

  let type1Condition = reqType1 ? {[Op.or]:[{type1: {[Op.like]: `%${reqType1}%` }},{type2: {[Op.like]: `%${reqType1}%` }}, {type3: {[Op.like]: `%${reqType1}%` }}]} : {};
  let type2Condition = reqType2 ? {[Op.or]:[{type1: {[Op.like]: `%${reqType2}%` }},{type2: {[Op.like]: `%${reqType2}%` }}, {type3: {[Op.like]: `%${reqType2}%` }}]} : {};
  let type3Condition = reqType3 ? {[Op.or]:[{type1: {[Op.like]: `%${reqType3}%` }},{type2: {[Op.like]: `%${reqType3}%` }}, {type3: {[Op.like]: `%${reqType3}%` }}]} : {};

  Item.findAll({ where: [nameCondition,
    idCondition,
    diffCondition,
    graspCondition, type1Condition, type2Condition, type3Condition]
    }
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items."
      });
    });
};

exports.getReviews = async (req, res) => {
  const interval = req.query.interval;
  let searchsql = sqls.searchReview;
  searchsql = searchsql.replace("{{interval}}", interval);
  sequelize.query(searchsql, { type: QueryTypes.SELECT, raw: true })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving review:" + err
    });
  })
}

// Find a single Item with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Item.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Item with id=" + id
      });
    });
};

// Update a Item by the id in the request
exports.update = (req, res) => {
  const id = req.body.id;

  Item.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Item with id=" + id
      });
    });
};

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Item.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Item with id=" + id
      });
    });
};

// Delete all Items from the database.
exports.deleteAll = (req, res) => {
  Item.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Items were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all item."
      });
    });
};

// find all published item
// exports.findAllPublished = (req, res) => {
//   Item.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving items."
//       });
//     });
// };
