import './App.css';
// import Sidebar from './Layout/Sidebar/Sidebar'
import ProductCard from './components/ProductCard/ProductCard';
import mock from './data/mock-data.json';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 px-3 py-4">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-6 gap-3">
          {mock.products.slice(0, 20).map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              image={p.image}
              discountPercent={p.discount}
              limitedDeal={p.discount >= 40}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
