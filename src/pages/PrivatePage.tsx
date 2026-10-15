import { Link } from "react-router-dom";

function PrivatePage() {
  return (
    <div>
      <h1 className="text-2xl mb-1 mt-4">Adminpanel</h1>
      <div className="flex flex-col items-center">
        <Link to="/admin/products" className="border rounded-lg w-50 m-3 p-2 cursor-pointer bg-slate-600 hover:bg-slate-800 text-white">Visa produkter</Link>
        <Link to="/admin/products/new" className="border rounded-lg w-50 p-2 cursor-pointer bg-slate-600 hover:bg-slate-800 text-white">Lägg till produkt</Link>
      </div>
    </div>
  );
}

export default PrivatePage;
