const url = "http://localhost:8080/cuenta/"
const url2 = "http://localhost:8080/cuenta/list"

const contenedor = document.querySelector('tbody')

let resultados = ''

const modalCuentas = new bootstrap.Modal(document.getElementById('modalCuenta'))
const formCuentas = document.querySelector('form')
const idCuenta = document.getElementById('id')
const saldoCuenta = document.getElementById('saldo')

let opcion = ''

btnCrear.addEventListener('click', () => {
    idCuenta.value = ''
    saldoCuenta.value = ''
    idCuenta.disabled = false
    modalCuentas.show()
    opcion = 'crear'
})

const mostrar = (Cuentas) => {
    Cuentas.forEach(Cuenta => {
        resultados += `<tr>
                        <td >${Cuenta.id_cuenta}</td>
                        <td >${Cuenta.saldo_cuenta}</td>
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

    alertify.confirm("Desea eliminar la cuenta "+id,
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
    const saldo = fila.children[1].innerHTML
    idCuenta.value = idForm
    idCuenta.disabled = true
    saldoCuenta.value = saldo

    opcion = 'editar'
    modalClientes.show()
})

formCuentas.addEventListener('submit', (e) => {
    e.preventDefault()

        if (opcion == 'crear') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cuenta: idCuenta.value,
                    saldo_cuenta: saldoCuenta.value,
                })
            })
                .then(response => response.json())
                .then(data => {
                    const nuevaCuenta = []
                    nuevaCuenta.push(data)
                    mostrar(nuevaCuenta)
                })
        }
        if (opcion == 'editar') {

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cuenta: idCuenta.value,
                    saldo_cuenta: saldoCuenta.value
                })
            })
                .then(response => location.reload())

        }
        modalCuentas.hide()
    
})



