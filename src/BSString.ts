import BSFile from "./BSFile";
import parser from 'xml2json';

class BSString extends BSFile {
    data: string; 

    constructor(data: string) {
        super(data);
        this.data = data;
    }

    load() {
        return new Promise((resolve: any, reject: any) => {
            this.content = JSON.parse(parser.toJson(this.data));
            resolve(this.content);
        });
    }
}

export default BSString;