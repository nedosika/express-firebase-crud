import firestore, { COLLECTIONS } from "../services/Firestore/index.js";

class User {
  constructor(id, login, password, email, status) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.email = email;
    this.status = status;
  }

  static async getOne(email) {
    const response = await firestore.getDocsByQuery(COLLECTIONS.users, {
      field: "email",
      rule: "==",
      value: email.toLowerCase()
    });

    return response[0];
  }

  static async create({ email, password }) {
    return await firestore.add(COLLECTIONS.users, { email, password });
  }

  static async update(user) {
    return await firestore.update(COLLECTIONS.users, user);
  }
}

export default User;
