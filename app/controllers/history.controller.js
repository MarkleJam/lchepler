const db = require("../models");
const History = db.historys;
const Op = db.Sequelize.Op;

// Create and Save a new history
exports.create = (req, res) => {
  // Validate request
  if (!req.body.problemid) {
    res.status(400).send({
      message: "problemid can not be empty!"
    });
    return;
  }

  // Create a History
  const history = {
    problemid: req.body.problemid,
    date: req.body.date,
    comment: req.body.comment,
  };

  // Save History in the database
  History.create(history)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the HistoryI."
      });
    });
};

// Retrieve all Historys from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  var condition  = null;
  History.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving historys."
      });
    });
};

// Find Historys with an problem id
exports.findAllHistoryOfOneProblem = (req, res) => {
  const problemid = req.params.id;

  History.findAll({ where: {problemid:problemid}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving History with id=" + id
      });
    });
};

// Update a History by the id in the request
exports.updateOneWithId = (req, res) => {
  const id = req.body.id;

  History.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "History was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update History with id=${id}. Maybe History was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating History with id=" + id
      });
    });
};

// Delete a History with the specified id in the request
exports.deleteOneWithId = (req, res) => {
  const id = req.params.id;

  History.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "History was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete History with id=${id}. Maybe History was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete History with id=" + id
      });
    });
};

// Delete all Historys of a problem from the database.
exports.deleteAllOfOneProblem = (req, res) => {
  History.destroy({
    where: {problemid:req.params.id},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Historys were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all History."
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
