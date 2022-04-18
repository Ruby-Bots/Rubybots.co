import axios from "axios";
import Route from "../../structures/Route";

export default new Route({
    name: "/",
    execute: async (req, res) => {
        const response = await (await axios.get(
            "https://api.github.com/orgs/Ruby-Bots/repos?per_page=10"
        )).data;
        res.render("pages/home.ejs", {
            user: req.user ? req.user : null,
            repos: response.filter(f => f.name !== ".github") || []
        })
    }
});
