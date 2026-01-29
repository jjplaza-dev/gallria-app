import { Link } from 'react-router-dom';
import { Camera, Grid2X2, Info } from 'lucide-react';

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-zinc-950/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
            <Camera size={20} className="text-indigo-400" />
          </div>
          <span className="font-semibold tracking-tight text-zinc-100">Gallria</span>
        </Link>

        <div className="flex gap-1">
          <NavLink to="/" icon={<Grid2X2 size={18} />} label="Gallery" />
          <NavLink to="/about" icon={<Info size={18} />} label="About" />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, label }) {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-2 px-4 py-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all text-sm font-medium"
    >
      {icon}
      {label}
    </Link>
  );
}