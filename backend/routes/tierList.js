const express = require('express');
const TierList = require('../models/TierList');
const TierListItem = require('../models/TierListItem');
const { authenticated } = require('../middlewares');
const { renderTemplate } = require('../helpers');
const app = module.exports = express();

app.get('/', authenticated, (req, res) => {
  TierList.findByUserId(req.session.currentUser.id).then(lists => {
    renderTemplate(res, 'app/home', {lists});
  });
});

app.post('/createList', (req, res) => {
  const list = new TierList({
    user_id: req.session.currentUser.id,
    name: req.body.name
  });
  list.save().then(newList => {
    res.redirect(`/edit/${newList.id}`);
  });
});

app.get('/edit/:listId', authenticated, (req, res) => {
  TierList.findById(req.params.listId).then(list => {
    if(list) {
      TierListItem.findByListId(list.id).then(items => {
        const itemMap = {s: [], a: [], b: [], c: [], d: [], f: [], pool: []};
        items.forEach(item => itemMap[item.tier || 'pool'].push(item));
        renderTemplate(res, 'app/edit_list', {list, items: itemMap})
      });
    }
  });
});
