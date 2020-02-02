import fs from 'fs';

fs.readFile('./.gitignore', 'utf8', (err: any, content: any) => {
    fs.writeFile('./.gitignore', content.replace('dist', '.build'), () => {});
});