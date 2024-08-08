
class SiteController{
    
    // Get [] /Homes
    index(req, res)
    {
        res.render('home');
    }
    show(rep, res)
    {
        res.send('NEW DETAIL!!!');
    }
}
module.exports = new SiteController ;