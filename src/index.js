"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("fp-ts/lib/function");
var A = __importStar(require("fp-ts/Array"));
var TE = __importStar(require("fp-ts/TaskEither"));
var T = __importStar(require("fp-ts/Task"));
var scraper_1 = __importDefault(require("./scraper"));
var lidwoord_1 = __importDefault(require("./lidwoord"));
var getArgs = (0, function_1.pipe)(process.argv, function (args) { return args.slice(2); });
var main = function (words) {
    var arrayOfTe = (0, function_1.pipe)(words, A.map((0, function_1.flow)(scraper_1.default, TE.chainW((0, function_1.flow)(lidwoord_1.default, TE.fromEither)))));
    return (0, function_1.pipe)(A.sequence(TE.ApplicativePar)(arrayOfTe), TE.foldW(T.of, T.of));
};
main(getArgs)().then(function (res) { return console.log(res); });
