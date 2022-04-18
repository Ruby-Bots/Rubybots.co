import passport from "passport";
import Route from "../../structures/Route";

export default new Route({
  name: `/logout`,
  execute: async (req, res) => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  },
});
