// --- 1. Lógica de Troca de Tema (Claro/Escuro) ---

const botao = document.getElementById('botao-tema');
const body = document.body;

// Persistência do tema: verifica o localStorage ao carregar
const temasalvo = localStorage.getItem('tema');
// Chama a função para aplicar o tema salvo (se existir)
if (temasalvo) {
    temaEscuro(temasalvo === 'escuro');
} else {
    // Aplica o tema padrão se não houver tema salvo (ex: claro)
    temaEscuro(false); 
}

// Função para aplicar/remover a classe 'escuro' e trocar o ícone
function temaEscuro(tipo) {
    if (tipo === true) {
        body.classList.add('escuro');
        // Ícone Sol (Font Awesome)
        botao.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        body.classList.remove('escuro');
        // Ícone Lua (Font Awesome)
        botao.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

// Evento de clique para alternar o tema
botao.addEventListener('click', () => {
    // Alterna a classe 'escuro' e retorna se ela está presente
    const isescuro = body.classList.toggle('escuro'); 
    temaEscuro(isescuro);
    localStorage.setItem('tema', isescuro ? 'escuro' : 'claro');
});

// --- 2. Lógica CRUD (Cadastro, Listagem, Edição, Exclusão) ---

const cadastroForm = document.getElementById('cadastroForm');
const usuariosContainer = document.getElementById('usuarios-container');
const mensagemDiv = document.getElementById('mensagem');
// Carrega os usuários salvos, ou um array vazio se for a primeira vez
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Evento de envio do formulário (Salvar/Atualizar)
cadastroForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const idusuarios = document.getElementById('idusuarios').value;
    const novoUsuario = {
        id: idusuarios || Date.now().toString(), // Novo ID ou ID existente
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
        // MODO EDIÇÃO: Atualiza o usuário
        const index = usuarios.findIndex(u => u.id === idusuarios);
        if (index !== -1) {
            usuarios[index] = novoUsuario;
            mensagemDiv.textContent = 'Usuário atualizado com sucesso!';
        }
    } else {
        // MODO CADASTRO: Adiciona novo usuário
        usuarios.push(novoUsuario);
        mensagemDiv.textContent = 'Usuário cadastrado com sucesso!';
    }
    
    // Salva a lista atualizada no localStorage e limpa o formulário
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    cadastroForm.reset();
    document.getElementById('idusuarios').value = ''; 
    renderizarUsuarios(); // Atualiza a lista na tela
});

// Função para desenhar a lista de usuários na tela (Onde os botões são criados)
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

    // Associa as funções aos botões DEPOIS de eles serem inseridos no DOM
    document.querySelectorAll('.btn-editar').forEach(button => {
        button.addEventListener('click', editarUsuario);
    });
    document.querySelectorAll('.btn-excluir').forEach(button => {
        button.addEventListener('click', excluirUsuario);
    });
}

// Função para preencher o formulário no modo de edição
function editarUsuario(e) {
    const id = e.target.getAttribute('data-id');
    const usuarioParaEditar = usuarios.find(u => u.id === id);

    if (usuarioParaEditar) {
        // Preenche o campo oculto idusuarios para indicar o modo edição
        document.getElementById('idusuarios').value = usuarioParaEditar.id; 
        
        // Preenche os outros campos
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

// --- CHAMADA INICIAL: Garante que a lista apareça ao carregar a página! ---
renderizarUsuarios();


// --- 3. Scroll suave para links de navegação ---

const navLinks = document.querySelectorAll('#menu ul a'); 
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        // Verifica se é um link local para uma seção (ex: #ficha)
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
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