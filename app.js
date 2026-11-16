const tabs = [...document.querySelectorAll('.tab')];
const extra = document.querySelector('#signup-extra');
const nameLabel = document.querySelector('#name-label');
const submit = document.querySelector('#submit-btn');
const notice = document.querySelector('#notice');
let mode = 'login';

tabs.forEach(tab => tab.addEventListener('click', () => {
  mode = tab.dataset.tab;
  tabs.forEach(t => t.classList.toggle('active', t === tab));
  extra.classList.toggle('hidden', mode !== 'signup');
  nameLabel.classList.toggle('hidden', mode !== 'signup');
  submit.textContent = mode === 'signup' ? 'إنشاء حساب' : 'تسجيل الدخول';
  notice.textContent = mode === 'signup' ? 'أكمل البيانات والموافقات المطلوبة.' : 'أدخل بيانات حسابك للمتابعة.';
}));

document.querySelector('#auth-form').addEventListener('submit', e => {
  e.preventDefault();
  if (mode === 'signup') {
    const birth = document.querySelector('#birthdate').value;
    const ageOK = document.querySelector('#age-ok').checked;
    const termsOK = document.querySelector('#terms-ok').checked;
    if (!birth || !ageOK || !termsOK) {
      notice.textContent = 'يرجى إدخال تاريخ الميلاد وتأكيد العمر والموافقة على الشروط.';
      return;
    }
    const date = new Date(birth);
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const beforeBirthday = today.getMonth() < date.getMonth() || (today.getMonth() === date.getMonth() && today.getDate() < date.getDate());
    if (beforeBirthday) age--;
    if (age < 15) {
      notice.textContent = 'عذراً، يجب أن يكون عمرك 15 سنة أو أكثر لإنشاء حساب.';
      return;
    }
  }
  notice.textContent = 'هذه واجهة تجريبية فقط. سنربط التسجيل الحقيقي بخدمة Firebase في الخطوة التالية.';
});

document.querySelectorAll('.social').forEach(button => button.addEventListener('click', () => {
  notice.textContent = `زر ${button.dataset.provider} جاهز للربط الحقيقي في Firebase لاحقاً.`;
}));
