const router=require("express").Router();
const c=require("../controllers/cryptoController");
router.get("/markets",c.markets);
router.get("/coin/:id",c.coin);
router.get("/coin/:id/chart",c.chart);
module.exports=router;
