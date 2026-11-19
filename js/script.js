/* =========================================================
   CONECTA FUTURO — JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------------------------------
    // Menu mobile
    // -------------------------------------------------------
    const menuToggle = document.getElementById("menutoggle");
    const nav = document.getElementById("nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const aberto = nav.classList.toggle("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(aberto)
            );
        });

        // Fecha o menu ao clicar em um link.
        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // -------------------------------------------------------
    // Modal das trilhas no index.html
    // -------------------------------------------------------
    const modal = document.getElementById("trailModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalClose = document.getElementById("modalClose");
    const modalButton = document.getElementById("modalButton");

    window.abrirTrilha = function (nomeTrilha) {
        // Os botões antigos do index continuam funcionando.
        // Agora, porém, cada trilha também possui uma página própria.
        const rotas = {
            "Informática Básica": "informatica-basica.html",
            "IA e Mercado de Trabalho": "ia-mercado-trabalho.html",
            "Primeiro Emprego": "primeiro-emprego.html",
            "Carreiras em Tecnologia": "carreiras-tecnologia.html"
        };

        if (rotas[nomeTrilha]) {
            window.location.href = rotas[nomeTrilha];
            return;
        }

        if (modal && modalTitle) {
            modalTitle.textContent = nomeTrilha;
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
        }
    };

    function fecharModal() {
        if (!modal) return;

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
    }

    if (modalClose) {
        modalClose.addEventListener("click", fecharModal);
    }

    if (modalButton) {
        modalButton.addEventListener("click", fecharModal);
    }

    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                fecharModal();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            fecharModal();
        }
    });

    // -------------------------------------------------------
    // Validação simples do cadastro
    // -------------------------------------------------------
    const cadastroForm = document.getElementById("cadastroForm");

    if (cadastroForm) {
        cadastroForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const senha = cadastroForm.querySelector("#senha");
            const confirmarSenha = cadastroForm.querySelector("#confirmarSenha");
            const mensagem = document.getElementById("mensagem");

            if (senha && confirmarSenha && senha.value !== confirmarSenha.value) {
                if (mensagem) {
                    mensagem.textContent = "As senhas não coincidem.";
                    mensagem.style.color = "#b00020";
                }
                confirmarSenha.focus();
                return;
            }

            if (mensagem) {
                mensagem.textContent = "Cadastro realizado com sucesso!";
                mensagem.style.color = "green";
            }

            cadastroForm.reset();
        });
    }

    // -------------------------------------------------------
    // Validação simples do login
    // -------------------------------------------------------
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const email = document.getElementById("email");
            const senha = document.getElementById("senha");
            const mensagem = document.getElementById("loginMensagem");

            if (!email || !senha) return;

            if (!email.checkValidity() || senha.value.trim() === "") {
                if (mensagem) {
                    mensagem.textContent = "Preencha os campos corretamente.";
                    mensagem.style.color = "#b00020";
                }
                return;
            }

            if (mensagem) {
                mensagem.textContent = "Login validado no modo de teste.";
                mensagem.style.color = "green";
            }
        });
    }
});
