import AuthService from "../services/AuthService.js";

const signIn = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!(email && password)) {
            return res.status(400).json({
                message: "All input is required",
                status: "Required"
            });
        }

        const auth = await AuthService.signIn(email, password);

        if (auth?.user) {
            return res
                .status(200)
                .send({
                    data: {
                        ...auth.tokens,
                        user: auth.user
                    },
                    status: "OK"
                });
        }

        res.status(400).json({
            message: "Invalid Credentials",
            status: "Invalid"
        });
    } catch (error) {
        console.log(error.message);
    }
};

const signUp = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!(email && password)) {
            return res.status(400).send({
                message: "All input is required",
                status: "Required"
            });
        }

        const {user, tokens} = await AuthService.signUp(email, password);

        return res
            .status(201)
            .send({
                data: {
                    token: tokens.accessToken,
                    user
                },
                status: "OK"
            });
    } catch (err) {
        return res.status(409).send({
            message: err.message,
            status: "Error"
        });
    }
};

const refresh = async (req, res) => {
    try {
        const refreshToken =
            req.body.refreshToken ||
            req.query.refreshToken ||
            req.headers["x-auth-refresh-token"];

        const {user, tokens} = await AuthService.refresh(refreshToken);

        return res
            .status(200)
            .json({
                data: {
                    ...tokens,
                    user
                },
                status: "OK"
            });
    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            message: "Invalid Credentials",
            status: "Invalid Credentials"
        });
    }
};

const logOut = async (req, res) => {
    try {
        const {id} = req.body;

        await AuthService.logOut(id);

        return res.status(200).json({
            data: {
                id
            },
            message: "logOuted",
            status: "OK"
        });

    } catch (error) {
        console.log(error.message)
    }
}

export default {
    refresh,
    signIn,
    signUp,
    logOut
};
