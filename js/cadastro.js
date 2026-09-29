const SUPABASE_URL = 'https://djynqufbwkiiclubkkkx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9YaEyzGYKm3Uthx2BqPJVw_xZgqkjkg';

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const formCadastro = document.getElementById('formCadastro');

formCadastro.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: senha,
    options: {
      data: {
        nome: nome
      }
    }
  });

  if (error) {
    console.error('Erro no cadastro:', error);
    alert('Erro ao criar conta: ' + error.message);
    return;
  }

  console.log('Usuário criado:', data.user);

  if (data.session) {
    alert('Conta criada com sucesso!');
    window.location.href = 'login.html';
  } else {
    alert('Conta criada! Verifique seu e-mail para confirmar o cadastro.');
    window.location.href = 'login.html';
  }
});