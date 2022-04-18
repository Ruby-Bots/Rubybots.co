import glob from "glob";
import { promisify } from "util";
import { RouteInterface } from "../typings/typings";
const globPromise = promisify(glob);

export const importFile = async (filePath: string) => {
  return (await import(filePath))?.default;
};

export default async (app) => {
 const APIFiles: string[] = await globPromise(
   `${__dirname}/**/*{.ts,.js}`
 );
 APIFiles.forEach(async (filePath) => {
   const route: RouteInterface = await importFile(filePath);
   if (!route.name) return;
   const middleware = [];
   if (route.middleware) {
     route.middleware.forEach((mw) => {
       middleware.push(mw);
     });
   }
   app.get(`${route.name}`, middleware, async (req, res) => {
     route.execute(req, res);
   });
 });
}