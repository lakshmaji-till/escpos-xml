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
exports.TemplateParser = void 0;
const handlebars = __importStar(require("handlebars"));
const moment = __importStar(require("moment"));
const numeral = __importStar(require("numeral"));
require("numeral/locales/pt-br");
const lodash_1 = require("lodash");
const xml_parser_1 = require("./xml-parser");
class TemplateParser {
    constructor() {
        this.moment = moment;
        this.moment.locale('pt-br');
        this.numeral = numeral;
        this.numeral.locale('pt-br');
        this.handlebars = handlebars;
        this.registerMoment();
        this.registerNumeral();
    }
    registerMoment() {
        this.handlebars.registerHelper('moment', (context, block) => {
            if (context && context.hash) {
                block = lodash_1.cloneDeep(context);
                context = undefined;
            }
            var date = this.moment(context);
            if (block.hash.timezone) {
                date.tz(block.hash.timezone);
            }
            var hasFormat = false;
            for (var i in block.hash) {
                if (i === 'format') {
                    hasFormat = true;
                }
                else if (date[i]) {
                    date = date[i](block.hash[i]);
                }
            }
            if (hasFormat) {
                date = date.format(block.hash.format);
            }
            return date;
        });
    }
    registerNumeral() {
        this.handlebars.registerHelper('numeral', (context, block) => {
            if (context && context.hash) {
                block = lodash_1.cloneDeep(context);
                context = undefined;
            }
            return this.numeral(context).format(block.hash.format);
        });
    }
    parser(template, scope) {
        let fn = this.handlebars.compile(template);
        let xml = fn(scope);
        return new xml_parser_1.XMLParser().parser(xml);
    }
}
exports.TemplateParser = TemplateParser;
