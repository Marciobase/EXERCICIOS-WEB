const bodyParser = require('body-parser')
const express = require('express')


const app = express()
app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.get('/teste', (req, res) => res.send('OK')) usar somente para testes do servidor ativo na porta

//configurações necessárias para upload de arquivos
const multer = require('multer')
//define pasta e renomea arquivos de upload no servidor
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './upload')
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage }).single('arquivo')
app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.end('Ocorreu um erro!')
        }
        res.end('Sucesso!')
    })
})

//define api de retorno de um formulário
app.post('/formulario', (req, res) => {
    res.send({
        ...req.body,
        id: 1
    })
})

//conexão Firebird
const firebird =  require('node-firebird')
const cors = require('cors')

const dbOptions = {
    host: 'localhost',
    port: 3050,
    database: 'C:/Base/Dados/SQS2000_SOSIL.FDB',
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys: false, // set to true to lowercase keys
    role: null, // default
    pageSize: 4096, // default when creating database
    retryConnectionInterval: 1000, // reconnect interval in case of connection drop
    blobAsText: false, // set to true to get blob as text, only affects blob subtype 1
    encoding: 'UTF8' // default encoding for connection is UTF-8
}

function executeQuery(sqlText, params, callback) {
    try {
    firebird.attach(dbOptions, function (err, db) {
        if (err) return callback(err, []);

    // db = é o DATABASE
    db.query(sqlText , params,  function (err, result) {

            db.detach() //muito importante fechar a conexão (sempre antes de concluir!)
            
            if (err) {
                return callback(`Ocorreu um erro de execução na query [${sqlText}] -> (${err}). Nossos técnicos já estão avaliando. `, []);
            } else {
                return callback(undefined, result);
            }

        })
    })
    } catch (error) {
        console.log(`Ocorreu um erro de execução ${error}, os nossos técnicos já estão avaliando. `)
    }
}

//Middleware CORS
app.use(cors())

let sqlText = "SELECT EP.CODIGO_DA_ENTIDADE,EP.NOME_DA_ENTIDADE, EP.SITUACAO,\
            CASE EP.CODIGO_TIPO_DE_PESSOA\
               WHEN 'F' THEN EP.CPF\
               WHEN 'J' THEN EP.CGC\
               ELSE EP.CPF\
            END AS CPF_CNPJ,\
            ADM.CODIGO_DO_CONTRATO_DE_ADM, ADM.DATA_DO_INICIO_CONTRATO\
            FROM GR_ENTIDADE EP\
            JOIN LC_CONT_ADM ADM\
                ON ADM.SITUACAO_DO_CONTRATO = 'A'\
                AND ADM.CODIGO_DO_PROPRIETARIO = EP.CODIGO_DA_ENTIDADE\
            WHERE 1 = 1 "
//rotas
// lista proprietários
app.post('/proprietarios', function (req, res) {
    let filtro = []
    if (req.query.nome_da_entidade){
        const descricao = req.query.nome_da_entidade
        sqlText += `AND NOME_DA_ENTIDADE LIKE '%${req.query.nome_da_entidade}%' `
        filtro.push(req.query.nome_da_entidade)
    }
    if (req.query.data_do_inicio_contrato){
        const descricao = req.query.data_do_inicio_contrato
        let data_contrato='01.01.1980'
        sqlText += `AND COALESCE(DATA_DO_INICIO_CONTRATO, '${data_contrato}')  >= '${req.query.data_do_inicio_contrato}'`
        filtro.push(req.query.data_do_inicio_contrato)
    }
    executeQuery(sqlText, filtro, function(err, result){
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
    })
    sqlText = "SELECT EP.CODIGO_DA_ENTIDADE,EP.NOME_DA_ENTIDADE, EP.SITUACAO,\
            CASE EP.CODIGO_TIPO_DE_PESSOA\
               WHEN 'F' THEN EP.CPF\
               WHEN 'J' THEN EP.CGC\
               ELSE EP.CPF\
            END AS CPF_CNPJ,\
            ADM.CODIGO_DO_CONTRATO_DE_ADM, ADM.DATA_DO_INICIO_CONTRATO\
            FROM GR_ENTIDADE EP\
            JOIN LC_CONT_ADM ADM\
                ON ADM.SITUACAO_DO_CONTRATO = 'A'\
                AND ADM.CODIGO_DO_PROPRIETARIO = EP.CODIGO_DA_ENTIDADE\
            WHERE 1 = 1 "
})
//lista de filiais
app.post('/filiais', function (req, res) {
    let filtro = []
    // if (req.query.nome_da_entidade){
    //     const descricao = req.query.nome_da_entidade
    //     sqlText += `AND NOME_DA_ENTIDADE LIKE '%${req.query.nome_da_entidade}%' `
    //     filtro.push(req.query.nome_da_entidade)
    // }
    // if (req.query.data_do_inicio_contrato){
    //     const descricao = req.query.data_do_inicio_contrato
    //     let data_contrato='01.01.1980'
    //     sqlText += `AND COALESCE(DATA_DO_INICIO_CONTRATO, '${data_contrato}')  >= '${req.query.data_do_inicio_contrato}'`
    //     filtro.push(req.query.data_do_inicio_contrato)
    // }
    executeQuery(sqlText, filtro, function(err, result){
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).json(result)
        }
    })
    sqlText = "SELECT EP.CODIGO_DA_FILIAL,EP.NOME_DA_FILIAL\
            FROM GR_FILIAL EP\
            WHERE 1 = 1 "
})

//app get chamada pelo axios
app.get('/parOuImpar', (req, res) =>{
    // formas de receber dados
    // req.body (POST)
    // req.query (GET os campos de pesquisa vem após url com ? e separados por & exemplo '/parOuImpar?codigo=1&nome="maria"')
    // req.paramns (a pesquisa vem logo direto após url exemplo '/parOuImpar/:numero')
    const par = parseInt(req.query.numero) % 2 === 0
    res.send({resultado: par ? 'par' : 'impar'})
})

app.listen(8081, () => console.log('Servidor ativo'))
