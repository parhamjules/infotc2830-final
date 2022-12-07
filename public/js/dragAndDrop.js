const sTier = document.getElementById("s-tier");
const aTier = document.getElementById("a-tier");
const bTier = document.getElementById("b-tier");
const cTier = document.getElementById("c-tier");
const dTier = document.getElementById("d-tier");
const fTier = document.getElementById("f-tier");
const pool = document.getElementById("pool");

function saveTier(tierId) {
  const tierEl = document.getElementById(tierId);
  const elArr = Array.from(tierEl.getElementsByClassName('list-item'));
  const itemIds = elArr.map(item => item.dataset.id);
  // TODO
  console.log(itemIds);
}

const sortableOpts = {
  group: 'tiers',
  animation: 150,
  draggable: '.list-item',
  onSort: evt => saveTier(evt.to.id)
};

new Sortable(sTier, sortableOpts);
new Sortable(aTier, sortableOpts);
new Sortable(bTier, sortableOpts);
new Sortable(cTier, sortableOpts);
new Sortable(dTier, sortableOpts);
new Sortable(fTier, sortableOpts);
new Sortable(pool, sortableOpts);
