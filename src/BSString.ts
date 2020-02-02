import BSFile from "./BSFile";
import parser from 'xml2js';

class BSString extends BSFile {
    data: string; 

    constructor(data: string) {
        super(data);
        this.data = data;
    }

    load() {
        return new Promise((resolve: any, reject: any) => {
            return parser.parseString(this.data, (err: any, result: any) => {
                if(err) reject(err);
                
                this.content = result;
                resolve(this.content);
            })
        });
    }
}

export default BSString;