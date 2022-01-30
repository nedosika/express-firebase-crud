import db, { COLLECTIONS } from "../services/Firestore/index.js";

const add = async (req, res) => {
  try {
    const data = req.body;
    const ref = db.collection(COLLECTIONS.ips).doc();

    await ref.set(data);

    res.status(201).send({
      data: {
        id: ref.id
      },
      status: "added"
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAll = (req, res) => {
  return db
    .collection(COLLECTIONS.ips)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        res.status(404).send({
          data: {
            message: "ip not found "
          },
          status: "not found"
        });
      } else {
        const ips = [];

        snapshot.forEach((doc) => {
          ips.push({
            id: doc.id,
            ...doc.data()
          });
        });

        res.status(200).send({
          data: ips,
          status: "ok"
        });
      }
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};

export default {
  add,
  getAll
};
