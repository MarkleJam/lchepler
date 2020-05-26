module.exports = {
    searchReview : "select item.id, item.name,  item.type1, item.type2,item.type3, item.diff, item.grasp, item.createAt, max(date) as md " +
    "from item " +
    "inner join history on item.id=history.problemid " +
    "group by problemid having DATEDIFF(now(), md) >= {{interval}}",
};