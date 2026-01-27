const shoppingInput = document.getElementById('shopping-input');
const amountInput = document.getElementById('amount-input');
const priceInput = document.getElementById('price-input');
const addBtn = document.getElementById('add-btn');
const shoppingList = document.getElementById('shopping-list');

let shoppings = JSON.parse(localStorage.getItem('shoppings')) || [];

function saveshoppings() {
  localStorage.setItem('shoppings', JSON.stringify(shoppings));
}

function formatWon(n) {
  return Number(n).toLocaleString() + '원';
}

function calcItemTotal(item) {
  return Number(item.amount) * Number(item.price); // 개수 * 개당가격
}

function calcGrandTotal() {
  return shoppings.reduce((sum, item) => sum + calcItemTotal(item), 0);
}

function renderFooterTotal() {
  const old = document.getElementById('grand-total');
  if (old) old.remove();

  const total = calcGrandTotal();

  const footer = document.createElement('div');
  footer.id = 'grand-total';
  footer.style.marginTop = '14px';
  footer.style.padding = '12px 14px';
  footer.style.border = '1px solid #e5e7eb';
  footer.style.borderRadius = '12px';
  footer.style.background = '#f9fafb';
  footer.style.display = 'flex';
  footer.style.justifyContent = 'space-between';
  footer.style.alignItems = 'center';
  footer.style.fontWeight = '800';

  const label = document.createElement('span');
  label.textContent = '총 합계';

  const value = document.createElement('span');
  value.textContent = formatWon(total);

  footer.append(label, value);

  const container = document.querySelector('.shopping');
  container.appendChild(footer);
}

function rendershoppings() {
  shoppingList.innerHTML = '';

  shoppings.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'shopping__item';
    if (item.completed) li.classList.add('shopping__item--completed');

    const top = document.createElement('div');
    top.className = 'shopping__item-top';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;

    const name = document.createElement('span');
    name.className = 'shopping__name';
    name.textContent = item.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'shopping__delete-btn';
    deleteBtn.innerHTML = '&times;';

    top.append(checkbox, name, deleteBtn);

    const bottom = document.createElement('div');
    bottom.className = 'shopping__item-bottom';

    const amount = document.createElement('span');
    amount.className = 'shopping__meta';
    amount.textContent = `수량: ${item.amount}개`;

    const price = document.createElement('span');
    price.className = 'shopping__meta';
    price.textContent = `개당: ${formatWon(item.price)}`;

    const sum = document.createElement('span');
    sum.className = 'shopping__meta';
    sum.textContent = `합계: ${formatWon(calcItemTotal(item))}`;

    bottom.append(amount, price, sum);

    li.append(top, bottom);
    shoppingList.appendChild(li);

    checkbox.addEventListener('change', () => {
      shoppings[index].completed = checkbox.checked;
      saveshoppings();
      rendershoppings();
    });

    deleteBtn.addEventListener('click', () => {
      shoppings.splice(index, 1);
      saveshoppings();
      rendershoppings();
    });
  });

  renderFooterTotal();
}

function addshopping() {
  const text = shoppingInput.value.trim();
  const amount = amountInput.value.trim();
  const price = priceInput.value.trim();

  if (!text || !amount || !price) {
    alert('모든 항목을 입력하세요');
    return;
  }

  const amountNum = Number(amount);
  const priceNum = Number(price);

  if (!Number.isFinite(amountNum) || amountNum <= 0) {
    alert('수량은 1 이상의 숫자로 입력하세요');
    return;
  }

  if (!Number.isFinite(priceNum) || priceNum <= 0) {
    alert('가격은 1 이상의 숫자로 입력하세요');
    return;
  }

  shoppings.push({
    text,
    amount: amountNum,
    price: priceNum, // 개당 가격
    completed: false,
  });

  shoppingInput.value = '';
  amountInput.value = '';
  priceInput.value = '';

  saveshoppings();
  rendershoppings();
}

addBtn.addEventListener('click', addshopping);

shoppingInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addshopping();
});
amountInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addshopping();
});
priceInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addshopping();
});

window.onload = rendershoppings;
