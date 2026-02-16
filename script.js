let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;

function addExpense() {
    let title = document.getElementById("title").value;
    let amount = parseFloat(document.getElementById("amount").value);

    if (title === "" || isNaN(amount)) {
        alert("Please enter valid details");
        return;
    }

    expenses.push({ title, amount });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";

    displayExpenses();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}

function displayExpenses() {
    let list = document.getElementById("expense-list");
    list.innerHTML = "";

    let total = 0;

    expenses.forEach((expense, index) => {
        total += expense.amount;

        let li = document.createElement("li");
        li.innerHTML = `
            ${expense.title} - ₹${expense.amount}
            <button onclick="deleteExpense(${index})">X</button>
        `;
        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;

    updateChart();
}

function updateChart() {
    let titles = expenses.map(e => e.title);
    let amounts = expenses.map(e => e.amount);

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("myChart"), {
        type: 'pie',
        data: {
            labels: titles,
            datasets: [{
                data: amounts
            }]
        }
    });
}

displayExpenses();