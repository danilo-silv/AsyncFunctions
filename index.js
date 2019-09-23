
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);


function obterUsuario() {
    return new Promise(function resolvePromisse(resolve, reject) {
        setTimeout(() => {
            return resolve({
                id: 1,
                name: "Joãozinho da Silva",
                dataNascimento: new Date()
            })
        }, 1000);
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromisse(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: "94454-5564",
                ddd: 11
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: "Rua tijuquinha",
            number: 2230
        })
    }, 2000);
}

async function main() {
    try {
        console.time('medindo-promise');
        const usuario = await obterUsuario();
        // const telefone = await obterTelefone(usuario.id);
        // const endereco = await obterEnderecoAsync(usuario.id);

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const telefone = resultado[0];
        const endereco = resultado[1];

        console.log(`
            Nome: ${usuario.name}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            Endereço: ${endereco.rua}, ${endereco.number}
        `);

        console.timeEnd('medindo-promise')
    } catch (error) {
        console.error('Deu ruim', error);
    }
}

main();