const express = require('express');
const TierLists = require('../db/tables/TierLists');
const TierListItems = require('../db/tables/TierListItems');
const { authenticated } = require('../middlewares');
const { renderTemplate } = require('../helpers');
const app = module.exports = express();

app.get('/', authenticated, (req, res) => {
  TierLists.findByUserId(req.session.currentUser.id).then(lists => {
    renderTemplate(res, 'app/home', {lists});
  });
});

app.post('/createList', (req, res) => {
  TierLists.create(req.session.currentUser.id, req.body.name).then(newList => {
    res.redirect(`/edit/${newList.id}`);
  });
});

app.get('/edit/:listId', authenticated, (req, res) => {
  TierLists.findById(req.params.listId).then(list => {
    if(list) {
      TierListItems.findByListId(list.id).then(items => {
        const itemMap = {s: [], a: [], b: [], c: [], d: [], f: [], pool: []};
        items.forEach(item => itemMap[item.tier || 'pool'].push(item));
        renderTemplate(res, 'app/edit_list', {list, items: itemMap})
      });
    }
  });
});
