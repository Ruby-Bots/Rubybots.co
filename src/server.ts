import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import store from "connect-mongo";
import passport from "passport";
import cookies from "cookies";
import Logger from "./utils/Logger";
import ejs from "ejs";
import connect from "./schemas/connect";
import routes from "./routes";
import discord from "./stratagies/discord";

// App
const app = express();

// App.use
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 * 24 },
    store: new store({ mongoUrl: process.env.MONGO_DB })
}))
app.use(cookies.express(["a", "b", "c"]));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(process.cwd() + "/src/views"));

// App.set
app.set("json spaces", 1);
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");

// App.listen, Mongodb Connection, Route Handler & Discord Stratagy
discord()
connect();
routes(app)
app.listen(5000, () => {
    Logger.info(`Connected to server, http://localhost:5000`, {label: "INFO"})
})