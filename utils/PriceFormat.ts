const formatPrice = (amount: number) => {
   return new Intl.NumberFormat("no-NO", {
       style: "currency",
       currency: "NOK",
   }).format(amount / 100);
}

export default formatPrice;
