export const Header = () => {
  return (
    <header className="border-b border-zinc-100 py-6 px-8 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="font-bold text-xl tracking-tight">WALTON PLAZA</div>
      <nav className="flex gap-8 text-sm font-medium text-zinc-600">
        <a href="#" className="hover:text-black transition-colors">
          Shop
        </a>
        <a href="#" className="hover:text-black transition-colors">
          Categories
        </a>
        <a href="#" className="hover:text-black transition-colors">
          About
        </a>
      </nav>
    </header>
  );
};
