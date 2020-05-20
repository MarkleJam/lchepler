module.exports = app => {
    const items = require("../controllers/item.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Item
    router.post("/doAdd", items.create);
  
    // Retrieve all Item
    router.get("/", items.findAll);
  
    // Retrieve a single Item with id
    router.get("/:id", items.findOne);
  
    // Update a Item with id
    router.put("/doEdit", items.update);
  
    // Delete a Item with id
    router.delete("/:id", items.delete);
  
    // Delete all
    router.delete("/", items.deleteAll);
  
    app.use('/item', router);
  };
  