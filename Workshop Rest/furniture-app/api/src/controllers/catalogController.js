const router = require('express').Router();

const furnitureService = require('../services/furnitureService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    if (req.query.where) {
        let ownerId = req.query.where.split('=')[1];
        ownerId = ownerId.substring(1, ownerId.length - 1);

        let furniture = await furnitureService.getOwn(req.user._id);
        res.json(furniture);
    } else {
        let furniture = await furnitureService.getAll();
        res.json(furniture);
    }
});

router.get('/:furnitureId', async (req, res) => {
    let furniture = await furnitureService.getOne(req.params.furnitureId);

    res.json(furniture);
})

router.post('/', isAuth, async (req, res) => {
    await furnitureService.create({...req.body, _ownerId: req.user._id});

    res.json({ok: true});
});

router.put('/:furnitureId', async (req, res) => {
     await furnitureService.update(req.params.furnitureId, req.body);

     res.json({ok: true});
});


router.delete('/:furnitureId', async (req, res) => {
    await furnitureService.delete(req.params.furnitureId);

    res.json({ok: true});
});

module.exports = router;