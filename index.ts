import BSFile from "./src/BSFile";

let file = new BSFile('input.cat');
file.load().then((data: any) => {
    let models = file.extractModels();
    // console.log(models)
});

// console.log(a);