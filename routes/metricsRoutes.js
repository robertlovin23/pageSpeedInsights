const mongoose = require('mongoose');
const SiteMetrics = mongoose.model('metrics');
const requireLogin = require('../middleware/requireLogin');

module.exports = (app) => {
    app.get("/api/saved_sites/:userId", requireLogin, async (req,res) => {
        var userId = req.params.userId;
        console.log(userId)
        const siteList = await SiteMetrics.find({googleId: userId});
        res.status(200).send({
            status: 'Success',
            siteList
        });
    })

    app.get("/api/saved_sites/:userId/:id", requireLogin, async (req,res) => {
        var id = req.params.id;
        var userId = req.params.userId;
        const singleSite = await SiteMetrics.findOne({googleId: userId, _id: id});
        res.status(200).send({
            status: 'Success',
            singleSite
        });  
    })

    app.post("/api/saved_sites/add", requireLogin, (req,res) => {
        const metrics = new SiteMetrics({
            siteMetrics: req.body,
            googleId: req.body.googleId
        }).save();
        res.json(metrics);
    })

    app.delete("/api/saved_sites/delete/:user/:id", requireLogin, async (req,res) => {
        var userId = req.params.user;
        const id = req.params.id;

        console.log(id)
        const deletedMetric = await SiteMetrics.deleteOne({_id: id,googleId: userId});
        res.send(deletedMetric);
    })
}