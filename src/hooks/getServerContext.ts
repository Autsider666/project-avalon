import "server-only";
import {cache} from "react";

type ServerContext = {
    timestamp: string,
    files: string[],
}

//TODO continue with this
export const getServerContext = cache((): ServerContext => {
    console.log('generating ServerContext!');

    return {
        timestamp: Date.now().toString(),
        files: [],
    };
});