import React, {Fragment} from 'react'

// a exportação de 2 ou mais elementos requer uma tag de agrupamento, podendo ser <div> ou, se quiser evitar, Fragment (Fragment pode ser importado a parte)
export default props => 
    <Fragment>
        <h1>Bom dia {props.nome} {props.sobrenome} !</h1>
        <h2>VOCÊ PODE VOTAR</h2>
       
    </Fragment>



// export default props => 
//     [
//         <h1 key='l1'>Bom dia {props.nome} {props.sobrenome} !</h1>,
//         <h2 key='l2'>TESTE!!!</h2>
//     ]