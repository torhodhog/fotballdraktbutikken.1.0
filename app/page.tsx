import Stripe from "stripe";
import Product from "./components/Product";
import Hero from "./components/Hero";

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });
  const products = await stripe.products.list();

  const productWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      return {
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        description: product.description,
        metadata: product.metadata // Changed here
      };
    })
  );
  return productWithPrices;
};

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <main>
        <section id="products" >
          <h2 className="flex items-center justify-center mb-12 text-xl text-bold">produkter</h2>
          <div className="grid grid-cols-fluid gap-12 h-auto">
          {products.map((product) => (
            <Product {...product} key={product.id}/>
          ))}</div>
        </section>
        <section id="sale" className="h-64">
          <h2>Salg</h2>
          {/* Salg innhold her */}
        </section>
        <section id="about" className="h-64">
          <h2>Om oss</h2>
          {/* Om oss innhold her */}
        </section>
        <section id="contact" className="h-64">
          <h2>Kontakt</h2>
          {/* Kontakt innhold her */}
        </section>
      </main>
    </>
  );
}