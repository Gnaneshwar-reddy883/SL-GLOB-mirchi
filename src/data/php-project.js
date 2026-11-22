import { includeFiles } from "./php/includes-source";
import { pageFiles } from "./php/pages-source";
import { assetFiles } from "./php/assets-source";

// The PHP project, grouped the way it sits in the folder.
export const phpProject = [
  { group: "Pages", files: pageFiles },
  { group: "Includes", files: includeFiles },
  { group: "Styles, scripts and data", files: assetFiles },
];

export const allPhpFiles = phpProject.flatMap((section) => section.files);