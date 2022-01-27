const validate = async (req, res) => {
    try {
        const data = req.body;

        res.status(201).send({
            data: {

            },
            status: "validate"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    validate
}