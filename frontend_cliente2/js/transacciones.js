const url = "http://localhost:8080/transaccion/"
const url3 = "http://localhost:8080/transaccion/list"

const contenedor = document.querySelector('tbody')

let resultados = ''

const modalTransacciones = new bootstrap.Modal(document.getElementById('modalTransaccion'))
const formTransacciones = document.querySelector('form')
const idTransaccion = document.getElementById('id')
const valorTransaccion = document.getElementById('valor')

let opcion = ''

btnCrear.addEventListener('click', () => {
    idTransaccion.value = ''
    valorTransaccion.value = ''
    idTransaccion.disabled = false
    modalTransacciones.show()
    opcion = 'crear'
})

const mostrar = (Transacciones) => {
    Transacciones.forEach(Transaccion => {
        resultados += `<tr>
                        <td >${Transaccion.id_transaccion}</td>
                        <td >${Transaccion.valor_transaccion}</td>
                        <td class="text-center" width="20%"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                    </tr>`
    })

    contenedor.innerHTML = resultados
}

fetch(url2)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector))
            handler(e)
    })
}

on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    console.log(id)

    alertify.confirm("Desea eliminar la Transaccion "+id,
        function () {
            fetch(url + id, {
                method: 'DELETE'
            })
                .then(() => location.reload())
        },
        function () {
            alertify.error('Cancel')
        });
})


let idForm = 0
on(document, 'click', '.btnEditar', e => {

    const fila = e.target.parentNode.parentNode
    
    idForm = fila.children[0].innerHTML
    const valor = fila.children[1].innerHTML

    idTransaccion.value = idForm
    idTransaccion.disabled = true
    valorTransaccion.value = valor


    opcion = 'editar'
    modalClientes.show()
})

formClientes.addEventListener('submit', (e) => {
    e.preventDefault()

        if (opcion == 'crear') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_transaccion: idTransaccion.value,
                    valor_transaccion: valorTransaccion.value,
                })
            })
                .then(response => response.json())
                .then(data => {
                    const nuevaTransaccion = []
                    nuevaTransaccion.push(data)
                    mostrar(nuevaTransaccion)
                })
        }
        if (opcion == 'editar') {

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_transaccion: idTransaccion.value,
                    valor_transaccion: valorTransaccion.value,
                })
            })
                .then(response => location.reload())

        }
        modalTransacciones.hide()
    
})



