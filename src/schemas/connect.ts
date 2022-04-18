import { connect } from "mongoose"
import Logger from "../utils/Logger"

export default () => {
    connect(process.env.MONGO_DB).then(() => {
        Logger.info(`Connected to database!`, { label: "INFO" })
    }).catch((err) => {
        Logger.error(`Failed to connect to database\n\n${err}`, { label: "ERROR" })
    })
}