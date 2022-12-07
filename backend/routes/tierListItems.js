const express = require('express');
const fs = require("fs");
const { dirname } = require('path');
const TierListItems = require('../db/tables/TierListItems');
const { authenticated } = require('../middlewares');
const { renderTemplate } = require('../helpers');
const app = module.exports = express();

function createItem(res, listId, name, image, color) {
  TierListItems.create(listId, name, image, color).then(success => {
    res.redirect(`/edit/${listId}/items`);
  });
}

app.get('/edit/:listId/items', authenticated, (req, res) => {
  TierListItems.findByListId(req.params.listId).then(items => {
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

})
