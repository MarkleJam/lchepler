module.exports = app => {
    const historys = require("../controllers/history.controller");
    var router = require("express").Router();

    //provide a body in the url
    router.post('/doAdd', historys.create);

    //provide a id param in the url
    router.get('/:id', historys.findAllHistoryOfOneProblem);
    
    //provide a complete body that has id in the url
    router.put('/doEdit', historys.updateOneWithId);

    //provide a id param in the url, id is the primary key in the table
    router.delete('/:id', historys.deleteOneWithId);
    
    //provide a id param in the url
    //id is the problem id
    router.delete('/deleteAll/:id', historys.deleteAllOfOneProblem);
    
    app.use('/history', router);
}