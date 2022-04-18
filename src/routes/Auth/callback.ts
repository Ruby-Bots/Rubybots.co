import passport from "passport";
import Route from "../../structures/Route";

export default new Route({
    name: "/auth/callback",
    middleware: [passport.authenticate("discord")],
    execute: async (req, res) => {
        res.redirect("/")
    }
})