import { RouteInterface } from "../typings/typings";

export default class Route {
    constructor(options: RouteInterface) {
        Object.assign(this, options)
    }
}