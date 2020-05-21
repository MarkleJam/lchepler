module.exports = app => {
    const historys = require("../controllers/history.controller");
    var router = require("express").Router();

    router.post('/doAdd', historys.create);

    router.get('/:id', historys.findAllHistoryOfOneProblem);
    
    router.put('/doEdit', historys.updateOneWithId);

    //Id is the primary key of one history
    router.delete('/deleteOne/:id', historys.deleteOneWithId);
    
    //Id is the problem id
    router.delete('/deleteAll/:id', historys.deleteAllOfOneProblem);
    
    app.use('/history', router);
}