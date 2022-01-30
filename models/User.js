import firestore, {COLLECTIONS} from "../services/Firestore/index.js";

class User {
    constructor(id, login, password, email, status) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.email = email;
        this.status = status;
    }

    static async getOneByEmail(email) {
        const users = await firestore.getDocAll(COLLECTIONS.users);

        return  users.find((user) => user.email === email.toLowerCase());
    }

    static async create({email, password}){
        return  await firestore.add(COLLECTIONS.users, {email, password});
    }
}

export default User;