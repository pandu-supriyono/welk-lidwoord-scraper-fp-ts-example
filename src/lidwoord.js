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
Object.defineProperty(exports, "__esModule", { value: true });
var E = __importStar(require("fp-ts/Either"));
var isDe = function (s) { return s.toLowerCase().substr(0, 2) == 'de'; };
var isHet = function (s) { return s.toLowerCase().substr(0, 3) == 'het'; };
var isLidwoord = function (s) { return typeof s === 'string' && (isDe(s) || isHet(s)); };
var makeValidationError = function (val) { return ({
    _tag: 'InvalidLidwoord',
    val: val
}); };
var validateLidwoord = E.fromPredicate(isLidwoord, makeValidationError);
exports.default = validateLidwoord;
