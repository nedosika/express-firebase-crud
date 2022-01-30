import admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.cert("./serviceAccountKey.json")
});

const firebase = admin.firestore();

const add = async (collection, data) => {
    const ref = firebase.collection(collection).doc();
    const id = ref.id;

    await ref.set(data);

    return {id, ...data}
}

const getDocOne = async (collection, id) => {
    const doc = await firebase.collection(collection).doc(id).get();
    return {id: doc.id, ...doc.data()};
}

const getDocAll = async (collection) => {
    const snapshot = await firebase.collection(collection).get();

    const documents = [];

    snapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        ...doc.data()
      })
    })

    return documents
};

const remove = (collection, id) =>
    firebase.collection(collection).doc(id).delete();

const update = (collection, document) =>
    firebase.collection(collection).doc(document.id).update(document);

export default {
    add,
    update,
    remove,
    getDocAll,
    getDocOne
};
