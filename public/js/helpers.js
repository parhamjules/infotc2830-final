function formatDate(fromDB) {
  const date = new Date(fromDB);
  return date.toLocaleDateString('en-us', {year: "numeric", month: "long", day:"numeric", hour: "numeric", minute: "numeric"});
}

module.exports = { formatDate }
