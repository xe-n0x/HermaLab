const ACCESS_CODE = 'ISTINA';
const ACCESS_KEY = 'hermalab_staff_access';

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-list a');
const currentYear = document.getElementById('current-year');

const accessModal = document.getElementById('access-modal');
const accessForm = document.getElementById('access-form');
const accessInput = document.getElementById('staff-code');
const accessMessage = document.getElementById('access-message');
const openAccessButtons = document.querySelectorAll('[data-open-access]');
const closeAccessButtons = document.querySelectorAll('[data-close-access]');
const protectedPage = document.body.dataset.protectedPage === 'true';
const logoutButton = document.getElementById('logout-button');

function hasAccess() {
  return sessionStorage.getItem(ACCESS_KEY) === 'granted';
}

function grantAccess() {
  sessionStorage.setItem(ACCESS_KEY, 'granted');
}

function revokeAccess() {
  sessionStorage.removeItem(ACCESS_KEY);
}

function openModal() {
  if (!accessModal) return;

  accessModal.classList.add('is-open');
  accessModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  accessMessage.textContent = '';
  accessMessage.className = 'access-message';
  if (accessInput) {
    accessInput.value = '';
    accessInput.focus();
  }
}

function closeModal() {
  if (!accessModal) return;

  accessModal.classList.remove('is-open');
  accessModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

if (menuButton && header) {
  menuButton.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (header) {
      header.classList.remove('nav-open');
    }
    if (menuButton) {
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
});

openAccessButtons.forEach((button) => {
  button.addEventListener('click', openModal);
});

closeAccessButtons.forEach((button) => {
  button.addEventListener('click', closeModal);
});

if (accessModal) {
  accessModal.addEventListener('click', (event) => {
    if (event.target === accessModal) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && accessModal?.classList.contains('is-open')) {
    closeModal();
  }
});

if (accessForm && accessInput && accessMessage) {
  accessForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const enteredCode = accessInput.value;

    if (enteredCode === ACCESS_CODE) {
      grantAccess();
      accessMessage.textContent = 'Код принят. Переход во внутренний архив...';
      accessMessage.className = 'access-message success';
      window.location.href = 'staff.html';
      return;
    }

    accessMessage.textContent = 'Неверный код. Проверь регистр и повтори попытку.';
    accessMessage.className = 'access-message error';
    accessInput.select();
  });
}

if (protectedPage && !hasAccess()) {
  window.location.replace('index.html');
}

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    revokeAccess();
    window.location.href = 'index.html';
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
