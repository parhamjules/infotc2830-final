const db = require("./db");

function query(sql, binds, first = false) {
  return new Promise((resolve, reject) => {
    db.execute(sql, binds, (err, results) => {
      if(err) {
        reject(err);
      } else {
        resolve(first ? results[0] : results);
      }
    });
  });
}

class Model {

  constructor(fields) {
    Object.entries(fields).forEach(([field, value]) => {
      this[field] = value;
    });
  }

  static find(idOrConds, table, first = false) {
    let sql = `SELECT * FROM ${table} WHERE `;
    const binds = [];
    if(typeof idOrConds === 'object') {
      Object.entries(idOrConds.fields).forEach(([field, value], i) => {
        if(i > 0) sql += ' AND ';
        sql += `${field} = ?`;
        binds.push(value);
      });
      if(idOrConds.hasOwnProperty('order')) {
        sql += ` ORDER BY ${idOrConds.order}`;
      }
    } else {
      sql += `id = ?`;
      binds.push(idOrConds);
    }
    return query(sql, binds, first);
  }

  static findFirst(idOrConds, table) {
    return this.find(idOrConds, table, true);
  }

  async save(table) {
    let sql = `INSERT INTO ${table} (`;
    const binds = [];
    const setFields = this.fields.filter(field => this.hasOwnProperty(field));
    setFields.forEach((field, i) => {
      if(i > 0) sql += ', ';
      sql += field;
    });
    sql += ') VALUES (';
    setFields.forEach((field, i) => {
      if(i > 0) sql += ', ';
      let value = this[field];
      sql += '?';
      binds.push(value);
    });
    sql += ')';
    await query(sql, binds);
    const selectLastSql = `SELECT * FROM ${table} ORDER BY id DESC`;
    return query(selectLastSql, [], true);
  }

  static update(fields, id, table) {
    let sql = `UPDATE ${table} SET `;
    const binds = [];
    Object.entries(fields).forEach(([field, value], i) => {
      if(i > 0) sql += ', ';
      sql += `${field} = ?`;
      binds.push(value);
    });
    sql += ` WHERE id = ?`;
    binds.push(id);
    return query(sql, binds);
  }
}

module.exports = Model;
