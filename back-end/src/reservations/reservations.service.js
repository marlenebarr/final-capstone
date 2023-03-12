//// Service.js file:  holds functions that make all the CRUD transactions for one table ////
const connection = require("../db/connection");
function create(reservation) {
  const db = connection();
  return db("reservations").insert(reservation).returning("*");
}

/** reads the data (row) with the given 'reservation_id'. */
function read(reservation_id) {
  const db = connection();
  return db("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

/** updates reservation with the given reservation_id. */
function update(reservation_id, status) {
  const db = connection();
  return db("reservations")
    .where({ reservation_id: reservation_id })
    .update({ status: status });
}

/** edits reservation with the given reservation_id. */
function edit(reservation_id, reservation) {
  const db = connection();
  return db("reservations")
    .where({ reservation_id: reservation_id })
    .update({ ...reservation })
    .returning("*");
}

/** lists all reservations with the given date or mobile number. */
function list(date, mobile_number) {
  const db = connection();
  if (date) {
    return db("reservations")
      .select("*")
      .where({ reservation_date: date })
      .orderBy("reservation_time", "asc");
  }

  if (mobile_number) {
    const db = connection();
    return db("reservations")
      .select("*")
      .where("mobile_number", "like", `${mobile_number}%`);
  }

  return db("reservations").select("*");
}

module.exports = {
  list,
  create,
  read,
  update,
  edit,
};
