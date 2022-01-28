const validate = (value) =>
  /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(value);

const ip = (req, res) => {
  const data = req.body;

  Object.assign(
    {},
    ...Object.entries(data).map(([name, values]) => {
      const errors = Object.entries(values)
        .map(([key, value]) => validate(value))
        .filter((element) => !element);

      console.log(errors);

      if (errors.length) {
        res.status(405).send({
          errors: { [name]: "IP addres validate error" },
          status: "Validate error"
        });
      } else {
        res.status(200).send({
          status: "Validate ok"
        });
      }
    })
  );
};

export default {
  ip
};
