export function formatAmountWithCommas(amount: string) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
