const express = require('express');
const fs = require("fs");
const { dirname } = require('path');
const TierListItem = require('../models/TierListItem');
const { authenticated } = require('../middlewares');
const { renderTemplate } = require('../helpers');
const app = module.exports = express();

function createItem(res, listId, name, image, color) {
  TierListItem.findLastInPool(listId).then(lastInPool => {
    const sort = lastInPool ? lastInPool.sort + 1 : 1;
    const item = new TierListItem({list_id: listId, name, image, color, sort});
    item.save().then(newItem => {
      res.redirect(`/edit/${listId}/items`);
    });
  });
}

app.get('/edit/:listId/items', authenticated, (req, res) => {
  TierListItem.findByListId(req.params.listId).then(items => {
    renderTemplate(res, 'app/manage_items', {listId: req.params.listId, items});
  });
});

app.post('/:listId/addItem', authenticated, (req, res) => {
  let image = null;
  if(req.files && Object.keys(req.files).length > 0) {
    const file = req.files.image;
    const uploadDir = `${dirname(require.main.filename)}/public/images/item_images/${req.params.listId}`;
    if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    const uploadPath = `${uploadDir}/${file.name}`;
    file.mv(uploadPath, err => {
      if(err) {
        res.status(500).send(err);
      } else {
        image = `/images/item_images/${req.params.listId}/${file.name}`;
      }
      createItem(res, req.params.listId, req.body.name, image, req.body.color);
    });
  } else {
    createItem(res, req.params.listId, req.body.name, image, req.body.color);
  }
});

app.post('/:listId/updateTier', authenticated, (req, res) => {
  const toUpdate = req.body.itemIds.length;
  req.body.itemIds.forEach((id, i) => {
    TierListItem.update(id, req.body.tier, i + 1);
    if(i + 1 === toUpdate) {
      res.sendStatus(200);
    }
  });
})
