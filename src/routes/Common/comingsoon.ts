import Route from "../../structures/Route";

export default new Route({
  name: "/comingsoon",
    execute: async (req, res) => res.status(200).send({ status: "Coming soon!" })

});
