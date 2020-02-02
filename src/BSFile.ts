import parser from 'xml2js';
import fs from 'fs';

import { Model } from '@cemderin/battle-calculator';

class BSFile {
    path: string;
    content: any = null;

    constructor(path: string) {
        this.path = path;
    }

    load() {
        return new Promise((resolve: any, reject: any) => {
            fs.readFile(this.path, (err: any, data: any) => {
                if (err) reject(err);

                return parser.parseString(data, (err: any, result: any) => {
                    if(err) reject(err);
                    this.content = result;
                    resolve(this.content);
                })
            });
        })
    }

    extractModels(): Array<Model> {
        return this.content?.catalogue?.sharedSelectionEntries[0].selectionEntry?.filter((item: any) => {
            if (item['$'].type === 'model') return true;
        }).map((item: any) => {
            let profiles = item.profiles[0].profile;
            if (!Array.isArray(item.profiles[0].profile)) profiles = [item.profiles[0].profile];

            let model = new Model();
            model.name = item['$'].name;

            for (let profile of profiles) {
                if (profile['$'].typeName === 'Model') {
                    for (let characteristic of profile.characteristics[0].characteristic) {
                        switch (characteristic['$'].name) {
                            case 'M':
                                break;

                            case 'WS':
                                model.weaponskill = parseInt(characteristic['_']);
                                break;

                            case 'BS':
                                break;

                            case 'S':
                                model.strength = parseInt(characteristic['_']);
                                break;

                            case 'T':
                                model.toughness = parseInt(characteristic['_']);
                                break;

                            case 'W':
                                break;

                            case 'A':
                                break;

                            case 'Ld':
                                break;

                            case 'Sv':
                                model.save = parseInt(characteristic['_']);
                                break;

                            case 'Max':
                                break;

                            default:
                                console.log('Unrecognized profile characteristic', characteristic)
                        }
                    }
                }
            }

            return model;
        });
    }
}

export default BSFile;