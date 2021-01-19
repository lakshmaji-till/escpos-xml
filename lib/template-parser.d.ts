import 'numeral/locales/pt-br';
import { BufferBuilder } from './buffer-builder';
export declare class TemplateParser {
    private moment;
    private numeral;
    private handlebars;
    constructor();
    private registerMoment;
    private registerNumeral;
    parser(template: any, scope: any): BufferBuilder;
}
