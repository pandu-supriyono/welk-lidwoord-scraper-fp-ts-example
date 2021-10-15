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
var cheerio_1 = __importDefault(require("cheerio"));
var function_1 = require("fp-ts/lib/function");
var TE = __importStar(require("fp-ts/TaskEither"));
var got_1 = __importDefault(require("got"));
var baseUrl = 'https://www.welklidwoord.nl';
var makeUrlFromZnw = function (s) {
    return baseUrl + "/" + s.toLowerCase();
};
var makeRequestError = function (err) {
    var message = err instanceof Error ? err.message : err;
    return {
        _tag: 'RequestError',
        message: message,
    };
};
var loadPage = function (body) { return cheerio_1.default.load(body); };
var getAnswer = function ($) { return $('h1').text().trim(); };
var getRequest = function (url) { return TE.tryCatch(function () { return (0, got_1.default)(url); }, makeRequestError); };
var parseFromUrl = function (url) {
    return (0, function_1.pipe)(getRequest(url), TE.map(function (_a) {
        var body = _a.body;
        return (0, function_1.pipe)(loadPage(body), getAnswer);
    }));
};
var scrapeFromZnw = (0, function_1.flow)(makeUrlFromZnw, parseFromUrl);
exports.default = scrapeFromZnw;
