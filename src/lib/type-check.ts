import {BundledLanguage} from "shiki";
import {bundledLanguages} from "shiki/langs";

export function isBundledLanguage(language: string): language is BundledLanguage {
    return Object.keys(bundledLanguages).includes(language) !== undefined;
}