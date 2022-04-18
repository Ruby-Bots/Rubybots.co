import Route from "../../structures/Route";

export default new Route({
    name: "/community",
    execute: async (req, res) => res.redirect(process.env.SUPPORT_URL)
})