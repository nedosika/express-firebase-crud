import firestore, {COLLECTIONS} from "../services/Firestore/index.js";

const add = async (req, res) => {
    try {
      const data = req.body;

      const ips = await firestore.add(COLLECTIONS.ips, data)

      res.status(201).send({
        data: {
          ips
        },
        status: "ips added"
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
};

const getAll = async (req, res) => {
    try {
        const ips = await firestore.getDocAll(COLLECTIONS.ips);

        if (ips.length) {
            res.status(200).send({
                data: ips,
                status: "ok"
            })
        } else {
            res.status(404).send({
                data: {
                    message: "Ips not found "
                },
                status: "not found"
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message);
    }
};

export default {
    add,
    getAll
};
