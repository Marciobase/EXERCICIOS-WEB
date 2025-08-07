
const gulp = require('gulp')
const { series, parallel } = require('gulp')

const tarefa1 = cb => {
    console.log('tarefa1...')
    return cb()
}

const tarefa2 = cb => {
    console.log('tarefa2...')
    return cb()
}

const copiar = cb => {
    // gulp.src(['pastaA/arquivo1.txt', 'pastaA/arquivo2.txt'])
    gulp.src('pastaA/**/*.txt')
        .pipe(gulp.dest('pastaB'))
        // .pipe(funcao()) executa funções em seq sobre os arquivos litados em src
        // .pipe(funcao())

    return cb()
}

const tarefaFim = cb => {
    console.log('tarefaFIM...')
    return cb()
}


module.exports.default = series(
    parallel(tarefa1, tarefa2),
    copiar,
    tarefaFim
)