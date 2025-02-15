// Sample rates (replace with real-time API calls if needed)
const rates = {
  "shares": 8,   // Example: 8% annual return
  "bonds": 5     // Example: 5% annual return
};

// Update the rate based on the investment type selection.
function updateRate() {
  const investmentType = document.getElementById("investmentType").value;
  document.getElementById("rate").value = rates[investmentType];
}

// Formats a number (or numeric string) to include commas as thousand separators.
function formatNumberWithCommas(number) {
  const parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join('.');
}

// This function is called on each input event for the Invest Amount field.
function formatAmount() {
  const inputField = document.getElementById("investAmount");
  // Remove all commas first so we work with a clean number string.
  let rawValue = inputField.value.replace(/,/g, '');
  
  // If the field is empty, do nothing.
  if (rawValue === "") return;
  
  // Optionally, remove any non-digit/non-decimal characters.
  // rawValue = rawValue.replace(/[^0-9.]/g, '');
  
  // Format the cleaned number string.
  const formattedValue = formatNumberWithCommas(rawValue);
  inputField.value = formattedValue;
}

// Calculate the profit based on user inputs.
function calculateProfit() {
  // Remove commas from the invest amount before converting to a number.
  const investAmountStr = document.getElementById("investAmount").value.replace(/,/g, '');
  const investAmount = parseFloat(investAmountStr);
  const tenure = parseInt(document.getElementById("investmentTenure").value);
  const rate = parseFloat(document.getElementById("rate").value) / 100;

  if (isNaN(investAmount) || isNaN(tenure) || isNaN(rate)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  // Monthly profit calculation:
  const monthlyRate = rate / 12;
  const monthlyProfit = investAmount * monthlyRate;
  const totalInterest = monthlyProfit * tenure;
  const totalEarned = investAmount + totalInterest;

  // Display the results with commas and two decimals.
  document.getElementById("monthlyProfit").innerText = formatNumberWithCommas(monthlyProfit.toFixed(2));
  document.getElementById("totalEarned").innerText = formatNumberWithCommas(totalEarned.toFixed(2));
  document.getElementById("balance").innerText = formatNumberWithCommas(totalEarned.toFixed(2));
  document.getElementById("totalInterest").innerText = formatNumberWithCommas(totalInterest.toFixed(2));
}

// Initialize the rate field on page load.
updateRate();