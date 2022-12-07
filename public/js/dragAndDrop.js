const sTier = document.getElementById("s-tier");
const aTier = document.getElementById("a-tier");
const bTier = document.getElementById("b-tier");
const cTier = document.getElementById("c-tier");
const dTier = document.getElementById("d-tier");
const fTier = document.getElementById("f-tier");
const pool = document.getElementById("pool");

async function post(url, data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}

function saveTier(evt) {
  const tier = evt.to;
  const tierEl = document.getElementById(tier.id);
  const elArr = Array.from(tierEl.getElementsByClassName('list-item'));
  const itemIds = elArr.map(item => item.dataset.id);
  post(`/${tier.dataset.listId}/updateTier`, { itemIds, tier: tier.dataset.tier });
}

const sortableOpts = {
  group: 'tiers',
  animation: 150,
  draggable: '.list-item',
  onSort: saveTier
};

new Sortable(sTier, sortableOpts);
new Sortable(aTier, sortableOpts);
new Sortable(bTier, sortableOpts);
new Sortable(cTier, sortableOpts);
new Sortable(dTier, sortableOpts);
new Sortable(fTier, sortableOpts);
new Sortable(pool, sortableOpts);
