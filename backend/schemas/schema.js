import schemaTypes from "all:part:@sanity/base/schema-type";
import createSchema from "part:@sanity/base/schema-creator";
// test
import aboutPage from "./Pages/aboutPage";
import blogEntry from "./Pages/blogEntry";
import blogPage from "./Pages/blogPage";
import contactPage from "./Pages/contactPage";
import projectsPage from "./Pages/projectsPage";
import statsPage from "./Pages/statsPage";

import button from "./Objects/button";
import hobby from "./Objects/hobby";
import imageModel from "./Objects/imageModel";
import projects from "./Objects/project";
import seo from "./Objects/seo";
import tag from "./Objects/tag";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    aboutPage,
    contactPage,
    blogPage,
    projectsPage,
    statsPage,
    blogEntry,

    seo,
    hobby,
    imageModel,
    projects,
    button,
    tag,
  ]),
});
