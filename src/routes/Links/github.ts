import Route from "../../structures/Route";

export default new Route({
  name: "/github",
  execute: async (req, res) =>
    res.redirect(`https://github.com/Ruby-Bots`),
});
