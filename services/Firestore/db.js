import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert("./serviceAccountKey.json")
});

const db = admin.firestore();

const add = async (collection, data) => {
  const ref = db.collection(collection).doc();

  await ref.set(data);

  return ref.id;
};

const getDoc = async (collection, id) => {
  const ref = await db.collection(collection).doc(id);
  const doc = await ref.get();

  return doc;
};

const getCollection = async (collection) => {
  const docs = await db.collection(collection).get();

  const result = [];

  docs.forEach((doc) => {
    result.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return result;
};

const remove = async (collection, id) =>
  await db.collection(collection).doc(id).delete();

const update = async (collection, document) => {
  const ref = await db.collection(collection).doc(document.id);
  const oldDocument = await ref.get();

  if (oldDocument.exists) {
    return await ref.update(document);
  } else {
  }
};

export default db;
