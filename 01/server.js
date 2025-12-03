// --- Lógica CRUD do Formulário ---

const cadastroForm = document.getElementById('cadastroForm');
const usuariosContainer = document.getElementById('usuarios-container');
const mensagemDiv = document.getElementById('mensagem');
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Função para salvar ou atualizar um usuário
cadastroForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const idusuarios = document.getElementById('idusuarios').value;
    const novoUsuario = {
        id: idusuarios || Date.now().toString(), // Usa ID existente ou novo timestamp
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        sexo: document.getElementById('sexo').value,
        data_nasc: document.getElementById('data_nasc').value,
        senha: document.getElementById('senha').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        endereco: document.getElementById('endereco').value
    };

    if (idusuarios) {
        // Modo Edição: Encontra e substitui o usuário
        const index = usuarios.findIndex(u => u.id === idusuarios);
        if (index !== -1) {
            usuarios[index] = novoUsuario;
            mensagemDiv.textContent = 'Usuário atualizado com sucesso!';
        }
    } else {
        // Modo Cadastro: Adiciona novo usuário
        usuarios.push(novoUsuario);
        mensagemDiv.textContent = 'Usuário cadastrado com sucesso!';
    }
    
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    cadastroForm.reset();
    document.getElementById('idusuarios').value = ''; // Limpa o ID para o próximo cadastro
    renderizarUsuarios();
});

// Função para renderizar a lista de usuários
function renderizarUsuarios() {
    if (usuarios.length === 0) {
        usuariosContainer.innerHTML = '<p>Nenhum usuário cadastrado.</p>';
        return;
    }

    let html = '<table><thead><tr><th>Nome</th><th>Email</th><th>Ações</th></tr></thead><tbody>';
    
    usuarios.forEach(usuario => {
        html += `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>
                    <button class="btn-editar" data-id="${usuario.id}">Editar</button>
                    <button class="btn-excluir" data-id="${usuario.id}">Excluir</button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    usuariosContainer.innerHTML = html;

    // Adiciona event listeners aos novos botões
    document.querySelectorAll('.btn-editar').forEach(button => {
        button.addEventListener('click', editarUsuario);
    });
    document.querySelectorAll('.btn-excluir').forEach(button => {
        button.addEventListener('click', excluirUsuario);
    });
}

// Função de Edição
function editarUsuario(e) {
    const id = e.target.getAttribute('data-id');
    const usuarioParaEditar = usuarios.find(u => u.id === id);

    if (usuarioParaEditar) {
        // Preenche o formulário com os dados do usuário
        document.getElementById('idusuarios').value = usuarioParaEditar.id;
        document.getElementById('nome').value = usuarioParaEditar.nome;
        document.getElementById('email').value = usuarioParaEditar.email;
        document.getElementById('telefone').value = usuarioParaEditar.telefone;
        document.getElementById('sexo').value = usuarioParaEditar.sexo;
        document.getElementById('data_nasc').value = usuarioParaEditar.data_nasc;
        document.getElementById('senha').value = usuarioParaEditar.senha;
        document.getElementById('cidade').value = usuarioParaEditar.cidade;
        document.getElementById('estado').value = usuarioParaEditar.estado;
        document.getElementById('endereco').value = usuarioParaEditar.endereco;
        
        mensagemDiv.textContent = 'Modo de Edição ativado. Altere os campos e clique em Salvar.';
    }
}

// Função de Exclusão
function excluirUsuario(e) {
    const id = e.target.getAttribute('data-id');
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        usuarios = usuarios.filter(u => u.id !== id);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        renderizarUsuarios();
        mensagemDiv.textContent = 'Usuário excluído com sucesso.';
    }
}

// Carregar usuários na inicialização
renderizarUsuarios();


// --- Scroll suave para links de navegação (seu código original, ajustado)
const navLinks = document.querySelectorAll('#menu ul a'); // Removido .link, já que não estava no HTML
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        // Só tenta fazer scroll suave se o href for uma seção local (começa com # e não é apenas '#')
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Seu cálculo de scroll suave
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});