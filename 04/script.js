document.addEventListener('DOMContentLoaded', () => {
    console.log('Script carregado v2.0');
    loadUsers();
});

document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const id = data.idusuarios;

    let url = 'http://localhost:3000/api/usuarios';
    let method = 'POST';

    if (id) {
        url = `http://localhost:3000/api/usuarios/${id}`;
        method = 'PUT';
    }

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na requisição');
            }
        })
        .then(data => {
            const mensagemDiv = document.getElementById('mensagem');
            mensagemDiv.textContent = id ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!';
            mensagemDiv.style.color = 'green';
            event.target.reset();
            document.getElementById('idusuarios').value = ''; // Limpar ID oculto
            loadUsers(); // Recarregar a lista
        })
        .catch(error => {
            console.error('Erro:', error);
            const mensagemDiv = document.getElementById('mensagem');
            mensagemDiv.textContent = 'Erro ao salvar usuário. Verifique o console.';
            mensagemDiv.style.color = 'red';
        });
});

function loadUsers() {
    fetch('http://localhost:3000/api/usuarios')
        .then(response => response.json())
        .then(users => {
            console.log('Usuários carregados:', users);
            // alert('Carregando ' + users.length + ' usuários na lista.'); // Debug
            const container = document.getElementById('usuarios-container');
            container.innerHTML = '';

            if (users.length === 0) {
                container.innerHTML = '<p>Nenhum usuário cadastrado.</p>';
                return;
            }

            const table = document.createElement('table');
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';
            table.innerHTML = `
            <thead>
                <tr style="background-color: var(--destaque); color: var(--texto-inverso);">
                    <th style="padding: 10px; text-align: left;">ID</th>
                    <th style="padding: 10px; text-align: left;">Nome</th>
                    <th style="padding: 10px; text-align: left;">Email</th>
                    <th style="padding: 10px; text-align: center;">Ações</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;

            const tbody = table.querySelector('tbody');
            users.forEach(user => {
                const tr = document.createElement('tr');
                tr.style.borderBottom = '1px solid #ddd';
                tr.innerHTML = `
                <td style="padding: 10px;">${user.idusuarios}</td>
                <td style="padding: 10px;">${user.nome}</td>
                <td style="padding: 10px;">${user.email}</td>
                <td style="padding: 10px; text-align: center;">
                    <button onclick="editUser(${user.idusuarios})" style="margin-right: 5px; padding: 5px 10px; background-color: #ffc107; border: none; border-radius: 4px; cursor: pointer;">Editar</button>
                    <button onclick="deleteUser(${user.idusuarios})" style="padding: 5px 10px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Excluir</button>
                </td>
            `;
                tbody.appendChild(tr);
            });

            container.appendChild(table);
        })
})
        .catch (error => {
    console.error('Erro ao carregar usuários:', error);
    alert('Erro ao carregar lista de usuários: ' + error.message);
});
}

function editUser(id) {
    fetch(`http://localhost:3000/api/usuarios`) // Na prática ideal seria buscar apenas um, mas vamos filtrar da lista ou buscar todos
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.idusuarios === id);
            if (user) {
                document.getElementById('idusuarios').value = user.idusuarios;
                document.getElementById('nome').value = user.nome;
                document.getElementById('email').value = user.email;
                document.getElementById('telefone').value = user.telefone;
                document.getElementById('sexo').value = user.sexo;
                // Formatar data para YYYY-MM-DD se necessário
                if (user.data_nasc) {
                    const date = new Date(user.data_nasc);
                    const formattedDate = date.toISOString().split('T')[0];
                    document.getElementById('data_nasc').value = formattedDate;
                }
                document.getElementById('senha').value = user.senha;
                document.getElementById('cidade').value = user.cidade;
                document.getElementById('estado').value = user.estado;
                document.getElementById('endereco').value = user.endereco;

                document.getElementById('mensagem').textContent = 'Editando usuário ' + id;
                document.getElementById('mensagem').style.color = 'blue';
            }
        });
}

function deleteUser(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        fetch(`http://localhost:3000/api/usuarios/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    loadUsers();
                    alert('Usuário excluído com sucesso!');
                } else {
                    alert('Erro ao excluir usuário.');
                }
            })
            .catch(error => console.error('Erro:', error));
    }
}

// Expor funções para o escopo global para o onclick funcionar
window.editUser = editUser;
window.deleteUser = deleteUser;
