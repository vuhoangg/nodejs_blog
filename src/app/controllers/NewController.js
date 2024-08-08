
class NewController{
    
    // Get [] /news
    index(req, res)
    {
        res.render('news');
    }
    show(rep, res)
    {
        res.send('NEW DETAIL!!!');
    }
}
module.exports = new NewController ;