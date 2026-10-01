const SUPABASE_URL = 'https://djynqufbwkiiclubkkkx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9YaEyzGYKm3Uthx2BqPJVw_xZgqkjkg';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const emailForm = document.getElementById('emailForm');
const codeForm = document.getElementById('codeForm');
const passwordForm = document.getElementById('passwordForm');
const emailInput = document.getElementById('email');
const tokenInput = document.getElementById('token');
const statusMessage = document.getElementById('statusMessage');
const formTitle = document.getElementById('formTitle');
const formDescription = document.getElementById('formDescription');

function showStatus(message, kind = '') {
  statusMessage.textContent = message;
  statusMessage.dataset.kind = kind;
}

function setLoading(form, isLoading, loadingLabel) {
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = isLoading;

  if (isLoading) {
    submitButton.dataset.originalLabel = submitButton.textContent;
    submitButton.textContent = loadingLabel;
  } else if (submitButton.dataset.originalLabel) {
    submitButton.textContent = submitButton.dataset.originalLabel;
    delete submitButton.dataset.originalLabel;
  }
}

emailForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  setLoading(emailForm, true, 'Enviando...');
  showStatus('');

  const { error } = await supabaseClient.auth.resetPasswordForEmail(emailInput.value.trim());

  setLoading(emailForm, false);
  if (error) {
    showStatus('Não foi possível solicitar o código. Confira o e-mail e tente novamente.', 'error');
    return;
  }

  emailForm.hidden = true;
  codeForm.hidden = false;
  formTitle.textContent = 'Confira seu e-mail';
  formDescription.textContent = 'Se houver uma conta cadastrada com esse endereço, enviaremos um código de 6 dígitos.';
  showStatus('Digite o código enviado para o e-mail informado.', 'success');
  tokenInput.focus();
});

codeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  setLoading(codeForm, true, 'Validando...');
  showStatus('');

  const { error } = await supabaseClient.auth.verifyOtp({
    email: emailInput.value.trim(),
    token: tokenInput.value.trim(),
    type: 'recovery'
  });

  setLoading(codeForm, false);
  if (error) {
    showStatus('Código inválido ou expirado. Confira os números ou solicite outro código.', 'error');
    return;
  }

  codeForm.hidden = true;
  passwordForm.hidden = false;
  formTitle.textContent = 'Crie uma nova senha';
  formDescription.textContent = 'O código foi validado. Escolha uma nova senha para sua conta.';
  showStatus('Código validado com sucesso.', 'success');
  document.getElementById('newPassword').focus();
});

document.getElementById('resendCode').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  showStatus('Solicitando outro código...');

  const { error } = await supabaseClient.auth.resetPasswordForEmail(emailInput.value.trim());

  button.disabled = false;
  if (error) {
    showStatus('Não foi possível reenviar o código. Tente novamente.', 'error');
    return;
  }

  tokenInput.value = '';
  showStatus('Se houver uma conta cadastrada com esse endereço, um novo código será enviado.', 'success');
});

passwordForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (newPassword !== confirmPassword) {
    showStatus('As senhas não coincidem.', 'error');
    return;
  }

  setLoading(passwordForm, true, 'Salvando...');
  showStatus('');

  const { error } = await supabaseClient.auth.updateUser({ password: newPassword });

  setLoading(passwordForm, false);
  if (error) {
    showStatus('Não foi possível atualizar a senha. Tente novamente.', 'error');
    return;
  }

  passwordForm.hidden = true;
  formTitle.textContent = 'Senha atualizada';
  formDescription.textContent = 'Sua senha foi alterada. Agora você já pode entrar na sua conta.';
  showStatus('Senha atualizada com sucesso.', 'success');
  window.setTimeout(() => {
    window.location.href = 'login.html';
  }, 1800);
});