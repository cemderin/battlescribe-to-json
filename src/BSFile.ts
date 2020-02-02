import parser from 'xml2json';
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
                this.content = JSON.parse(parser.toJson(data));
                resolve(this.content);
            });
        })
    }

    extractModels(): Array<Model> {
        return this.content?.catalogue?.sharedSelectionEntries?.selectionEntry?.filter((item: { type: string; }) => {
            if (item.type === 'model') return true;
        }).map((item: any) => {
            let profiles = item.profiles.profile;
            if (!Array.isArray(item.profiles.profile)) profiles = [item.profiles.profile];

            let model = new Model();
            model.name = item.name;

            for (let profile of profiles) {
                if (profile.typeName === 'Model') {
                    for (let characteristic of profile.characteristics?.characteristic) {
                        switch (characteristic.name) {
                            case 'M':
                                break;

                            case 'WS':
                                model.weaponskill = parseInt(characteristic['$t']);
                                break;

                            case 'BS':
                                break;

                            case 'S':
                                model.strength = parseInt(characteristic['$t']);
                                break;

                            case 'T':
                                model.toughness = parseInt(characteristic['$t']);
                                break;

                            case 'W':
                                break;

                            case 'A':
                                break;

                            case 'Ld':
                                break;

                            case 'Sv':
                                model.save = parseInt(characteristic['$t']);
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