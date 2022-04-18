import Route from "../../structures/Route";

export default new Route({
    name: "/login",
    execute: async (req, res) => {
        res.redirect(process.env.LOGIN_URL)
    }
})