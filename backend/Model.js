const db = require("./db");

function query(sql, first = false) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
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
    if(typeof idOrConds === 'object') {
      Object.entries(idOrConds.fields).forEach(([field, value], i) => {
        if(i > 0) sql += ' AND ';
        if(typeof value === 'string') value = `'${value}'`;
        sql += `${field} = ${value}`;
      });
      if(idOrConds.hasOwnProperty('order')) {
        sql += ` ORDER BY ${idOrConds.order}`;
      }
    } else {
      sql += `id = ${idOrConds}`;
    }
    return query(sql, first);
  }

  static findFirst(idOrConds, table) {
    return this.find(idOrConds, table, true);
  }

  async save(table) {
    let sql = `INSERT INTO ${table} (`;
    const setFields = this.fields.filter(field => this.hasOwnProperty(field));
    setFields.forEach((field, i) => {
      if(i > 0) sql += ', ';
      sql += field;
    });
    sql += ') VALUES (';
    setFields.forEach((field, i) => {
      if(i > 0) sql += ', ';
      let value = this[field];
      if(typeof value === 'string') value = `'${value}'`;
      sql += value;
    });
    sql += ')';
    await query(sql);
    const selectLastSql = `SELECT * FROM ${table} ORDER BY id DESC`;
    return query(selectLastSql, true);
  }

  static update(fields, id, table) {
    let sql = `UPDATE ${table} SET `;
    Object.entries(fields).forEach(([field, value], i) => {
      if(i > 0) sql += ', ';
      if(typeof value === 'string') value = `'${value}'`;
      sql += `${field} = ${value}`
    });
    sql += ` WHERE id = ${id}`;
    return query(sql);
  }
}

module.exports = Model;
